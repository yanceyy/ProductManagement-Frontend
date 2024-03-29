import {Button, Card, Input, Select, Table, message} from 'antd';
import {reGetList, reSearchProducts, reUpdateStatus} from '../../api/action';
import {useEffect, useState} from 'react';

import LinkButton from '../../components/link-button';
import {PAGE_SIZE} from '../../utils/constants';
import {PlusOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

export default function ProductHome() {
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [searchName, setSearchName] = useState(''); // keywords for search
    const [searchType, setSearchType] = useState('productName');
    const [products, setProducts] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const history = useHistory();

    const getColumnData = (pageNum = 1) => {
        // get the data from server
        setLoading(true);
        if (searchName) {
            reSearchProducts(pageNum, PAGE_SIZE, searchName, searchType).then(
                (result) => {
                    const {list, total} = result;
                    setProducts(list);
                    setTotal(total);
                },
            );
        } else {
            reGetList(pageNum, PAGE_SIZE).then((result) => {
                const {list, total} = result;
                setProducts(list);
                setTotal(total);
            });
        }
        setLoading(false);
    };

    const updateStatus = async (id, status) => {
        await reUpdateStatus(id, status);
        message.success('Update successfully');
        getColumnData(pageNum);
    };

    const columns = [
        {
            width: 150,
            title: 'Name',
            dataIndex: 'name',
        },
        {
            width: '50%',
            title: 'Description',
            dataIndex: 'desc',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => {
                return 'AU$' + price;
            },
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Status',
            render: function ListAction(product) {
                const {status} = product;
                return <span>{status === 1 ? 'Listed' : 'Unlisted'}</span>;
            },
        },
        {
            title: 'Operations',
            render: function EditAction(product) {
                const {status, _id} = product;
                return (
                    <span>
                        <LinkButton
                            onClick={() =>
                                history.push('/product/add', product)
                            }
                        >
                            Update
                        </LinkButton>
                        <LinkButton
                            onClick={() =>
                                history.push('/product/info', {product})
                            }
                        >
                            Details
                        </LinkButton>
                        <LinkButton
                            onClick={() => {
                                const newStatus = status ? 0 : 1;
                                updateStatus(_id, newStatus);
                            }}
                        >
                            {status === 1 ? 'Unlisted' : 'Relisted'}
                        </LinkButton>
                    </span>
                );
            },
        },
    ];

    useEffect(() => {
        getColumnData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once after initial render

    const title = (
        <div>
            <Select
                value={searchType}
                onChange={(value) => setSearchType(value)}
                style={{width: '150px'}}
            >
                <Select.Option value="productName">By name</Select.Option>
                <Select.Option value="productDesc">
                    By description
                </Select.Option>
            </Select>
            <Input
                type="text"
                placeholder="keywords"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                style={{
                    width: '150px',
                    margin: '0 15px',
                }}
            />
            <Button type="primary" onClick={() => getColumnData(1)}>
                Search
            </Button>
        </div>
    );

    const extra = (
        <Button
            type="primary"
            onClick={() => {
                history.push('/product/add');
            }}
        >
            <PlusOutlined/>
            Add Product
        </Button>
    );

    return (
        <Card title={title} extra={extra}>
            <Table
                style={{height: '100%'}}
                bordered
                columns={columns}
                loading={loading}
                pagination={{
                    current: pageNum,
                    defaultPageSize: PAGE_SIZE,
                    onChange: (pageNum) => {
                        setPageNum(pageNum);
                        getColumnData(pageNum);
                    },
                    total,
                }}
                scroll={{y: 800}}
                key="_id"
                dataSource={products}
            />
        </Card>
    );
}
