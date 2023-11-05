import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import style from './ChecklistSubItem.module.scss';
import useToggle from "../../../../../../../../hooks/useToggle";
import useClickOutside from "../../../../../../../../hooks/useClickOutside";
import { ReactComponent as DeleteIcon } from '../../../../../../../../assets/delete.svg';
import cx from 'classnames';
import { deleteChecklistSubItem, editChecklistSubItemName, updateStatusChecklistSubItem } from '../../../../../../../../actions/boardActions';

export default function ChecklistSubItem({
    subItem,
    setCompletedSubItems,
    checklistLength,
    numberOfCheckedItems,
    boardId, columnId, taskId, checklistId,
    subItemAutoFocus,
}) {

    const [value, setValue] = useState(subItem.name);
    const [checked, setChecked] = useState(subItem.checked);

    const [deleteIcon, showDeleteIcon] = useState(false);

    const inputRef = useRef(null);
    const [subtaskEditing, setSubtaskEditing] = useToggle(subItemAutoFocus);

    const dispatch = useDispatch();

    const deleteChecklistSubItemHandler = () => {
        dispatch(deleteChecklistSubItem(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: checklistId,
                subItemId: subItem.subItemId,
            }
        ));
    };

    const editChecklistSubItemHandler = () => {
        dispatch(editChecklistSubItemName(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: checklistId,
                subItemId: subItem.subItemId,
                name: value,
            }
        ));
    };

    const updateStatusHandler = (checked) => {
        dispatch(updateStatusChecklistSubItem(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: checklistId,
                subItemId: subItem.subItemId,
                checked: checked,
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value === '') {
            deleteChecklistSubItemHandler(subItem.subItemId);
        } else {
            setSubtaskEditing();
            editChecklistSubItemHandler();
        }
    }

    useEffect(() => {
        setCompletedSubItems(numberOfCheckedItems);
    }, [checked, checklistLength])

    useClickOutside(
        inputRef,
        () => setSubtaskEditing(),
        true,
        handleSubmit,
        subtaskEditing,
    );

    return (
        <>
            <div className={style.checkboxItemBody}>
                <input
                    name='checked'
                    type='checkbox'
                    className={style.customCheckbox}
                    checked={checked}
                    onChange={e => {
                        setChecked(e.target.checked);
                        updateStatusHandler(!checked);
                    }
                    }
                />
                <label htmlFor='checked' className={style.label}></label>

                {
                    subtaskEditing ?
                        <div
                            className={style.checkboxItemNameBody}
                            ref={inputRef}
                            onMouseEnter={() => showDeleteIcon(true)}
                            onMouseLeave={() => showDeleteIcon(false)}>
                            <form
                                onSubmit={e => handleSubmit(e)}
                                style={{ width: '100%', height: '100%' }}>
                                <input
                                    type="text"
                                    autoFocus={true}
                                    value={value}
                                    style={{ width: '100%' }}
                                    onChange={e => {
                                        setValue(e.target.value);
                                    }}
                                />
                            </form>
                        </div>
                        :
                        <div
                            className={style.checkboxItemNameBody}
                            onClick={setSubtaskEditing}
                            onMouseEnter={() => showDeleteIcon(true)}
                            onMouseLeave={() => showDeleteIcon(false)}>
                            <input
                                value={value}
                                onChange={() => { }}
                                className={cx(style.subItem, checked && style.lineThrow)}
                                style={{ cursor: 'pointer' }}>
                            </input>
                            {
                                deleteIcon &&
                                <div
                                    className={style.deleteIconBg}
                                    onClick={e => {
                                        deleteChecklistSubItemHandler();
                                        e.stopPropagation();
                                    }}>
                                    <DeleteIcon />
                                </div>
                            }
                        </div>
                }
            </div>
        </>
    )
}

ChecklistSubItem.propTypes = {
    subItem: PropTypes.object.isRequired,
    setCompletedSubItems: PropTypes.func.isRequired,
    checklistLength: PropTypes.number.isRequired,
    numberOfCheckedItems: PropTypes.number.isRequired,
}
