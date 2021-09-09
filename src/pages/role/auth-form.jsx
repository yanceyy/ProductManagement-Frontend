import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import PropTypes from 'prop-types';
import menuList from '../../config/menu';

export default class AuthForm extends Component {
    static propTypes = {
        role: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { role: props.role };

        console.log('construction');
    }

    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    onCheck = (checkedKeys) => {
        const role = { ...this.state.role };
        role.menus = checkedKeys;
        this.setState({ role });
    };

    render() {
        const { role } = this.state;
        return (
            <>
                <Input value={role.name} disabled></Input>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    // onSelect={onSelect}
                    // onCheck={onCheck}
                    defaultCheckedKeys={role.menus}
                    treeData={menuList}
                />
            </>
        );
    }
}
