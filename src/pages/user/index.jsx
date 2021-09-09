import React, {Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from "antd"
import {PAGE_SIZE} from '../../utils/constants'
import {regetUserList, redeleteUser, readdUser,reupdateUser} from "../../api/action"
import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import AddForm from './add-form'

export default class User extends Component {
    state = {
        users: [],
        loading: false,
        showStatus: 0,
        roles: []
    }
    initColumns = () => {
        this.columns = [
            {
                title: 'user name',
                dataIndex: "username"
            },
            {
                title: "Phone",
                dataIndex: "phone"
            },
            {
                title: "Email",
                dataIndex: "email"
            },
            {
                title: "Role id",
                dataIndex: "role_id",
                // convert id to role name
                render: (roleId) => {
                    const id = this.state.roles.findIndex(x => x._id === roleId)
                    return id === -1 ? null : this.state.roles[id].name
                }

            }, {
                title: "Create time",
                dataIndex: "create_time",
                render: formateDate
            }, {
                title: "Operations",
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={
                                ()=>{
                                    this.selectedUser = user
                                    this.setState({showStatus:2})
                                }
                            }>
                                Edit
                            </LinkButton>
                            <LinkButton onClick={
                                () => {
                                    this.deleteUser(user)
                                }
                            }>
                                Delete
                            </LinkButton>
                        </span>
                    )
                }
            }
        ]
    }

    addUpdateUser = async () => {
        const {showStatus} = this.state
        //get data from children compenent
        const values = await this.getOutput()
        console.log(values)
        let response;
        //check is ad or update mode
        if(showStatus===1)
        response = await readdUser(values)
        else{
        values._id = this.selectedUser._id
        response = await reupdateUser(values)
        }
        if (response.status === 0) {
            message.success("Successful")
            this.setState({showStatus: 0})
            this.getTableData()
        } else {
            message.error("Failed")
        }
    }

    deleteUser = async (user) => {
        const _id = user._id
        const response = await redeleteUser(_id)
        if (response.status === 0) {
            message.success("delete user successfully")
            this.getTableData()
        } else {
            message.error("delete user failed")
        }
    }

    getTableData = async () => {
        const response = await regetUserList();
        if (response.status === 0) {
            const {users, roles} = response.data
            this.setState({users, roles})
        } else {
            message.error("couldn't connect to the server")
        }

    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getTableData();
    }




    render() {
        const {loading, users, showStatus, roles} = this.state
        const title = (
            <Button type='primary'
                onClick={
                    ()=>this.setState({showStatus: 1})
            }>Create user</Button>
        )
        return (
            <Card title={title}>
                <Modal title={showStatus===1?"Add User":"Edit User"}
                    destroyOnClose={true}
                    visible={
                        showStatus === 1 ||  showStatus === 2
                    }
                    onOk={
                        this.addUpdateUser
                    }
                    onCancel={
                        () => {
                            this.setState({showStatus: 0})
                        }
                }>

                    <AddForm 
                    showStatus={showStatus}
                    selectedUser= {this.selectedUser} 
                    roles={roles}
                    getOutput={
                            f => this.getOutput = f
                        }/>
                </Modal>
                <Table dataSource={users}
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
