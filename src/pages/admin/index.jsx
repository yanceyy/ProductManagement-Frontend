import React, { Component } from "react";
import { Redirect, Link,Switch,Route,withRouter} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Button, Layout, Menu } from "antd";
import "./index.less";
import HeaderCom from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from "../home"
import Category from "../category"
import Role from "../role"
import Bar from "../chart/bar"
import Line from "../chart/line"
import Pie from "../chart/pie"
import Product from "../product"
import User from "../user"


const { Header, Footer, Sider, Content } = Layout;
/* 
router component for admin page
*/
export default class Admin extends Component {
  render() {

    const user = memoryUtils.user;
    console.log("admin", user, typeof user, !user._id, !user);
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider width='250px'>
          <LeftNav />{" "}
        </Sider>
        <Layout>
          <Header className="header" >
            <HeaderCom />
          </Header>
          <Content> 
            <Switch>
          <Route path="/category" component={Category}></Route>
          <Route path="/role" component={Role}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/chart/bar" component={Bar}></Route>
          <Route path="/chart/line" component={Line}></Route>
          <Route path="/chart/pie" component={Pie}></Route>
          <Route path="/product" component={Product}></Route>
          <Route path="/home" component={Home}></Route>
          <Redirect to="/home" />
        </Switch></Content>
          <Footer className="footer">
            <p>07-2021</p>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
