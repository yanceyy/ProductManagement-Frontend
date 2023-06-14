import { Switch, Route, Redirect } from 'react-router-dom';
import { lazy } from 'react';

const ProductAddUpdate = lazy(() => import('./add-update'));
const ProductHome = lazy(() => import('./home'));
const ProductPage = lazy(() => import('./product'));

export default function Product() {
    return (
        <Switch>
            <Route path="/product/add" component={ProductAddUpdate} />
            <Route path="/product/info" component={ProductPage} />
            <Route path="/product" component={ProductHome} exact />
            <Redirect to="/product" />
        </Switch>
    );
}
