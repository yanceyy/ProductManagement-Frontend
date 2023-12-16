import './index.less';

import { useEffect, useState } from 'react';

import LinkButton from '../link-button';
import { Modal } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { useHeadTitle } from '../../context/hooks';
import { useHistory } from 'react-router-dom';

export default function HeaderCom() {
    const [logoutIsVisable, setLogoutIsVisable] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toString());
    const history = useHistory();
    const { headTitle } = useHeadTitle();

    useEffect(() => {
        const timer = setInterval(
            () => setCurrentTime(new Date().toString()),
            1000,
        );
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
                <div className="header-bottom-left">{headTitle}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                </div>
            </div>
        </div>
    );
}
