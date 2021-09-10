import React, {Component,lazy,Suspense} from "react";
import Login from "./pages/login";
import {Switch, BrowserRouter, Route} from "react-router-dom";
const Admin = lazy(()=>import("./pages/admin"))
export default class App extends Component {
    render() {
        return (<BrowserRouter>
            <Suspense fallback={<div>loading</div>}> 
            <Switch>
                <Route path="/login"
                    component={Login}></Route>

                    <Route path="/"
                    component={Admin}></Route>

            </Switch>
            </Suspense>
        </BrowserRouter>);
    }
}
