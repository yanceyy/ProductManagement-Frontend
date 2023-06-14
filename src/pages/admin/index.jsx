import { Redirect, Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loading } from '../../components/common/Loading';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import './index.less';
import HeaderCom from '../../components/header';
import LeftNav from '../../components/left-nav';

const Role = lazy(() => import('../role'));
const User = lazy(() => import('../user'));
const Home = lazy(() => import('../home'));
const Product = lazy(() => import('../product'));
const Pie = lazy(() => import('../chart/pie'));
const Category = lazy(() => import('../category'));
const Bar = lazy(() => import('../chart/bar'));
const Line = lazy(() => import('../chart/line'));

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
    const user = memoryUtils.user;
    if (!user || !user._id) {
        return <Redirect to="/login" />;
    }

    return (
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <Sider
                width="250px"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <LeftNav />
            </Sider>
            <Layout style={{ marginLeft: 250 }}>
                <Header
                    className="header"
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                    }}
                >
                    <HeaderCom />
                </Header>
                <Content className="content-body">
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route
                                path="/category"
                                component={Category}
                            ></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/chart/bar" component={Bar}></Route>
                            <Route path="/chart/line" component={Line}></Route>
                            <Route path="/chart/pie" component={Pie}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/home" component={Home}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Suspense>
                </Content>
                <Footer className="footer">
                    <p>07-2021</p>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Admin;
