import React, { useState } from 'react';
import style from './ModalAddTaskChecklist.module.scss';
import PropTypes from 'prop-types';

export default function ModalAddTaskChecklist(props) {
    const [inputCheckboxName, setInputCheckboxName] = useState('');

    return (
        <>
            <form
                className={style.addChecklistForm}
                ref={props.forwardRef}
                onSubmit={e => props.addChecklistHandler(e, inputCheckboxName)}>
                <p className={style.formTitle}>Add checklist</p>
                <div className={style.titleInputBody}>
                    <p className={style.inputTitle}>Title</p>
                    <input
                        type="text"
                        autoFocus={true}
                        value={inputCheckboxName}
                        className={style.nameInput}
                        onChange={e => setInputCheckboxName(e.target.value)} />
                </div>
                <button className={style.saveBtn}>Add</button>
            </form>
        </>
    )
}

ModalAddTaskChecklist.propTypes = {
    forwardRef: PropTypes.object.isRequired,
    addChecklistHandler: PropTypes.func.isRequired,
}