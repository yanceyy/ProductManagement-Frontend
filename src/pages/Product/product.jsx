import './product.less';

import {Card, Image, List} from 'antd';
import {useEffect, useState} from 'react';

import {ArrowLeftOutlined} from '@ant-design/icons';
import {IMAGE_UPLOAD_URL} from '../../utils/constants';
import {reGetCategoryById} from '../../api/action';

/*
component to show the detailed information about a product
*/

const Item = List.Item;

function ProductPage({location, history}) {
    const [cName1, setCName1] = useState('');
    const [cName2, setCName2] = useState('');
    const {pCategoryId, categoryId, name, desc, price, detail, images} =
        location.state.product;

    useEffect(() => {
        const fetchCategoryNames = async () => {
            console.log({pCategoryId, categoryId})
            if (pCategoryId === undefined) {
                const categoryName = await reGetCategoryById(categoryId);
                setCName1(categoryName.name);
            } else {
                const [categoryName, categoryName2] = await Promise.all([
                    reGetCategoryById(pCategoryId),
                    reGetCategoryById(categoryId),
                ]);
                setCName1(categoryName.name);
                setCName2(categoryName2.name);
            }
        };

        fetchCategoryNames();
    }, [pCategoryId, categoryId]);

    const title = (
        <div>
            <ArrowLeftOutlined
                onClick={() => history.replace('/product')}
                className="detailgoback"
            />
            <span style={{marginLeft: '5px'}}>details</span>
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
                        {(images ?? []).map((img, index) => (
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
                        dangerouslySetInnerHTML={{__html: detail}}
                    ></span>
                </Item>
            </List>
        </Card>
    );
}

export default ProductPage;
