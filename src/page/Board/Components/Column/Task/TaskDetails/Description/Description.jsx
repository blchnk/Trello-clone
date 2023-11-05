import React, {useRef, useState} from 'react';
import style from './description.module.scss';
import PropTypes from 'prop-types';
import {Editor} from '@tinymce/tinymce-react';

export default function Description(props) {
    const editorRef = useRef(null);
    const [saveBtn, showSaveBtn] = useState(false);
    // const [descriptionLoaded, setDescriptionLoaded] = useState(false);

    return (
        <>
            <div className={style.description}>
                <div className={style.descriptionTitleContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={'white'} height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                    </svg>
                    <h3 className={style.descriptionTitle}>Description</h3>
                </div>

                {
                    props.editingTaskDescription ?
                        <div className={style.editorWrapper} ref={props.forwardRef}>
                            <Editor
                                apiKey='16zbd4za4n4z3uxcoj4q8m1fgi4db8tqg2n6yophm4e8rdj6'
                                onInit={(evt, editor) => {
                                    editorRef.current = editor;
                                    // setDescriptionLoaded(true);
                                }}
                                initialValue={props.taskDescription}
                                onFocus={() => showSaveBtn(true)}
                                onBlur={() => {
                                    showSaveBtn(false);
                                    props.saveTaskDescription(editorRef.current.getContent({format: "text"}));
                                }}
                                init={{
                                    height: 200,
                                    menubar: false,
                                    skin: "oxide-dark",
                                    content_css: "dark",
                                    selector: 'textarea',
                                    statusbar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:#22272b }' +
                                        `.mce-content-body { color:#fff }` +
                                        `.tox .tox-toolbar-overlord .tox-toolbar:not(.tox-toolbar--scrolling):first-child, .tox .tox-toolbar-overlord .tox-toolbar__primary { background-color:#22272b }`
                                }}
                            />
                            {
                                saveBtn &&
                                <button className={style.saveBtn}
                                        onClick={() => props.saveTaskDescription(editorRef.current.getContent({format: "text"}))}>
                                    Save
                                </button>
                            }
                        </div> :
                        <div className={style.defaultEditor}
                             onClick={props.setEditingTaskDescription}>
                            {props.taskDescription !== '' ? props.taskDescription : 'Enter a more detailed description...'}
                        </div>
                }
            </div>
        </>
    )
}

Description.propTypes = {
    taskDescription: PropTypes.string,
    saveTaskDescription: PropTypes.func,
    forwardRef: PropTypes.object,
    editingTaskDescription: PropTypes.bool,
    setEditingTaskDescription: PropTypes.func,
}
