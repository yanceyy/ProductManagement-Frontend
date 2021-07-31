import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductAddUpdate from './add-update'
import ProductHome from './home'
import ProductPage from './product'


export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product/add"
                    component={ProductAddUpdate}/>
                <Route path="/product/info"
                    component={ProductPage}/>
                <Route path="/product"
                    component={ProductHome}
                    exact/>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}
