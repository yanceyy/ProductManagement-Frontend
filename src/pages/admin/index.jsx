import {Redirect, Switch, Route} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import {Layout} from 'antd';
import './index.less';
import HeaderCom from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../home';
import Category from '../category';
import Role from '../role';
import Bar from '../chart/bar';
import Line from '../chart/line';
import Pie from '../chart/pie';
import Product from '../product';
import User from '../user';

const {Header, Footer, Sider, Content} = Layout;

const Admin = () => {
    const user = memoryUtils.user;

    if (!user || !user._id) {
        return <Redirect to="/login"/>;
    }

    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <Sider width="250px" style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}>
                <LeftNav/>
            </Sider>
            <Layout style={{marginLeft: 250}}>
                <Header className="header" style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                }}>
                    <HeaderCom/>
                </Header>
                <Content className="content-body">
                    <Switch>
                        <Route path="/category" component={Category}></Route>
                        <Route path="/role" component={Role}></Route>
                        <Route path="/user" component={User}></Route>
                        <Route path="/chart/bar" component={Bar}></Route>
                        <Route path="/chart/line" component={Line}></Route>
                        <Route path="/chart/pie" component={Pie}></Route>
                        <Route path="/product" component={Product}></Route>
                        <Route path="/home" component={Home}></Route>
                        <Redirect to="/home"/>
                    </Switch>
                </Content>
                <Footer className="footer">
                    <p>07-2021</p>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Admin;
