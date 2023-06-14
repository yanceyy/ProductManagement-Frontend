import { useState, useEffect } from 'react';
import { Card, List, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './product.less';
import { IMAGE_UPLOAD_URL } from '../../utils/constants';
import { regetCategoryById } from '../../api/action';

/*
component to show the detailed information about a product
*/

const Item = List.Item;

function ProductPage(props) {
    const [cName1, setCName1] = useState('');
    const [cName2, setCName2] = useState('');
    const { pCategoryId, categoryId, name, desc, price, detail, imgs } =
        props.location.state.product;

    useEffect(() => {
        const fetchCategoryNames = async () => {
            if (pCategoryId === '0') {
                const categoryName = await regetCategoryById(categoryId);
                setCName1(categoryName.data.name);
            } else {
                const [categoryName, categoryName2] = await Promise.all([
                    regetCategoryById(pCategoryId),
                    regetCategoryById(categoryId),
                ]);
                setCName1(categoryName.data.name);
                setCName2(categoryName2.data.name);
            }
        };

        fetchCategoryNames();
    }, [pCategoryId, categoryId]);

    const title = (
        <div>
            <ArrowLeftOutlined
                onClick={() => props.history.replace('/product')}
                className="detailgoback"
            />
            <span style={{ marginLeft: '5px' }}>details</span>
        </div>
    );

    return (
        <Card title={title}>
            <List>
                <Item className="product-detail">
                    <span className="left-col">Product name:</span>
                    <span className="right-col">{name}</span>
                </Item>
                <Item className="product-detail">
                    <span className="left-col">Product details:</span>
                    <span className="right-col">{desc}</span>
                </Item>
                <Item className="product-detail">
                    <span className="left-col">Price:</span>
                    <span className="right-col">AU$ {price}</span>
                </Item>
                <Item className="product-detail">
                    <span className="left-col">Category:</span>
                    <span className="right-col">
                        {cName2 ? cName1 + ' --> ' + cName2 : cName1}
                    </span>
                </Item>
                <Item className="product-detail">
                    <span className="left-col">Pictures:</span>
                    <span className="right-col">
                        {imgs.map((img, index) => (
                            <Image
                                key={index}
                                className="productimgs"
                                src={IMAGE_UPLOAD_URL + img}
                            />
                        ))}
                    </span>
                </Item>
                <Item className="product-detail">
                    <span className="left-col">Description:</span>
                    <span
                        className="right-col"
                        dangerouslySetInnerHTML={{ __html: detail }}
                    ></span>
                </Item>
            </List>
        </Card>
    );
}

export default ProductPage;
