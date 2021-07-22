import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, message } from "antd";
import Admin from "./pages/admin";
import Login from "./pages/login";
import { Switch, BrowserRouter, Route } from "react-router-dom";
export default class App extends Component {
  info = () => {
    message.error("This is a normal message");
  };
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
