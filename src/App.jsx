import './index.less';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HeadTitleProvider, UserProvider } from './context/provider';
import { Suspense, lazy } from 'react';

import { Loading } from './components/common/Loading';

const Admin = lazy(() => import('./pages/admin'));
const Login = lazy(() => import('./pages/login'));

export default function App() {
    return (
        <HeadTitleProvider>
            <UserProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/login" component={Login}></Route>
                            <Route path="/" component={Admin}></Route>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </UserProvider>
        </HeadTitleProvider>
    );
}
