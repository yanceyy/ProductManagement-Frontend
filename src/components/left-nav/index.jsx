import React, { Component } from "react";
import { Link ,withRouter} from "react-router-dom";
import { Menu } from "antd";
import menuList from "../../config/menu";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {

  openKey = []
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        const cItem = item.children.find(cItem=>cItem.key === this.props.location.pathname)
        if(cItem){this.openKey.push(item.key)}
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <h1>Admin board</h1>
        </Link>
        <Menu selectedKeys={[this.props.location.pathname]} mode="inline" theme="dark" defaultOpenKeys={this.openKey}>
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