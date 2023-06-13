import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import menuList from '../../config/menu';
import './index.less';
import memoryUtils from '../../utils/memoryUtils';
import {connect} from 'react-redux';
import {setHeadTitle} from '../../redux/actions';

const {SubMenu, Item} = Menu;

function LeftNav(props) {
    const location = useLocation();

    const [openKey, setOpenKey] = useState([]);
    const [menuNodes, setMenuNodes] = useState([]);

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

    const getMenuNodes = (menuList) => {

        const path = location.pathname;

        return menuList.map((item) => {
            if (hasAuth(item)) {
                if (!item.children) {
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        props.setHeadTitle(item.title);
                    }
                    return (
                        <Item key={item.key} icon={item.icon}>
                            <Link
                                to={item.key}
                                onClick={() =>
                                    props.setHeadTitle(item.title)
                                }
                            >
                                {item.title}
                            </Link>
                        </Item>
                    );
                } else {
                    /* decide which tab is opened */
                    const cItem = item.children.find(
                        (cItem) =>
                            cItem.key.startsWith(path)
                    );
                    console.log(item.children, cItem)
                    if (cItem) {
                        setOpenKey([...openKey, item.key]);
                    }
                    return (
                        <SubMenu
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                        >
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    );
                }
            }
        });
    };

    useEffect(() => {
        setMenuNodes(getMenuNodes(menuList));
    }, []);

    let path = location.pathname;
    if (path.indexOf('/product') === 0) {
        path = '/product';
    }
    console.log({openKey})
    return (
        <div className="left-nav">
            {/* use location.pathname to set highlight  */}
            <Menu
                selectedKeys={[path]}
                mode="inline"
                theme="dark"
                defaultOpenKeys={openKey}
            >
                {menuNodes}
            </Menu>
        </div>
    );
}

export default connect(null, {setHeadTitle})(LeftNav);
