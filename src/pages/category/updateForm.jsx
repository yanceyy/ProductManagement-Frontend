import React, {Component} from 'react'
import {Form, Input} from 'antd'

const Item = Form.Item


export default class UpdateForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

    render() {
        const {categoryName} = this.props
        /* Check whether the props's values is same as the value in the form, if it is different
            then we could use the "setFieldsValue" methods to update the value in the form.

            Or set destroyOnClose={true} on the Modal on category page.
        */
        if (this.formRef.current && categoryName !== this.formRef.current.getFieldsValue()['categoryName']) {
            this.formRef.current.setFieldsValue({categoryName})
        }

        return (
            <Form ref={
                this.formRef
            }
                  initialValues={
                      {categoryName: categoryName}
                  }>
                <Item name="categoryName" shouldUpdate
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
                    <Input placeholder="Category name"></Input>
                </Item>
            </Form>
        )
    }

}
