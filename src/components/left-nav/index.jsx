import {useState, useMemo, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import menuList from '../../config/menu';
import './index.less';
import memoryUtils from '../../utils/memoryUtils';
import {connect} from 'react-redux';
import {setHeadTitle} from '../../redux/actions';

function LeftNav(props) {
    const location = useLocation();
    const history = useHistory();

    const [openKey, setOpenKey] = useState([]);

    const hasAuth = (item) => {
        const {key, isPublic} = item;
        const menus = memoryUtils.user.role.menus;
        const username = memoryUtils.user.username;
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            return item.children.some((x) => menus.indexOf(x.key) !== -1);
        }
        return false;
    };

    const getMenuItems = useCallback((menuList) => {
        const path = location.pathname;
        return menuList.map((item) => {
            if (hasAuth(item)) {
                if (!item.children) {
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        props.setHeadTitle(item.title);
                    }
                    return ({
                        key: item.key,
                        icon: item.icon,
                        label: item.title
                    });
                } else {
                    /* decide which tab is opened */
                    const cItem = item.children.find(
                        (cItem) =>
                            cItem.key.startsWith(path)
                    );
                    if (cItem) {
                        setOpenKey([item.key]);
                    }
                    return ({
                        key: item.key,
                        icon: item.icon,
                        label: item.title,
                        children: getMenuItems(item.children)
                    });
                }
            }
        });
    }, [location.pathname, props]);

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

export default connect(null, {setHeadTitle})(LeftNav);
