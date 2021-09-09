import React, {Component} from "react";
import Admin from "./pages/admin";
import Login from "./pages/login";
import {Switch, BrowserRouter, Route} from "react-router-dom";

export default class App extends Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/login"
                    component={Login}></Route>
                <Route path="/"
                    component={Admin}></Route>
            </Switch>
        </BrowserRouter>);
    }
}
