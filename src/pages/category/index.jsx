import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Modal, Table} from 'antd';
import {
    reAddCategory,
    reGetCategory,
    reUpdateCategory,
} from '../../api/action';
import {useCallback, useEffect, useRef, useState} from 'react';

import AddForm from './addForm';
import LinkButton from '../../components/link-button';
import UpdateForm from './updateForm';

export default function Category() {
    const [categoryNames, setCategoryNames] = useState([]);
    const [subCategoryNames, setSubCategoryNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [parentId, setParentId] = useState(undefined);
    const [parentName, setParentName] = useState('First level category');
    const [showStatus, setShowStatus] = useState(0);
    const [category, setCategory] = useState({});

    const form = useRef();

    /* use axios to get all the row data from server */
    const getCategoryNames = useCallback(
        (requireId) => {
            setLoading(true);
            const _parentId = requireId || parentId;
            return reGetCategory(parentId).then((result) => {
                if (!_parentId) setCategoryNames(result);
                else setSubCategoryNames(result);
                setLoading(false);
            });
        },
        [parentId],
    );

    const showSubcategories = (category) => {
        const {name, _id} = category;
        setParentName(name);
        setParentId(_id);
    };

    const showUpdate = (category) => {
        setCategory(category);
        setShowStatus(2);
    };

    /* initial get the column names */
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Operations',
            width: 300 /* set the column width */,
            render: function OperationsRowRender(_, category) {
                return (
                    <span>
                        <LinkButton onClick={() => showUpdate(category)}>
                            Change
                        </LinkButton>
                        {!parentId ? (
                            <LinkButton
                                onClick={() => showSubcategories(category)}
                            >
                                Details
                            </LinkButton>
                        ) : null}{' '}
                    </span>
                );
            },
            dataIndex: 'operations',
            key: 'operations',
        },
    ];

    // fetch data when current parentId changes
    useEffect(() => {
        getCategoryNames();
    }, [getCategoryNames]);

    const addCategory = async () => {
        form.current
            .validateFields()
            .then(async (values) => {
                setShowStatus(0);
                const parentId = values['parentId'];
                const categoryName = values['categoryName'];
                await reAddCategory(parentId, categoryName);
                getCategoryNames(parentId);
            })
            .catch(() => {
            });
    };

    const updateCategory = () => {
        form.current
            .validateFields()
            .then(async (values) => {
                setShowStatus(0); // hide the dialogue
                const cayegoryId = category._id;
                const categoryName = values['categoryName'];
                await reUpdateCategory(cayegoryId, categoryName);
                getCategoryNames();
            })
            .catch(() => {
            }); // validate the inputtings
    };

    const title =
        !parentId ? (
            <span>First level category</span>
        ) : (
            <span>
                <LinkButton
                    onClick={() => {
                        setParentId(undefined);
                        setParentName('');
                        setSubCategoryNames([]);
                    }}
                >
                    First level category
                </LinkButton>
                <ArrowRightOutlined/> {parentName}
            </span>
        );
    const extra = (
        <Button
            type="primary"
            onClick={() => {
                setShowStatus(1);
            }}
        >
            <PlusOutlined/>
            Add
        </Button>
    );

    return (
        <>
            <Modal
                title="Add"
                open={showStatus === 1}
                onOk={addCategory}
                destroyOnClose={true}
                //  may be more costing
                onCancel={() => {
                    setShowStatus(0);
                }}
            >
                <AddForm
                    categoryNames={categoryNames}
                    parentId={parentId}
                    setForm={(_form) => {
                        form.current = _form;
                    }}
                />
            </Modal>
            <Modal
                title="Change"
                open={showStatus === 2}
                onOk={updateCategory}
                onCancel={() => {
                    setShowStatus(0);
                }}
            >
                <UpdateForm
                    categoryName={category.name}
                    setForm={(_form) => {
                        form.current = _form;
                    }}
                />
            </Modal>
            <Card title={title} extra={extra}>
                <Table
                    dataSource={
                        !parentId ? categoryNames : subCategoryNames
                    }
                    columns={columns}
                    loading={loading}
                    bordered
                    pagination={{defaultPageSize: 15, showQuickJumper: true}}
                    rowKey="_id"
                />
            </Card>
        </>
    );
}
