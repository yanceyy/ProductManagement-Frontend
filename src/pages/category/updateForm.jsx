import { useRef, useEffect } from 'react';
import { Form, Input } from 'antd';

const { Item } = Form;

export default function UpdateForm({ setForm, categoryName }) {
    const formRef = useRef();

    useEffect(() => {
        if (formRef.current) {
            formRef.current.setFieldsValue({ categoryName });
            setForm(formRef.current);
        }
    }, [categoryName, setForm]);

    return (
        <Form ref={formRef} initialValues={{ categoryName }}>
            <Item
                name="categoryName"
                shouldUpdate
                onChange={() => setForm(formRef.current)}
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
                        message: 'must be shorter than 12!',
                    },
                ]}
            >
                <Input placeholder="Category name"></Input>
            </Item>
        </Form>
    );
}
