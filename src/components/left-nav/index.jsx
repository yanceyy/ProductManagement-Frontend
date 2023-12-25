import './index.less';

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {Menu} from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import menuList from '../../config/menu';
import {useHeadTitle} from '../../context/hooks';

export default function LeftNav() {
    const location = useLocation();
    const history = useHistory();
    const {setHeadTitle} = useHeadTitle();

    const [openKey, setOpenKey] = useState([]);

    const hasAuth = (item) => {
        const {key, isPublic} = item;
        const {role, username} = memoryUtils.user
        if (username === 'admin' || isPublic || role.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            return item.children.some((x) => role.indexOf(x.key) !== -1);
        }
        return false;
    };

    const getMenuItems = useCallback(
        (menuList) => {
            const path = location.pathname;
            return menuList.map((item) => {
                if (hasAuth(item)) {
                    if (!item.children) {
                        return {
                            key: item.key,
                            icon: item.icon,
                            label: item.title,
                        };
                    } else {
                        /* decide which tab is opened */
                        const cItem = item.children.find((cItem) =>
                            cItem.key.startsWith(path),
                        );
                        if (cItem) {
                            setOpenKey([item.key]);
                        }
                        return {
                            key: item.key,
                            icon: item.icon,
                            label: item.title,
                            children: getMenuItems(item.children),
                        };
                    }
                }
            });
        },
        [location.pathname],
    );

    useEffect(() => {
        function findOpenedMenu(menuList, key) {
            for (const menu of menuList) {
                if (menu.key === key) {
                    return menu;
                }
                if (menu.children) {
                    const openedMenu = findOpenedMenu(menu.children, key);
                    if (openedMenu) {
                        return openedMenu;
                    }
                }
            }
        }

        const selectedMenu = findOpenedMenu(menuList, location.pathname);
        setHeadTitle(selectedMenu?.title ?? '');
    }, [setHeadTitle, location.pathname]);

    const menuItems = useMemo(() => {
        return getMenuItems(menuList);
    }, [getMenuItems]);

    const onClick = (e) => {
        history.push(e.key);
    };

    let path = location.pathname;
    if (path.indexOf('/product') === 0) {
        path = '/product';
    }

    return (
        <div className="left-nav">
            {/* use location.pathname to set highlight  */}
            <Menu
                selectedKeys={[path]}
                mode="inline"
                theme="dark"
                defaultOpenKeys={openKey}
                items={menuItems}
                onClick={onClick}
            />
        </div>
    );
}
