import {Button, Card, Modal, Popconfirm, Table, message} from 'antd';
import {
    reAddUser,
    reDeleteUser, reGetRoleList,
    reGetUserList,
    reUpdateUser,
} from '../../api/action';
import {useEffect, useRef, useState} from 'react';

import AddForm from './add-form';
import LinkButton from '../../components/link-button';
import {PAGE_SIZE} from '../../utils/constants';
import {formateDate} from '../../utils/dateUtils';

export default function User() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(0);
    const [selectedUser, setSelectedUser] = useState({});
    const outputRef = useRef(() => {
    });

    const getTableData = async () => {
        setLoading(true);
        try {
            const users = await reGetUserList();
            setUsers(users);
            const roles = await reGetRoleList();
            setRoles(roles);
        } finally {
            setLoading(false);
        }
    };

    const addUpdateUser = async () => {
        //get data from children compenent
        const values = await outputRef?.current();
        if (values === undefined) return;

        //check is ad or update mode
        if (showStatus === 1) {
            await reAddUser(values);
        } else {
            values._id = selectedUser._id;
            await reUpdateUser(values);
        }
        message.success('Successful');
        await getTableData();
        setShowStatus(0);
    };

    const deleteUser = async (user) => {
        const _id = user._id;
        await reDeleteUser(_id);
        message.success('delete user successfully');
        await getTableData();
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
            dataIndex: 'roleId',
            // convert id to role name
            render: (roleId) => {
                const id = roles.findIndex((x) => x._id === roleId);
                return id === -1 ? null : roles[id].name;
            },
        },
        {
            title: 'Create time',
            dataIndex: 'createTime',
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
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => {
                                deleteUser(user);
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <LinkButton>Delete</LinkButton>
                        </Popconfirm>
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
                pagination={{defaultPageSize: PAGE_SIZE}}
                rowKey="_id"
            />
        </Card>
    );
}
