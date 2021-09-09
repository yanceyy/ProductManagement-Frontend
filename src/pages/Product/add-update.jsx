import React, { Component } from 'react';
import { Card, Button, Form, Input, Cascader, message } from 'antd';
import LinkButton from '../../components/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { regetCategory } from '../../api/action';
import PicturesWall from './pictures-wall';
import RichTextEditor from './richTextEditor';
import { readdupdateProduct } from '../../api/action';
/*
component for adding and updating products
*/

export default class ProductAddUpdate extends Component {
    state = {
        options: [],
    };
    formRef = React.createRef();

    submit = () => {
        // validate the form
        this.formRef.current
            .validateFields()
            .then(async (values) => {
                const { productName, productDetail, price, category } = values;
                let categories;
                // check the level of category
                if (category.length === 2) {
                    categories = {
                        categoryId: category[1],
                        pCategoryId: category[0],
                    };
                } else {
                    categories = {
                        pCategoryId: '0',
                        categoryId: category[0],
                    };
                }
                // construct the data for submitting
                const data = {
                    ...categories,
                    name: productName,
                    desc: productDetail,
                    price,
                    imgs: this.getUploadedPicture(),
                    detail: this.getDetails(),
                };
                // when updating then add _id attribute
                if (this.product) {
                    data._id = this.product._id;
                }
                const result = await readdupdateProduct(data);
                if (result.status === 0) {
                    message.success('success');
                    this.props.history.push('/product');
                } else {
                    message.error('failed');
                }
            })
            .catch(() => message.error('please complete the table'));
    };

    /*
initl the options for the categories
*/
    initOptions = async (categories) => {
        console.log(categories);
        const options = categories.map((item) => {
            return { value: item._id, label: item.name, isLeaf: false };
        });
        /*
        used when updating, since we need to get the subcategory data before set it as defalut values
        */
        const { isUpdate, product } = this;
        const { pCategoryId } = product;
        if (isUpdate && pCategoryId != 0) {
            const subcategories = await this.getCategoryArray(pCategoryId);
            const categorywithsubId = options.findIndex(
                (item) => item.value === pCategoryId
            );
            options[categorywithsubId]['children'] =
                this.addOptions(subcategories);
        }
        this.setState({ options });
    };

    /*
    dynamic add the options for the categories
    */
    addOptions = (categories) => {
        console.log(categories);
        const options = categories.map((c) => {
            return { value: c._id, label: c.name, isLeaf: true };
        });
        return options;
    };

    getCategoryArray = async (parentId) => {
        const firstCategories = await regetCategory(parentId);
        if (firstCategories.status === 0) {
            const categories = firstCategories.data;
            return categories;
        }
        return {};
    };

    async componentDidMount() {
        const categories = await this.getCategoryArray(0);
        this.initOptions(categories);
    }

    UNSAFE_componentWillMount() {
        const product = this.props.location.state;
        this.isUpdate = !!product;
        this.product = product || {};
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    // dynamic load subcategory data from server
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const categories = await this.getCategoryArray(targetOption.value);
        targetOption.children = this.addOptions(categories);
        targetOption.loading = false;
        this.setState({}); // require render the page
    };
    render() {
        const { Item } = Form;
        const { TextArea } = Input;
        // used for updating
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId, imgs, detail } = product;
        const categoryIds = [];
        if (isUpdate) {
            if (pCategoryId == 0) categoryIds.push(categoryId);
            else {
                categoryIds.push(pCategoryId, categoryId);
            }
        }
        const formItemLayout = {
            labelCol: {
                span: 2,
            }, // set the length of label
            wrapperCol: {
                span: 6,
            }, // set the length of wapper component
        };
        const title = (
            <div>
                <LinkButton onClick={() => this.props.history.push('/product')}>
                    <ArrowLeftOutlined />
                </LinkButton>
                {isUpdate ? 'Update Product' : 'Add Product'}{' '}
            </div>
        );
        return (
            <Card title={title}>
                <Form ref={this.formRef} {...formItemLayout}>
                    <Item
                        label="Product name"
                        name="productName"
                        initialValue={product.name}
                        //must add name feature to make the rules effective
                        rules={[
                            {
                                required: true,
                                message: 'Please input your value!',
                            },
                            {
                                max: 99,
                                message: 'Ymust be shorter than 99!',
                            },
                        ]}
                    >
                        <Input />
                    </Item>
                    <Item
                        name="productDetail"
                        label="Product detail"
                        initialValue={product.desc}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your value!',
                            },
                            {
                                max: 1000,
                                message: 'Ymust be shorter than 99!',
                            },
                        ]}
                    >
                        {/* set the minimum rows of the input area */}
                        <TextArea autosize={{ minRows: 2 }}></TextArea>
                    </Item>
                    <Item
                        label="Price"
                        name="price"
                        initialValue={product.price}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your value!',
                            },
                            () => ({
                                validator(_, value) {
                                    if (value > 0) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The price must be bigger than 0!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        {/* set the minimum rows of the input area */}
                        <Input type="number" addonAfter="AU$"></Input>
                    </Item>
                    <Item
                        name="category"
                        label="Category"
                        initialValue={categoryIds}
                        rules={[
                            {
                                required: true,
                                message: 'Please select a category!',
                            },
                        ]}
                    >
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            changeOnSelect
                        />
                    </Item>
                    <Item name="images" label="Images">
                        <PicturesWall
                            bindPictures={(x) => (this.getUploadedPicture = x)}
                            imgs={imgs}
                        />
                    </Item>
                    <Item
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 16 }}
                        name="description"
                        label="Description"
                    >
                        <RichTextEditor
                            detail={detail}
                            bindDtails={(x) => (this.getDetails = x)}
                        />
                    </Item>

                    <Button type="primary" onClick={this.submit}>
                        Submit
                    </Button>
                </Form>
            </Card>
        );
    }
}
