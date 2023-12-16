import {Button, Card, Modal, Table, Tooltip, message} from 'antd';
import {reCreateRole, reGetRoleList, reUpdateRole} from '../../api/action';
import {useEffect, useRef, useState} from 'react';

import AddForm from './add-form';
import AuthForm from './auth-form';
import {PAGE_SIZE} from '../../utils/constants';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {useHistory} from 'react-router-dom';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
    },
    {
        title: 'create time',
        dataIndex: 'createTime',
        render: formateDate,
    },
    {
        title: 'authority time',
        dataIndex: 'authGrantTime',
        render: formateDate,
    },
    {
        title: 'authority person',
        dataIndex: 'authGrantUsername',
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
            const roles = await reGetRoleList();
            setRoles(roles);
        } catch (e) {
            message.error("couldn't get require data from server");
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
                try {
                    await reCreateRole(values['RoleName']);
                    form.current.resetFields(); // clear input field
                    message.success('add successfully');
                    await getTableData();
                    setShowStatus(0);
                } catch (e) {
                    message.error('add failed');
                }
            })
            .catch(() => {
            });
    };

    const updateRole = async () => {
        // similar to add category
        await reUpdateRole(role);
        if (memoryUtils.user.roleId === role._id) {
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
                <AuthForm setRole={setRole} role={role}/>
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
                pagination={{defaultPageSize: PAGE_SIZE}}
                rowKey="_id"
            />
        </Card>
    );
}
