import {useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo} from 'react';
import {Button, Card, Cascader, Form, Input, message} from 'antd';
import LinkButton from '../../components/link-button';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {readdupdateProduct, regetCategory} from '../../api/action';
import PicturesWall from './pictures-wall';
import RichTextEditor from './richTextEditor';
import {useHistory} from "react-router-dom";

/*
component for adding and updating products
*/
const formItemLayout = {
    labelCol: {
        span: 2,
    }, // set the length of label
    wrapperCol: {
        span: 6,
    }, // set the length of wapper component
};
const {Item} = Form;
const {TextArea} = Input;

export default function ProductAddUpdate() {
    const history = useHistory();
    const selectedProduct = history.location.state;
    const isUpdate = !!selectedProduct;
    console.log({selectedProduct})
    const [options, setOptions] = useState([]);
    const formRef = useRef();
    const [uploadedPicture, setUploadPictures] = useState(selectedProduct ? selectedProduct.imgs : []);
    const [details, setDetails] = useState(selectedProduct ? selectedProduct.detail : "");

    const submit = useCallback(() => {
        // validate the form
        if (!formRef.current) return;
        formRef.current.validateFields()
            .then(async (values) => {
                const {productName, productDetail, price, category} = values;
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
                    imgs: uploadedPicture,
                    detail: details,
                };
                //when updating then add _id attribute
                if (selectedProduct) {
                    data._id = selectedProduct._id;
                }
                const result = await readdupdateProduct(data);
                if (result.status === 0) {
                    message.success('success');
                    history.push('/product');
                } else {
                    message.error('failed');
                }
            })
            .catch((e) => {
                console.error(e);
                message.error('please complete the table')
            });
    }, [details, history, uploadedPicture]);

    const getCategoryArray = useCallback(async (parentId) => {
        const firstCategories = await regetCategory(parentId);
        if (firstCategories.status === 0) {
            const categories = firstCategories.data;
            return categories;
        }
        return {};
    }, []);

    /*
    dynamic add the options for the categories
    */
    const addOptions = useCallback((categories) => {
        return categories.map((c) => {
            return {value: c._id, label: c.name, isLeaf: true};
        });
    }, []);

    /*
    initl the options for the categories
    */
    const initOptions = useCallback(async (categories) => {
        const options = categories.map((item) => {
            return {value: item._id, label: item.name, isLeaf: false};
        });
        /*
        used when updating, since we need to get the subcategory data before set it as defalut values
        */
        if (isUpdate) {
            const {pCategoryId} = selectedProduct;
            if (pCategoryId !== 0) {
                const subcategories = await getCategoryArray(pCategoryId);
                const categorywithsubId = options.findIndex(
                    (item) => item.value === pCategoryId
                );
                options[categorywithsubId]['children'] =
                    addOptions(subcategories);
            }
        }
        setOptions(options);
    }, [addOptions, getCategoryArray, isUpdate, selectedProduct]);


    useEffect(() => {
        async function getOptions() {
            const categories = await getCategoryArray(0);
            initOptions(categories);
        }

        getOptions();
    }, [getCategoryArray, initOptions])


    // dynamic load subcategory data from server
    const loadData = useCallback(async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const categories = await getCategoryArray(targetOption.value);
        targetOption.children = addOptions(categories);
        targetOption.loading = false;
        setOptions([...options]);
    }, [addOptions, getCategoryArray, options]);

    const {categoryIds} = useMemo(() => {
        const categoryIds = [];
        if (isUpdate) {
            const {pCategoryId, categoryId} = selectedProduct;
            if (pCategoryId === 0) categoryIds.push(categoryId);
            else {
                categoryIds.push(pCategoryId, categoryId);
            }
        }
        return {categoryIds}
    }, [isUpdate, selectedProduct])

    return (
        <Card title={
            <div>
                <LinkButton onClick={() => history.push('/product')}>
                    <ArrowLeftOutlined/>
                </LinkButton>
                {isUpdate ? 'Update Product' : 'Add Product'}{' '}
            </div>}>
            <Form ref={formRef} {...formItemLayout}>
                <Item
                    label="Product name"
                    name="productName"
                    initialValue={selectedProduct?.name}
                    //must add name feature to make the rules effective
                    rules={[
                        {
                            required: true,
                            message: 'Please input your value!',
                        },
                        {
                            max: 99,
                            message: 'must be shorter than 99!',
                        },
                    ]}
                >
                    <Input/>
                </Item>
                <Item
                    name="productDetail"
                    label="Product detail"
                    initialValue={selectedProduct?.desc}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your value!',
                        },
                        {
                            max: 1000,
                            message: 'must be shorter than 99!',
                        },
                    ]}
                >
                    {/* set the minimum rows of the input area */}
                    <TextArea autosize={{minRows: 2}}></TextArea>
                </Item>
                <Item
                    label="Price"
                    name="price"
                    initialValue={selectedProduct?.price}
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
                        options={options}
                        loadData={loadData}
                        changeOnSelect
                    />
                </Item>
                <Item name="images" label="Images">
                    <PicturesWall
                        bindPictures={setUploadPictures}
                        imgs={uploadedPicture}
                    />
                </Item>
                <Item
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}
                    name="description"
                    label="Description"
                >
                    <RichTextEditor
                        detail={details}
                        bindDetails={setDetails}
                    />
                </Item>
                <Button type="primary" onClick={submit}>
                    Submit
                </Button>
            </Form>
        </Card>
    );
}
