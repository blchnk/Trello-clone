import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from "react-beautiful-dnd";
import useToggle from '../../../../../hooks/useToggle';
import UseClickOutside from '../../../../../hooks/useClickOutside';
import style from './Task.module.scss';
import cx from 'classnames';
import TaskOptionsForm from './TaskOptionsForm/TaskOptionsForm';
import TaskDetailsModal from './TaskDetails/TaskDetailsModal/TaskDetailsModal';
import ChecklistBadge from '../../../../../components/ChecklistBadge/ChecklistBadge';

export default function Task({ taskItem, boardId, columnId, index }) {
    const [taskOptionsIcon, setTaskOptionsIcon] = useState(false);

    const [taskOptions, showTaskOptions] = useToggle(false);
    const [taskDetails, showTaskDetails] = useToggle(false);

    const optionsRef = useRef(null);
    const detailsRef = useRef(null);

    UseClickOutside(optionsRef, () => showTaskOptions());
    UseClickOutside(detailsRef, () => showTaskDetails());

    return (
        <>
            <div>
                <Draggable draggableId={taskItem.taskId} index={index} id={taskItem.taskId}>
                    {(provided) => (
                        <div
                            className={taskOptions ? cx(style.taskItem, style.activeTask) : style.taskItem}
                            onMouseOver={() => setTaskOptionsIcon(true)}
                            onMouseOut={() => setTaskOptionsIcon(false)}
                            onClick={showTaskDetails}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className={style.taskTitle}>
                                <span
                                    className={style.taskItemText}>
                                    {taskItem.taskName}
                                </span>
                                {
                                    taskOptionsIcon &&
                                    <svg
                                        className={taskOptions ? style.iconHidden : style.taskEditIcon}
                                        onClick={e => {
                                            showTaskOptions(true);
                                            e.stopPropagation();
                                        }}
                                        xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"
                                        fill='white'>
                                        <path
                                            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                    </svg>
                                }
                            </div>
                            <ChecklistBadge
                                task={taskItem}
                            />
                        </div>
                    )}
                </Draggable>

                {
                    taskOptions &&
                    <TaskOptionsForm
                        forwardRef={optionsRef}
                        boardId={boardId}
                        columnId={columnId}
                        taskId={taskItem.taskId}
                        showTaskDetails={showTaskDetails}
                        showTaskOptions={showTaskOptions}
                    />
                }

                {
                    taskDetails &&
                    <TaskDetailsModal
                        forwardRef={detailsRef}
                        boardId={boardId}
                        columnId={columnId}
                        task={taskItem}
                    />
                }
            </div>
        </>
    )
}

Task.propTypes = {
    boardId: PropTypes.string,
    columnId: PropTypes.string,
    index: PropTypes.number,
    taskItem: PropTypes.object,
}