import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from "react-redux";
import style from './TaskOptionsForm.module.scss';
import {deleteTask} from '../../../../../../actions/boardActions';

export default function TaskOptionsForm(props) {
    const dispatch = useDispatch();

    const deleteTaskHandler = () => {
        dispatch(deleteTask(
            {
                boardId: props.boardId,
                columnId: props.columnId,
                taskId: props.taskId
            }
        ));
    };

    const showTaskDetailsHandler = () => {
        props.showTaskDetails();
        props.showTaskOptions();
    };

    return (
        <>
            <div className={style.bg}/>
            <div className={style.taskOptions} ref={props.forwardRef}>
                <ul className={style.taskOptionsList}>
                    <li className={style.taskOptionItem} onClick={showTaskDetailsHandler}>
                        Open card
                    </li>
                    <li className={style.taskOptionItem} onClick={deleteTaskHandler}>
                        Delete
                    </li>
                </ul>
                <button className={style.addTaskButton}>Save</button>
            </div>
        </>
    )
}

TaskOptionsForm.propTypes = {
    forwardRef: PropTypes.object,
    boardId: PropTypes.string,
    columnId: PropTypes.string,
    taskId: PropTypes.string,
    showTaskDetails: PropTypes.func,
    showTaskOptions: PropTypes.func
}
