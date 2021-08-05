import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import PropTypes from 'prop-types';


const {Item} = Form;
const {Option} = Select;

export default class AddForm extends Component {

    static propTypes = {
        showStatus: PropTypes.number.isRequired,
        roles:PropTypes.object
    }

    formRef = React.createRef();

    componentDidMount() {
        this.props.getOutput(this.formRef.current)
    }

    //catch the value of selector
    onChange=(value)=>{
        this.selectorValue = value
      }
    
    
    getFromValues= ()=>{
        return this.formRef.current.validateFields().then(async values => {
            // the form componment cann't capture the value in Seletor
            values.role_id = this.selectorValue
            return values;
        })
      }


    componentDidMount(){
        this.props.getOutput(this.getFromValues)
    }

    render() {
        const {roles,showStatus} = this.props
        let selectedUser={}
        // check is update or add mode
        if(showStatus===2){
            selectedUser = this.props.selectedUser
            selectedUser.password="" // since the stored password is hashed,it cann't be used
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
                                message: "Ymust be shorter than 12!"
                            },
                        ]
                }>
                    <Input></Input>
                </Item>
                <Item name="password" label="Password" required initialValue=""
                    rules={
                        [
                            {
                                required: true,
                                message: "Please input your value!"
                            }, {
                                min: 6,
                                message: "must be longer than 1!"
                            }, {
                                max: 12,
                                message: "Ymust be shorter than 12!"
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
                        {roles.map(item=>{
                            return (<Option value={item._id}>{item.name}</Option>)
                        })}
                    </Select>,
                </Item>
            </Form>
        )
    }
}
