import React, {Component} from 'react';
import {Form, Input} from 'antd';

const Item = Form.Item;

export default class AddForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    render() {
        return (
            <Form ref={this.formRef}>
                <Item
                    name="RoleName"
                    label="Role name"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Please input your value!',
                        },
                        {
                            min: 2,
                            message: 'must be longer than 1!',
                        },
                        {
                            max: 12,
                            message: 'Ymust be shorter than 12!',
                        },
                    ]}
                >
                    <Input placeholder="Category name"></Input>
                </Item>
            </Form>
        );
    }
}
