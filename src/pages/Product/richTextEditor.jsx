import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        // used for updating
        if (this.props.detail) {
            const contentBlock = htmlToDraft(this.props.detail);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({editorState});
    };

    // used for pass data to parent component
    componentDidMount() {
        this.props.bindDtails(this.getDetail);
    }

    // get input text to raw html format
    getDetail = () => {
        const {editorState} = this.state;
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    };

    render() {
        const {editorState} = this.state;
        return (
            <>
                <Editor
                    editorState={editorState}
                    editorStyle={{
                        border: '1px black solid',
                        minHeight: '200px',
                        paddingLeft: '20px',
                    }}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </>
        );
    }
}

export default RichTextEditor;
