import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

import "./index.less";


const { SubMenu } = Menu;


export default class LeftNav extends Component {
  render() {
    return (
        <div className="left-nav">
          <Link to="/"  className="left-nav-header">
            <h1>Admin board</h1>
          </Link>
          <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Main
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="Product">
            <Menu.Item key="5" icon={<MailOutlined />} >Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            User Control
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            Job Control
          </Menu.Item>
          <SubMenu key="sub2" icon={<MailOutlined />} title="Chart">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </Menu>
        </div>
    );
  }
}
