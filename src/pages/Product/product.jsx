import React, {Component} from 'react'
import {Card, Icon, List} from 'antd'
import {ArrowLeftOutlined} from "@ant-design/icons"
import "./product.less"
import {IMG_URL} from "../../utils/constants"
import {regetCategoryById} from '../../api/action'
/*
component to show the detailed information about a product
*/

export default class ProductPage extends Component {

    state = {
        cName1: '',
        cName2: ''
    }

    async componentDidMount() {
        const {pCategoryId, categoryId} = this.props.location.state.product;
        if (pCategoryId === '0') {
            const categoryName = await regetCategoryById(categoryId)
            const cName1 = categoryName.data.name
            this.setState(cName1)
        } else {
            const [categoryName, categoryName2] = await Promise.all([regetCategoryById(pCategoryId), regetCategoryById(categoryId)])
            const cName1 = categoryName.data.name
            const cName2 = categoryName2.data.name
            this.setState({cName1, cName2})
        }
    }

    render() {
        const {cName1, cName2} = this.state
        const {
            name,
            desc,
            price,
            detail,
            imgs
        } = this.props.location.state.product;
        const Item = List.Item
        const title = (
            <div>
                <ArrowLeftOutlined onClick={
                        () => this.props.history.replace('/product')
                    }
                    className="detailgoback"/>
                <span style={
                    {marginLeft: "5px"}
                }>details</span>
            </div>
        )
        return (
            <Card title={title}>
                <List>
                    <Item className="product-detail">
                        <span className="left-col">Product name:</span>
                        <span className="right-col">
                            {name}</span>
                    </Item>
                    <Item className="product-detail">
                        <span className="left-col">Product details:</span>
                        <span className="right-col">
                            {desc}</span>
                    </Item>
                    <Item className="product-detail">
                        <span className="left-col">Price:</span>
                        <span className="right-col">AU$ {price}</span>
                    </Item>
                    <Item className="product-detail">
                        <span className="left-col">Category:</span>
                        <span className="right-col">
                            {
                            cName2 ? cName1 + " --> " + cName2 : cName1
                        }</span>
                    </Item>
                    <Item className="product-detail">
                        <span className="left-col">Pictures:</span>
                        <span className="right-col">
                            {
                            imgs.map(img => (
                                <img className="productimgs"
                                    src={
                                        IMG_URL + img
                                    }
                                    alt=""/>
                            ))
                        } </span>
                    </Item>
                    <Item className="product-detail">
                        <span className="left-col">Description:</span>
                        <span className="right-col"
                            dangerouslySetInnerHTML={
                                {__html: detail}
                        }></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
