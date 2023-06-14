import { useEffect, useRef, useState } from 'react';
import { Card, Button, Table, message, Modal, Tooltip } from 'antd';
import { PAGE_SIZE } from '../../utils/constants';
import { reGetRoleList, reCreateRole, reUpdateRole } from '../../api/action';
import AddForm from './add-form';
import AuthForm from './auth-form';
import { useHistory } from 'react-router-dom';
import { formateDate } from '../../utils/dateUtils';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
    },
    {
        title: 'create time',
        dataIndex: 'create_time',
        render: formateDate,
    },
    {
        title: 'authority time',
        dataIndex: 'auth_time',
        render: formateDate,
    },
    {
        title: 'authority person',
        dataIndex: 'auth_name',
    },
];

export default function Role() {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(0);
    const history = useHistory();
    const form = useRef();

    // get tabel data from server
    const getTableData = async () => {
        setIsLoading(true);
        try {
            const data = await reGetRoleList();
            if (data.status === 0) {
                const roles = data.data;
                setRoles(roles);
            } else {
                message.error("couldn't get require data from server");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // set click event on table
    const onRow = (role) => {
        return {
            onClick: () => {
                setRole(role);
            },
        };
    };

    // add role
    const addRole = () => {
        // similar to add category
        form.current
            .validateFields()
            .then(async (values) => {
                const result = await reCreateRole(values['RoleName']);
                if (result.status === 0) {
                    form.current.resetFields(); // clear input field
                    message.success('add successfully');
                    getTableData();
                    setShowStatus(0);
                } else message.error('add failed');
            })
            .catch(() => {});
    };

    const updateRole = async () => {
        // similar to add category
        role.auth_name = memoryUtils.user.username;
        const result = await reUpdateRole(role);
        if (result.status === 0) {
            // if the user current change the property of self,
            // then require to relogin
            if (memoryUtils.user.role_id === role._id) {
                storageUtils.removeUser();
                memoryUtils.user = {};
                history.replace('/login');
                message.success('role changes please relogin');
            } else {
                message.success('add successfully');
                setRole(role); // update the outdate role state
                setShowStatus(0);
                getTableData(); // update loaded data
            }
        } else message.error('add failed');
    };

    useEffect(() => {
        getTableData();
    }, []);

    const name = (
        <span>
            <Button type="primary" onClick={() => setShowStatus(1)}>
                Create roles
            </Button>
            &nbsp;
            <Tooltip
                trigger={role._id ? '' : 'hover'}
                title="Please click row to select the role you want to change"
            >
                <Button
                    type="primary"
                    onClick={() => setShowStatus(2)}
                    disabled={!role._id}
                >
                    Authority Settings
                </Button>
            </Tooltip>
        </span>
    );
    return (
        <Card title={name}>
            <Modal
                title="Create Role"
                open={showStatus === 1}
                onOk={addRole}
                onCancel={() => {
                    setShowStatus(0);
                    form.current.resetFields(); // clear input field
                }}
            >
                <AddForm
                    setForm={(_form) => {
                        form.current = _form;
                    }}
                />
            </Modal>
            <Modal
                title="Update Role"
                destroyOnClose={true}
                open={showStatus === 2}
                onOk={updateRole}
                onCancel={() => {
                    setShowStatus(0);
                }}
            >
                <AuthForm setRole={setRole} role={role} />
            </Modal>
            <Table
                dataSource={roles}
                onRow={onRow}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role._id],
                    onSelect: setRole,
                }}
                columns={columns}
                loading={isLoading}
                bordered
                pagination={{ defaultPageSize: PAGE_SIZE }}
                rowKey="_id"
            />
        </Card>
    );
}
