import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import style from './taskDetailsModal.module.scss';
import Description from '../Description/Description';
import TaskName from '../TaskName/TaskName';
import { addTaskDescription, addTaskPriority, editTaskName } from '../../../../../../../actions/boardActions';
import { useDispatch } from 'react-redux';
import UseClickOutside from '../../../../../../../hooks/useClickOutside';
import useToggle from '../../../../../../../hooks/useToggle';
import Priority from '../Priority/Priority';
import Checklist from '../Checklist/Checklist';
import ModalAddTaskChecklist from '../../../../../Modals/ModalAddTaskChecklist/ModalAddTaskChecklist';
import { addChecklist } from '../../../../../../../actions/boardActions';
import { v4 as uuidv4 } from 'uuid';

export default function TaskDetailsModal({ task, boardId, columnId, forwardRef }) {
    const dispatch = useDispatch();

    const taskChecklists = task?.taskChecklist;

    const [taskName, setTaskName] = useState(task.taskName);

    const [editingTaskDescription, setEditingTaskDescription] = useToggle(false);
    const [taskAddTaskChecklistModal, showTaskAddTaskChecklistModal] = useToggle(false);

    const taskDescriptionRef = useRef(null);
    const taskAddTaskChecklistModalRef = useRef(null);

    UseClickOutside(taskDescriptionRef, () => setEditingTaskDescription());
    UseClickOutside(taskAddTaskChecklistModalRef, () => showTaskAddTaskChecklistModal());

    const handleSubmit = (e) => {
        if (taskName === '') {
            e.preventDefault();
        } else {
            dispatch(editTaskName(
                {
                    boardId: boardId,
                    columnId: columnId,
                    taskId: task.taskId,
                    taskName: taskName,
                }
            ))
            e.preventDefault();
        }
    };

    const saveTaskDescription = (taskDescription) => {
        dispatch(addTaskDescription(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: task.taskId,
                taskDescription: taskDescription,
            }
        ));
    };

    const saveTaskPriority = (taskPriority) => {
        dispatch(addTaskPriority(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: task.taskId,
                taskPriority: taskPriority,
            }
        ))
    };

    const addChecklistHandler = (e, title) => {
        e.preventDefault();
        showTaskAddTaskChecklistModal();

        dispatch(addChecklist(
            {
                boardId: boardId,
                columnId: columnId,
                taskId: task.taskId,
                checklistId: uuidv4(),
                checklistTitle: title,
            }
        ))
    }

    return (
        <>
            <div className={style.bg}>
                <div className={style.taskDetailsBody} ref={forwardRef}>
                    <div className={style.windowMainCol}>
                        <div className={style.detailsFormSector}>
                            <TaskName
                                taskName={taskName}
                                setTaskName={setTaskName}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        <div className={style.detailsFormSector}>
                            <Description
                                taskDescription={task.taskDescription}
                                saveTaskDescription={saveTaskDescription}
                                forwardRef={taskDescriptionRef}
                                editingTaskDescription={editingTaskDescription}
                                setEditingTaskDescription={setEditingTaskDescription}
                            />
                        </div>
                        <div className={style.detailsFormSector}>
                            {
                                taskChecklists.map(item =>
                                    <Checklist
                                        taskChecklist={item}
                                        key={item.checklistId}
                                        boardId={boardId}
                                        columnId={columnId}
                                        taskId={task.taskId}
                                    />
                                )
                            }
                        </div>
                        <div className={style.detailsFormSector}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div>
                                    <Priority
                                        taskPriority={task.taskPriority}
                                        saveTaskPriority={saveTaskPriority} />
                                </div>

                                <div>
                                    <span style={{ fontWeight: '600' }}>Task creation date: </span>
                                    <span>{task.taskCreationDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.windowSidebar}>
                        <p className={style.windowSidebarTitle}>Add to card</p>
                        <div className={style.windowSidebarContentBody}>
                            <div className={style.sidebarContentBg}
                                onClick={showTaskAddTaskChecklistModal}>
                                <span className={style.sidubarContentItem}>
                                    Checklist
                                </span>
                            </div>
                            <div className={style.sidebarContentBg}>
                                <span className={style.sidubarContentItem}>Attachment</span>
                            </div>
                            <div className={style.sidebarContentBg}>
                                <span className={style.sidubarContentItem}>Labels</span>
                            </div>
                        </div>
                        {
                            taskAddTaskChecklistModal &&
                            <ModalAddTaskChecklist
                                forwardRef={taskAddTaskChecklistModalRef}
                                addChecklistHandler={addChecklistHandler}
                            />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

TaskDetailsModal.propTypes = {
    forwardRef: PropTypes.object.isRequired,
    boardId: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
}
