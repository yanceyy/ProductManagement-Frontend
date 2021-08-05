import React, { Component } from "react";
import { Link ,withRouter} from "react-router-dom";
import { Menu } from "antd";
import menuList from "../../config/menu";
import "./index.less";
import memoryUtils from "../../utils/memoryUtils"

const { SubMenu } = Menu;

class LeftNav extends Component {
  hasAuth =(item)=>{
    const {key,isPublic}=item
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    if(username==="admin" || isPublic||menus.indexOf(key)!==-1){
      return true
    }else if(item.children){
      console.log(item.children)
      console.log(menus)
      return item.children.some(x=>menus.indexOf(x.key)!==-1)
    }
    return false
  }
  openKey = []
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if(this.hasAuth(item)){
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        /* decide which tab is opened */
        const cItem = item.children.find(cItem=> this.props.location.pathname.indexOf(cItem.key)===0)
        if(cItem){this.openKey.push(item.key)}
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    }});
  };

  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    let path =this.props.location.pathname;
    if(path.indexOf('/product')===0){
      path = '/product';
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <h1>Admin board</h1>
        </Link>
        {/* use this.props.location.pathname to set highlight  */}
        <Menu selectedKeys={[path]} mode="inline" theme="dark" defaultOpenKeys={this.openKey}>
          {this.menuNodes}
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/home">Main</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<ContainerOutlined />}>
            <Link to="/user">User Control</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ContainerOutlined />}>
            <Link to="/role">Job Control</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<MailOutlined />} title="Chart">
            <Menu.Item key="6" icon={<MailOutlined />}>
              <Link to="/chart/bar">bar</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<MailOutlined />}>
              <Link to="/chart/line">line</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<MailOutlined />}>
              <Link to="/chart/pie"> pie</Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}

export default  withRouter(LeftNav);