import React, {Component} from 'react'
import {Select, Form, Input} from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

    render() {
        const {categoryNames, parentId} = this.props
        console.log(parentId)
        return (
            <Form ref={
                this.formRef
            }
                  initialValues={
                      {parentId}
                  }>
                <Item name="parentId">
                    <Select size="large"
                            style={
                                {width: "100%"}
                            }>
                        <Option value="0">First level category</Option>
                        {
                            categoryNames.map(item => {
                                return <Option key={
                                    item._id
                                }
                                               value={
                                                   item._id
                                               }>
                                    {
                                        item.name
                                    }</Option>
                            })
                        } </Select>
                </Item>

                <Item name="categoryName"
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
                    <Input placeholder="Category name"></Input>
                </Item>

            </Form>
        )
    }
}
