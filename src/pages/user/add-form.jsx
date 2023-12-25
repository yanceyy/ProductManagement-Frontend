import {Form, Input, Select} from 'antd';
import {useCallback, useEffect, useRef, useState} from 'react';

const {Item} = Form;
const {Option} = Select;

export default function AddForm({
                                    getOutput,
                                    roles,
                                    showStatus,
                                    selectedUser,
                                }) {
    const formRef = useRef();
    const [selectedValue, setSelectedValue] = useState(null);

    const getFromValues = useCallback(() => {
        return formRef.current.validateFields().then(async (values) => {
            // the form component cannot capture the value in Selector
            values.roleId = selectedValue;
            return values;
        });
    }, [selectedValue]);

    useEffect(() => {
        getOutput(getFromValues);
    }, [getFromValues, getOutput]);

    let _selectedUser = {};
    // check is update or add mode
    if (showStatus === 2) {
        _selectedUser = selectedUser;
    }

    return (
        <Form ref={formRef} initialValues={_selectedUser}>
            <Item
                name="username"
                label="Username"
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
                        max: 20,
                        message: 'must be shorter than 20!',
                    },
                ]}
            >
                <Input/>
            </Item>
            <Item
                name="password"
                label="Password"
                hidden={showStatus === 2}
                required
                rules={
                    showStatus === 2
                        ? null
                        : [
                            {
                                required: true,
                                message: 'Please input your value!',
                            },
                            {
                                min: 4,
                                message: 'must be longer than 6!',
                            },
                            {
                                max: 20,
                                message: 'must be shorter than 12!',
                            },
                        ]
                }
            >
                <Input type="password"/>
            </Item>
            <Item name="phone" label="Phone" required>
                <Input/>
            </Item>
            <Item name="email" label="Email" required>
                <Input type="email"/>
            </Item>
            <Item name="roleId" label="Role" required>
                <Select
                    showSearch
                    defaultValue={selectedUser.roleId}
                    style={{width: 200}}
                    onChange={setSelectedValue}
                    placeholder="Select a role"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {roles.map((item, index) => {
                        return (
                            <Option key={index} value={item._id}>
                                {item.name}
                            </Option>
                        );
                    })}
                </Select>
            </Item>
        </Form>
    );
}
