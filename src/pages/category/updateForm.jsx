import React, {Component} from 'react'
import {Select, Form, Input} from 'antd'
import PropTypes from 'prop-types';
const Item = Form.Item
const Option = Select.Option


export default class UpdateForm extends Component {
    formRef = React.createRef();

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

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
                <Item name="categoryName" shouldUpdat>
                    <Input placeholder="Category name"></Input>
                </Item>
            </Form>
        )
    }

}
