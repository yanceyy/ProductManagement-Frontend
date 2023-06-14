import {useRef, useEffect} from 'react';
import {Form, Input} from 'antd';

const Item = Form.Item;

export default function AddForm({setForm}) {
    const formRef = useRef();

    useEffect(() => {
        setForm(formRef.current);
    }, [setForm]);

    return (
        <Form ref={formRef}>
            <Item name="RoleName" label="Role name" required
                rules={
                    [
                        {
                            required: true,
                            message: 'Please input your value!'
                        }, {
                            min: 2,
                            message: 'must be longer than 1!'
                        }, {
                            max: 12,
                            message: 'must be shorter than 12!'
                        },
                    ]
            }>
                <Input placeholder="Category name"></Input>
            </Item>
        </Form>
    );
}
