import {useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function RichTextEditor({detail, bindDetails}) {
    const [editorState, setEditorState] = useState(() => {
        if (detail) {
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    })

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        bindDetails(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    return (<Editor
        editorState={editorState}
        editorStyle={{
            border: '1px black solid',
            minHeight: '200px',
            paddingLeft: '20px',
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
    />);
}

export default RichTextEditor;
