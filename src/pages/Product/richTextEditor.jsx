import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ContentState, EditorState, convertToRaw } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useState } from 'react';

export default function RichTextEditor({ detail, bindDetails }) {
    const [editorState, setEditorState] = useState(() => {
        if (detail) {
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks,
            );
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        bindDetails(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    return (
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
            onEditorStateChange={onEditorStateChange}
        />
    );
}
