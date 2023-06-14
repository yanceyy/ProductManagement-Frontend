import { useEffect, useState, useRef } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';

import {
    reGetUserList,
    reDeleteUser,
    reAddUser,
    reUpdateUser,
} from '../../api/action';
import { formateDate } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import AddForm from './add-form';

export default function User() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(0);
    const [selectedUser, setSelectedUser] = useState({});
    const outputRef = useRef(() => {});

    const getTableData = async () => {
        setLoading(true);
        try {
            const response = await reGetUserList();
            if (response.status === 0) {
                const { users, roles } = response.data;
                setUsers(users);
                setRoles(roles);
            } else {
                message.error("couldn't connect to the server");
            }
        } finally {
            setLoading(false);
        }
    };

    const addUpdateUser = async () => {
        //get data from children compenent
        const values = await outputRef?.current();
        if (values === undefined) return;

        let response;
        //check is ad or update mode
        if (showStatus === 1) response = await reAddUser(values);
        else {
            values._id = selectedUser._id;
            response = await reUpdateUser(values);
        }
        if (response.status === 0) {
            message.success('Successful');
            setShowStatus(0);
            getTableData();
        } else {
            message.error('Failed');
        }
    };

    const deleteUser = async (user) => {
        const _id = user._id;
        const response = await reDeleteUser(_id);

        if (response.status === 0) {
            message.success('delete user successfully');
            getTableData();
        } else {
            message.error('delete user failed');
        }
    };

    const columns = [
        {
            title: 'user name',
            dataIndex: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role id',
            dataIndex: 'role_id',
            // convert id to role name
            render: (roleId) => {
                const id = roles.findIndex((x) => x._id === roleId);
                return id === -1 ? null : roles[id].name;
            },
        },
        {
            title: 'Create time',
            dataIndex: 'create_time',
            render: formateDate,
        },
        {
            title: 'Operations',
            render: function operationRow(user) {
                return (
                    <span>
                        <LinkButton
                            onClick={() => {
                                setSelectedUser(user);
                                setShowStatus(2);
                            }}
                        >
                            Edit
                        </LinkButton>
                        <LinkButton
                            onClick={() => {
                                deleteUser(user);
                            }}
                        >
                            Delete
                        </LinkButton>
                    </span>
                );
            },
        },
    ];

    useEffect(() => {
        getTableData();
    }, []);

    const title = (
        <Button type="primary" onClick={() => setShowStatus(1)}>
            Create user
        </Button>
    );

    return (
        <Card title={title}>
            <Modal
                title={showStatus === 1 ? 'Add User' : 'Edit User'}
                destroyOnClose={true}
                open={showStatus === 1 || showStatus === 2}
                onOk={addUpdateUser}
                onCancel={() => {
                    setShowStatus(0);
                }}
            >
                <AddForm
                    showStatus={showStatus}
                    selectedUser={selectedUser}
                    roles={roles}
                    getOutput={(f) => (outputRef.current = f)}
                />
            </Modal>
            <Table
                dataSource={users}
                columns={columns}
                loading={loading}
                bordered
                pagination={{ defaultPageSize: PAGE_SIZE }}
                rowKey="_id"
            />
        </Card>
    );
}
