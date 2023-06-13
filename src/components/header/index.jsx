import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './index.less';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import {Modal} from 'antd';
import LinkButton from '../link-button';
import {connect} from 'react-redux';

function HeaderCom({headTitle}) {
    const [logoutIsVisable, setLogoutIsVisable] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toString());
    const history = useHistory();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const logout = () => {
        storageUtils.removeUser();
        memoryUtils.user = {};
        history.push('/login');
    };

    const handleCancel = () => {
        setLogoutIsVisable(false);
    };

    const user = memoryUtils.user;
    return (
        <div className="header">
            <Modal
                title="Conform"
                open={logoutIsVisable}
                onOk={logout}
                onCancel={handleCancel}
            >
                <p>Do you want to exit?</p>
            </Modal>
            <div className="header-top">
                <span>Welcome, {user.username}!</span>
                <LinkButton
                    onClick={() => {
                        setLogoutIsVisable(true);
                    }}
                >
                    Logout
                </LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    {headTitle}
                </div>

                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({headTitle: state.headTitle});

export default connect(mapStateToProps)(HeaderCom);
