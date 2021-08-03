import React, {Component} from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message
} from 'antd'
import {PlusOutlined} from "@ant-design/icons";
import LinkButton from '../../components/link-button';
import {regetList, researchProducts, reupdateStatus} from '../../api/action'
import {PAGE_SIZE} from '../../utils/constants';


export default class ProductHome extends Component {

    state = {
        loading: false,
        total: 0,
        searchName: "", // keywords for search
        searchType: "productName",
        products: [
            {
                name: "",
                description: "",
                price: 50,
                status: 0
            }
        ]
    }

    getColumnData = (pageNum = 1) => { // get the data from server
        this.setState({loading: true})
        this.pageNum = pageNum // store the current page number to be used for updating status
        const {searchName, searchType} = this.state
        console.log(searchName, searchType)
        if (searchName) {
            researchProducts(pageNum, PAGE_SIZE, searchName, searchType).then(result => {
                if (result.status === 0) {
                    const {list, total} = result.data
                    this.setState({products: list, total})
                }
            })
        } else {
            regetList(pageNum, PAGE_SIZE).then(result => {
                if (result.status === 0) {
                    const {list, total} = result.data
                    this.setState({products: list, total})

                }
            })

        }
        this.setState({loading: false})
    }


    updateStatus = async (id, status) => {
        const result = await reupdateStatus(id, status)
        if (result.status === 0) {
            message.success("Update sucssfully")
        } else {
            message.error("Update failed")
        }
        this.getColumnData(this.pageNum)
    }


    initColumns = () => { // initial columns
        this.columns = [
            {
                width: 150,
                title: 'Name',
                dataIndex: 'name'
            },
            {
                width: "60%",
                title: 'Description',
                dataIndex: 'desc'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: (price) => {
                    return 'AU$' + price;
                }
            },
            {
                title: 'Status',
                // dataIndex: 'status', donot contain dataIndex will pass all the row information
                render: (product) => {
                    const {status, _id} = product;
                    const newStatus = status ? 0 : 1;
                    return <span>
                        <Button type="primary"
                            style={
                                {
                                    width: "100px",
                                    margin: "0 auto 5px"
                                }
                            }
                            onClick={
                                () => this.updateStatus(_id, newStatus)
                        }> 
                            {
                            status === 1 ? "Unlisted" : "Relisted"
                        }</Button>
                        <div style={
                            {textAlign: "center"}
                        }>
                            {
                            status === 1 ? "Listed" : "Unlisted"
                        }</div>
                    </span>
                }
            }, {
                title: 'Operations', // donot add dataIndex attribute for columns that only provide operation
                render: (product) => (
                    <span>
                        <LinkButton onClick={
                            () => this.props.history.push('/product/add', product)
                        }>Update</LinkButton>
                        {/* use the second paramter to pass state to another component */}
                        <LinkButton onClick={
                            () => this.props.history.push('/product/info', {product})
                        }>Details</LinkButton>
                    </span>
                )
            }
        ]
    }


    componentWillMount() {
        this.initColumns()
        this.getColumnData()
    }

    render() {

        const {
            products,
            total,
            loading,
            searchName,
            searchType
        } = this.state;
        console.log(products)
        const title = (
            <div>
                <Select value={searchType}
                    onChange={
                        value => this.setState({searchType: value})
                    }
                    style={
                        {width: "150px"}
                }>
                    <Select.Option value="productName">
                        By name</Select.Option>
                    <Select.Option value="productDesc">
                        By description</Select.Option>
                </Select>
                <Input type='text' placeholder="keywords"
                    value={searchName}
                    onChange={
                        event => this.setState({searchName: event.target.value})
                    }
                    style={
                        {
                            width: "150px",
                            margin: "0 15px"
                        }
                    }/>
                <Button type="primary"
                    onClick={
                        () => this.getColumnData(1)
                }>Search</Button>
            </div>
        );
        const extra = (
            <Button type="primary"
                onClick={
                    () => {
                        this.props.history.push('/product/add')
                    }
            }>
                <PlusOutlined/>
                Add Product</Button>
        )
        return (
            <Card title={title}
                extra={extra}>
                <Table bordered
                    columns={
                        this.columns
                    }
                    loading={loading}
                    pagination={
                        {
                            defaultPageSize: PAGE_SIZE,
                            onChange: this.getColumnData,
                            total
                        }
                    }
                    rowKey="_id"
                    dataSource={products}/>
            </Card>
        )
    }
}
