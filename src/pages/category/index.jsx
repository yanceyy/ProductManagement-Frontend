import React, {Component} from 'react';
import {
    Card,
    Button,
    Table,
    message,
    Modal,
    Input
} from 'antd';
import {PlusOutlined, ArrowRightOutlined} from "@ant-design/icons";
import LinkButton from '../../components/link-button';
import {regetCategory, readdCategory, reupdateCategory} from "../../api/action";
import AddForm from './addForm';
import UpdateForm from './updateForm';

export default class Category extends Component {

    state = {
        categoryNames: [],
        subCategoryNames: [],
        loading: false,
        parentId: "0", /* current showing category */
        parentName: "First level category", /* parent name of current showing category */
        showStatus: 0, /* */
    }


    /* use axios to get all the rows data from server */
    getCategoryNames = (requireId) => {
        this.setState({loading: true})
        const parentId = requireId || this.state.parentId
        return regetCategory(parentId).then(result => {
            if (result.status === 0) {
                if (parentId === "0") 
                    this.setState({categoryNames: result.data})
                 else 
                    this.setState({subCategoryNames: result.data})

            } else {
                message.error("Failed to get category data from server")
            }
            this.setState({loading: false})
        })
    }


    showSubcategories = (category) => {
        const {parentId, name, _id} = category;
        // const subCategoryNames = this.getCategoryNames()
        this.setState({
            parentName: name,
            parentId: _id
        }, this.getCategoryNames)
    }
    /* initial get the column names */
    getInitialColumnsNames = () => {
        this.columns = [
            {
                title: 'Category Name',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: 'Operations',
                width: 300, /* set the column width */
                render: (_, category) => (
                    <span>
                        <LinkButton onClick={
                            () => this.showUpdate(category)
                        }>
                            Change
                        </LinkButton>
                        {
                        this.state.parentId === "0" ? (
                            <LinkButton onClick={
                                () => this.showSubcategories(category)
                            }>
                                Details
                            </LinkButton>
                        ) : null
                    } </span>
                ),
                dataIndex: 'operations',
                key: 'operations'
            },
        ];
    }

    showUpdate = (category) => {
        this.category = category
        this.setState({showStatus: 2})
    }

    componentWillMount() {
        this.getInitialColumnsNames()

    }
    componentDidMount() { /* get the first level of category */
        this.getCategoryNames()

    }

    addCategory = async () => {
        this.form.validateFields().then(async values => {
            this.setState({showStatus: 0})
            const parentId = values['parentId']
            const categoryName = values['categoryName']
            console.log("addCategory   ", parentId, categoryName)
            const result = await readdCategory(parentId, categoryName)
            if (result.status === 0) 
                this.getCategoryNames(parentId)
            
        }).catch(() => {})
        // validate the inputtings


        // only update the required page
    }

    updateCategory = () => {
        this.form.validateFields().then(async values => {
            this.setState({showStatus: 0}) // hide the dialogue
            const cayegoryId = this.category._id
            const categoryName = values['categoryName']
            console.log("categoryName", categoryName)
            const result = await reupdateCategory(cayegoryId, categoryName)
            if (result.status === 0) 
                this.getCategoryNames()
            
        }).catch(() => {}) // validate the inputtings
    }

    render() {
        const {
            loading,
            categoryNames,
            subCategoryNames,
            parentId,
            parentName,
            showStatus
        } = this.state;

        /* */
        const title = parentId === "0" ? <span>First level category</span> : <span>
            <LinkButton onClick={
                () => this.setState({parentId: "0", parentName: "", subCategoryNames: []})
            }>First level category</LinkButton><ArrowRightOutlined/> {parentName}</span>;
        const extra = (
            <Button type='primary'
                onClick={
                    () => {
                        this.setState({showStatus: 1})
                    }
            }>
                <PlusOutlined/>
                Add
            </Button>
        )
        const category = this.category || {}

        return (
            <div>
                <Modal title="Add"
                    visible={
                        showStatus === 1
                    }
                    onOk={
                        this.addCategory
                    }
                    destroyOnClose={true}
                    //  may be more costing
                    onCancel={
                        () => {
                            this.setState({showStatus: 0})
                        }
                }>
                    <AddForm categoryNames={
                            this.state.categoryNames
                        }
                        parentId={
                            this.state.parentId
                        }
                        setForm={
                            (form) => {
                                this.form = form
                            }
                        }/>
                </Modal>
            <Modal title="Change"
                visible={
                    showStatus === 2
                }
                onOk={
                    this.updateCategory
                }
                // destroyOnClose={true} may be more costing
                onCancel={
                    () => {
                        this.setState({showStatus: 0})
                    }
            }>
                <UpdateForm categoryName={
                        category.name
                    }
                    setForm={
                        (form) => {
                            this.form = form
                        }
                    }/> {/*get the reference to the form*/} </Modal>
            <Card title={title}
                extra={extra}>
                <Table dataSource={
                        parentId === "0" ? categoryNames : subCategoryNames
                    }
                    columns={
                        this.columns
                    }
                    loading={loading}
                    bordered
                    rowKey='_id'/>
            </Card>
        </div>
        );
    }
}
