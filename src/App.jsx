import { lazy, Suspense } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './index.less';
import { Loading } from './components/common/Loading';
import { HeadTitleProvider, UserProvider } from './context/provider';

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
