import { Tree, Input } from 'antd';
import menuList from '../../config/menu';

export default function AuthForm({ role, setRole }) {
    const onCheck = (checkedKeys) => {
        setRole({ ...role, menus: checkedKeys });
    };

    return (
        <>
            <Input value={role.name} disabled></Input>
            <Tree
                checkable
                defaultExpandAll
                onCheck={onCheck}
                checkedKeys={role.menus}
                treeData={menuList}
            />
        </>
    );
}
