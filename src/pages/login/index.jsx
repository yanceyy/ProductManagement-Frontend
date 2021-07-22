import React, { Component } from "react";
import "./login.less";
import {login} from "../../api/action"
import { Form, Input, Button, Checkbox } from "antd";
/* 
router component for login page
*/
export default class Login extends Component {
    onFinish = (values) => {
        console.log('Success:', values);
        console.log(values.username, values.password,values.remember)
        login(values.username, values.password).then(response=>{
            if(response.data.status===0) alert("success")
            else alert("failed")
            console.log(response.data)},error=>{alert("server failed")})
        // login("zhad2wbwnn","12e121223").then(response=>console.log(response.data))
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <h1>User Admin</h1>
        </header>
        <section className="login-section">
          <h2>Login</h2>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                    min: 4,
                    message: "Your username must be longer than 4!",
                  },
                  {
                    max: 12,
                    message: "Your username must be shorter than 12!",
                  },
                  {
                    max: 12,
                    message: "Your username must be shorter than 12!",
                  },
                  {
                      pattern: /^\w+$/,
                      message: "Please only input word, number and _",
                  }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                    min: 4,
                    message: "Your password must be longer than 4!",
                  },
                  {
                    max: 12,
                    message: "Your password must be shorter than 12!",
                  },
                  {
                    max: 12,
                    message: "Your password must be shorter than 12!",
                  },
                  {
                      pattern: /^(\d|\w|_)+$/,
                      message: "Please only input word, number and _",
                  }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={this.submitLogin}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
