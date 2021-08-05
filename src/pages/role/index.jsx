import React, {Component} from 'react'
import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {regetRoleList, reCreateRole, reupdateRole} from '../../api/action'
import AddForm from './add-form'
import AuthForm from './auth-form'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";


export default class Role extends Component {
    state = {
        roles: [],
        role: {},
        loading: false,
        showStatus: 0
    }

    constructor(props) {
        super(props)
        this.authFrom = React.createRef()
    }

    // get tabel data from server
    getTableData = async () => {
        const data = await regetRoleList();
        if (data.status === 0) {
            const roles = data.data
            this.setState({roles})
        } else {
            message.error("couldn't get require data from server")
        }
    }

    // initial column name

    initColumn = () => {
        this.columns = [
            {
                title: "name",
                dataIndex: "name"
            }, {
                title: "create time",
                dataIndex: "create_time",
                render: formateDate
            }, {
                title: "authority time",
                dataIndex: "auth_time",
                render: formateDate
            }, {
                title: "authority person",
                dataIndex: "auth_name"
            }
        ]
    }

    // set click event on table
    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({role})
            }
        }
    }

    // add role
    addRole = () => { // similar to add category
        this.form.validateFields().then(async values => {
            this.setState({showStatus: 0})
            console.log(values)
            const result = await reCreateRole(values['RoleName'])
            if (result.status === 0) {
                this.form.resetFields() // clear input field
                message.success("add successfully")
                this.getTableData()
            } else 
                message.error("add failed")


            


        }).catch(() => {})
    }

    updateRole = async () => { // similar to add category
        const {role} = this.authFrom.current.state
        console.log(role)
        role.auth_name = memoryUtils.user.username
        const result = await reupdateRole(role)
        if (result.status === 0) {
            // if the user current change the property of self,
            // then require to relogin
            if (memoryUtils.user.role_id === role._id) {
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace("/login");
                message.success("role changes please relogin")
            } else {
                message.success("add successfully")
                this.setState({role}) // update the outdate role state
                this.setState({showStatus: 0})
                this.getTableData() // update loaded data
            }
        } else 
            message.error("add failed")
        
    }


    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getTableData()
    }

    render() {
        const {roles, loading, role, showStatus} = this.state
        const name = (
            <span>
                <Button type="primary"
                    onClick={
                        () => this.setState({showStatus: 1})
                }>
                    Create roles</Button>
                &nbsp;
                <Button type="primary"
                    onClick={
                        () => this.setState({showStatus: 2})
                    }
                    disabled={
                        !role._id
                }>Authority Settings</Button>
            </span>
        )
        return (
            <Card title={name}>
                <Modal title="Create Role"
                    visible={
                        showStatus === 1
                    }
                    onOk={
                        this.addRole
                    }
                    onCancel={
                        () => {
                            this.setState({showStatus: 0})
                            this.form.resetFields() // clear input field
                        }
                }>
                    <AddForm setForm={
                        (form) => {
                            this.form = form
                        }
                    }/>
                </Modal>
            <Modal title="Update Role"
                destroyOnClose={true}
                visible={
                    showStatus === 2
                }
                onOk={
                    this.updateRole
                }
                onCancel={
                    () => {
                        this.setState({showStatus: 0})
                    }
            }>
                <AuthForm ref={
                        this.authFrom
                    }
                    setForm={
                        (form) => {
                            this.form = form
                        }
                    }
                    role={role}/>
            </Modal>
        <Table dataSource={roles}
            onRow={
                this.onRow
            }
            rowSelection={
                {
                    type: "radio",
                    selectedRowKeys: [role._id]
                }
            }
            columns={
                this.columns
            }
            loading={loading}
            bordered
            pagination={
                {defaultPageSize: PAGE_SIZE}
            }
            rowKey='_id'/>
    </Card>
        )
    }
}
