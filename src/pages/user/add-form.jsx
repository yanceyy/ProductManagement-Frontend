import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'


const {Item} = Form;
const {Option} = Select;

export default class AddForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getOutput(this.formRef.current)
        this.props.getOutput(this.getFromValues)
    }

    //catch the value of selector
    onChange = (value) => {
        this.selectorValue = value
    }

    getFromValues = () => {
        return this.formRef.current.validateFields().then(async values => {
            // the form componment cann't capture the value in Seletor
            values.role_id = this.selectorValue
            return values;
        })
    }


    render() {
        const {roles, showStatus} = this.props
        let selectedUser = {}
        // check is update or add mode
        if (showStatus === 2) {
            selectedUser = this.props.selectedUser
        }
        return (
            <Form ref={
                this.formRef
            } initialValues={selectedUser}>
                <Item name="username" label="Username" required
                      rules={
                          [
                              {
                                  required: true,
                                  message: "Please input your value!"
                              }, {
                              min: 2,
                              message: "must be longer than 1!"
                          }, {
                              max: 12,
                              message: "must be shorter than 12!"
                          },
                          ]
                      }>
                    <Input></Input>
                </Item>
                <Item name="password" label="Password" hidden={showStatus === 2} required
                      rules={showStatus === 2 ? null :
                          [
                              {
                                  required: true,
                                  message: "Please input your value!"
                              }, {
                              min: 6,
                              message: "must be longer than 1!"
                          }, {
                              max: 12,
                              message: "must be shorter than 12!"
                          },
                          ]
                      }>
                    <Input type='password'></Input>
                </Item>
                <Item name="phone" label="Phone">
                    <Input></Input>
                </Item>
                <Item name="email" label="Email">
                    <Input type="email"></Input>
                </Item>
                <Item name="role_id" label="Role">
                    <Select showSearch defaultValue={selectedUser.role_id}
                            style={
                                {width: 200}
                            }
                            onChange={this.onChange}
                            placeholder="Select a role"
                            optionFilterProp="children"
                            filterOption={
                                (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                        {roles.map((item, index) => {
                            return (<Option key={index} value={item._id}>{item.name}</Option>)
                        })}
                    </Select>,
                </Item>
            </Form>
        )
    }
}
