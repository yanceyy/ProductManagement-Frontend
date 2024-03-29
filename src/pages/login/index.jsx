import './login.less';

import {Button, Checkbox, Form, Input, message} from 'antd';
import {Redirect, useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';

import Lottie from 'lottie-react';
import {login} from '../../api/action';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

/*
router component for login page
*/
function Login() {
    const [user, setUser] = useState(memoryUtils.user);
    const history = useHistory();
    const [animationData, setAnimationData] = useState(undefined);

    useEffect(() => {
        import('../../images/homePage.json').then((data) => {
            setAnimationData(data.default);
        });
    }, []);

    const onFinish = async (values) => {
        try {
            const data = await login(values.username, values.password);
            memoryUtils.user = data;
            storageUtils.saveUser(data);
            setUser(data.data);
            history.push('/home');
            message.success('success');

        } catch (e) {
            message.error('Wrong password or wrong username');
        }
    };

    if (user && user._id) {
        return <Redirect to={'/'}/>;
    }

    return (
        <div className="login">
            <section className="login-section">
                <section className="welcome-board">
                    <Lottie
                        style={{
                            height: 300,
                        }}
                        animationData={animationData}
                    />
                </section>
                <section className="form">
                    <Form
                        layout="vertical"
                        name="basic"
                        requiredMark={false}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            initialValue={'admin'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    min: 4,
                                    message:
                                        'Your username must be longer than 4!',
                                },
                                {
                                    max: 12,
                                    message:
                                        'Your username must be shorter than 12!',
                                },
                                {
                                    pattern: /^\w+$/,
                                    message:
                                        'Please only input word, number and _',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            initialValue={'admin'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 4,
                                    message:
                                        'Your password must be longer than 4!',
                                },
                                {
                                    max: 12,
                                    message:
                                        'Your password must be shorter than 12!',
                                },
                                {
                                    max: 12,
                                    message:
                                        'Your password must be shorter than 12!',
                                },
                                {
                                    pattern: /^(\d|\w|_)+$/,
                                    message:
                                        'Please only input word, number and _',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                justify: 'center',
                                align: 'middle',
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                justify: 'center',
                                align: 'middle',
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </section>
        </div>
    );
}

export default Login;
