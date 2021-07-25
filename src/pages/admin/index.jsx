import React, { Component } from "react";
import { Redirect, Link,Switch,Route} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Button, Layout, Menu } from "antd";
import "./index.less";
import HeaderCom from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from "../home"
import Category from "../category"


const { Header, Footer, Sider, Content } = Layout;
/* 
router component for admin page
*/
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    console.log("admin", user, typeof user, !user.id, !user);
    if (!user || !user.id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />{" "}
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "rgb(235, 230, 236)" }}>
            <HeaderCom />
          </Header>
          <Content> 
            <Switch>
          <Route path="/category" component={Category}></Route>
          <Route path="/" component={Home}></Route>
        </Switch></Content>
          <Footer className="footer">
            <p>07-2021</p>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
