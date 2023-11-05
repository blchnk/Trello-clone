import React, { useEffect, useMemo, useState } from 'react';
import ChecklistSubItem from './ChecklistSubItem/ChecklistSubItem';
import style from './Checklist.module.scss';
import PropTypes from 'prop-types';
import ChecklistName from "./ChecklistName/ChecklistName";
import { useDispatch } from "react-redux";
import { ReactComponent as ChecklistIcon } from "../../../../../../../assets/checklist.svg";
import {
    editChecklistName,
    addChecklistSubItem,
    deleteChecklist,
} from "../../../../../../../actions/boardActions";
import ProgressBar from '../../../../../../../components/ProgressBar/ProgressBar';

export default function Checklist(
    {
        taskChecklist,
        boardId, columnId, taskId
    }) {

    const dispatch = useDispatch();

    const [subItemAutoFocus, setSubItemAutoFocus] = useState(false);

    const [checklistName, setChecklistName] = useState(taskChecklist.checklistTitle);
    const [progress, setProgress] = useState(0);

    const [completedSubItems, setCompletedSubItems] = useState(0);
    const [checklistLength, setChecklistLength] = useState(taskChecklist.checklistSubItems.length);

    const updateProgress = () => {
        if (checklistLength !== 0) {
            setProgress(Math.round((completedSubItems / checklistLength) * 100))
        } else {
            setProgress(0);
        }
    };

    useEffect(() => {
        setChecklistLength(taskChecklist.checklistSubItems.length);
    }, [taskChecklist.checklistSubItems]);

    useMemo(() => {
        updateProgress();
    }, [completedSubItems, checklistLength]);

    const addChecklistSubItemHandler = (item) => {
        setSubItemAutoFocus(true);

        dispatch(addChecklistSubItem(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: item.checklistId,
                name: item.name,
                checked: item.checked,
            }
        ))
    }

    const editChecklistNameHandler = (e) => {
        e.preventDefault();
        dispatch(editChecklistName(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: taskChecklist.checklistId,
                checklistTitle: checklistName,
            }
        ));
    };

    const deleteChecklistHandler = () => {
        dispatch(deleteChecklist(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: taskId,
                checklistId: taskChecklist.checklistId,
            }
        ));
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: 'column' }}>
                <div className={style.checklistHeader}>
                    <div className={style.checklistNameBody}>
                        <ChecklistIcon />
                        <ChecklistName
                            name={checklistName}
                            setChecklistName={setChecklistName}
                            editChecklistNameHandler={editChecklistNameHandler}
                        />
                    </div>
                    <button className={style.deleteChecklistBtn}
                        onClick={deleteChecklistHandler}>
                        Delete
                    </button>
                </div>
                <div className={style.progressBarBody}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ width: '35px', fontSize: '14px'}}>{progress}%</span>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            </div>

            {
                taskChecklist?.checklistSubItems.map(item => {
                    const completedSubItems = taskChecklist.checklistSubItems.filter(item => item.checked === true);
                    const numberOfCheckedItems = completedSubItems.length;

                    return (
                        <ChecklistSubItem
                            key={item.subItemId}
                            subItem={item}
                            setCompletedSubItems={setCompletedSubItems}
                            checklistLength={checklistLength}
                            numberOfCheckedItems={numberOfCheckedItems}
                            boardId={boardId} columnId={columnId} taskId={taskId} checklistId={taskChecklist.checklistId}
                            subItemAutoFocus={subItemAutoFocus}
                        />
                    )
                })
            }

            <button
                className={style.addItemBtn}
                onClick={() => addChecklistSubItemHandler({
                    name: '',
                    checked: false,
                    checklistId: taskChecklist.checklistId
                })}>
                Add an item
            </button>
        </>
    )
}

Checklist.propTypes = {
    taskChecklist: PropTypes.object.isRequired,
    boardId: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
}
