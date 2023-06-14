import { useState, useEffect } from 'react';
import { Card, Select, Input, Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import LinkButton from '../../components/link-button';
import { reGetList, reSearchProducts, reUpdateStatus } from '../../api/action';
import { PAGE_SIZE } from '../../utils/constants';

export default function ProductHome() {
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [searchName, setSearchName] = useState(''); // keywords for search
    const [searchType, setSearchType] = useState('productName');
    const [products, setProducts] = useState([
        {
            name: '',
            description: '',
            price: 50,
            status: 0,
        },
    ]);
    const [pageNum, setPageNum] = useState(1);
    const history = useHistory();

    const getColumnData = (pageNum = 1) => {
        // get the data from server
        setLoading(true);
        if (searchName) {
            reSearchProducts(pageNum, PAGE_SIZE, searchName, searchType).then(
                (result) => {
                    if (result.status === 0) {
                        const { list, total } = result.data;
                        setProducts(list);
                        setTotal(total);
                    }
                },
            );
        } else {
            reGetList(pageNum, PAGE_SIZE).then((result) => {
                if (result.status === 0) {
                    const { list, total } = result.data;
                    setProducts(list);
                    setTotal(total);
                }
            });
        }
        setLoading(false);
    };

    const updateStatus = async (id, status) => {
        const result = await reUpdateStatus(id, status);
        if (result.status === 0) {
            message.success('Update successfully');
        } else {
            message.error('Update failed');
        }
        getColumnData(pageNum);
    };

    const columns = [
        {
            width: 150,
            title: 'Name',
            dataIndex: 'name',
        },
        {
            width: '60%',
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
                const { status, _id } = product;
                const newStatus = status ? 0 : 1;
                return (
                    <span>
                        <Button
                            type="primary"
                            style={{
                                width: '100px',
                                margin: '0 auto 5px',
                            }}
                            onClick={() => updateStatus(_id, newStatus)}
                        >
                            {status === 1 ? 'Unlisted' : 'Relisted'}
                        </Button>
                        <div style={{ textAlign: 'center' }}>
                            {status === 1 ? 'Listed' : 'Unlisted'}
                        </div>
                    </span>
                );
            },
        },
        {
            title: 'Operations',
            render: function EditAction(product) {
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
                                history.push('/product/info', { product })
                            }
                        >
                            Details
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
                style={{ width: '150px' }}
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
            <PlusOutlined />
            Add Product
        </Button>
    );

    return (
        <Card title={title} extra={extra}>
            <Table
                style={{ height: '100%' }}
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
                scroll={{ y: 800 }}
                key="_id"
                dataSource={products}
            />
        </Card>
    );
}
