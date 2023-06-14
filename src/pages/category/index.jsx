import {useState, useEffect, useRef} from 'react';
import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd';

import {PlusOutlined, ArrowRightOutlined} from "@ant-design/icons";
import LinkButton from '../../components/link-button';
import {regetCategory, readdCategory, reupdateCategory} from "../../api/action";
import AddForm from './addForm';
import UpdateForm from './updateForm';

export default function Category(){
    const [categoryNames, setCategoryNames] = useState([]);
    const [subCategoryNames, setSubCategoryNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [parentId, setParentId] = useState("0");
    const [parentName, setParentName] = useState("First level category");
    const [showStatus, setShowStatus] = useState(0);
    const [category, setCategory] = useState({});

    const form = useRef();

    /* use axios to get all the rows data from server */
    const getCategoryNames = (requireId) => {
        setLoading(true)
        const _parentId = requireId||parentId;
        return regetCategory(parentId).then(result => {
            if (result.status === 0) {
                if (_parentId === "0") setCategoryNames(result.data);
                else setSubCategoryNames(result.data);
            } else {
                message.error("Failed to get category data from server")
            }
            setLoading(false);
        })
    }


    const showSubcategories = (category) => {
        const {name, _id} = category;
        setParentName(name);
        setParentId(_id);
    }


    const showUpdate = (category) => {
        setCategory(category);
        setShowStatus(2)
    }

    /* initial get the column names */
    const columns = [
            {
                title: 'Category Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Operations',
                width: 300, /* set the column width */
                render: function OperationsRowRender(_, category){
                    return (
                    <span>
                        <LinkButton onClick={
                            () => showUpdate(category)
                        }>
                            Change
                        </LinkButton>
                        {
                            parentId === "0" ? (
                                <LinkButton onClick={
                                    () => showSubcategories(category)
                                }>
                                    Details
                                </LinkButton>
                            ) : null
                        } </span>
                )},
                dataIndex: 'operations',
                key: 'operations'
            },
        ];

    // fetch data when current parentId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getCategoryNames()}, [parentId]);

    const addCategory = async () => {
        form.current.validateFields().then(async values => {
            setShowStatus(0)
            const parentId = values['parentId']
            const categoryName = values['categoryName']
            const result = await readdCategory(parentId, categoryName)
            if (result.status === 0)
                getCategoryNames(parentId)

        }).catch(() => {
        })
    }

    const updateCategory = () => {
        form.current.validateFields().then(async values => {
            setShowStatus(0) // hide the dialogue
            const cayegoryId = category._id
            const categoryName = values['categoryName']
            const result = await reupdateCategory(cayegoryId, categoryName)
            if (result.status === 0)
                getCategoryNames()

        }).catch(() => {
        }) // validate the inputtings
    }

    const title = parentId === "0" ? <span>First level category</span> : <span>
            <LinkButton onClick={
                ()=>{
                    setParentId("0");
                    setParentName("");
                    setSubCategoryNames([]);
                }
            }>First level category</LinkButton><ArrowRightOutlined/> {parentName}</span>;
    const extra = (
        <Button type='primary'
                    onClick={
                        () => {
                            setShowStatus(1)
                        }
                    }>
                <PlusOutlined/>
                Add
        </Button>
        )

    return (
            <>
                <Modal title="Add"
                       open={
                           showStatus === 1
                       }
                       onOk={
                           addCategory
                       }
                       destroyOnClose={true}
                    //  may be more costing
                       onCancel={
                           () => {
                               setShowStatus(0)
                           }
                       }>
                    <AddForm categoryNames={categoryNames}
                             parentId={parentId}
                             setForm={
                                (_form) => {
                                    form.current = _form;
                                }
                             }/>
                </Modal>
                <Modal title="Change"
                       open={
                           showStatus === 2
                       }
                       onOk={updateCategory}
                       onCancel={
                           () => {
                               setShowStatus(0);
                           }
                       }>
                    <UpdateForm categoryName={category.name}
                                setForm={
                                    (_form) => {
                                        form.current = _form;
                                    }
                                }/>
                </Modal>
                <Card title={title}
                      extra={extra}>
                    <Table dataSource={
                        parentId === "0" ? categoryNames : subCategoryNames
                    }
                           columns={columns}
                           loading={loading}
                           bordered
                           pagination={{defaultPageSize: 15, showQuickJumper: true}}
                           rowKey='_id'/>
                </Card>
            </>
        );
}
