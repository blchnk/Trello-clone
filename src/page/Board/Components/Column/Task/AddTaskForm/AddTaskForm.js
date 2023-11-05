import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import style from './AddTaskForm.module.scss';
import { addTask } from '../../../../../../actions/boardActions';
import { useDispatch } from 'react-redux';

export default function AddTaskForm(props) {
    const [taskName, setTaskName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if (taskName === '') {
            e.preventDefault();
        } else {
            dispatch(addTask(
                {
                    taskName: taskName,
                    taskId: uuidv4(),
                    columnId: props.columnId,
                    boardId: props.boardId
                }
            ));
            props.setTaskAdding(false);
        }
    };

    return (
        <>
            <form
                className={style.addNewTaskForm} ref={props.forwardRef}
                onSubmit={handleSubmit}
                autoComplete="off">
                <div className={style.addTaskWrapper}>
                    <textarea
                        autoFocus={true}
                        className={style.addTaskTextArea}
                        rows={5}
                        placeholder='Enter a title for this task'
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button type='submit' className={style.addTaskButton}>Add task</button>
                    <svg onClick={() => props.setTaskAdding(false)}
                        style={{ cursor: 'pointer' }}
                        xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26">
                        <path fill={'#9fadbc'}
                            d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z" />
                    </svg>
                </div>
            </form>
        </>
    )
}

AddTaskForm.propTypes = {
    boardId: PropTypes.string,
    columnId: PropTypes.string,
    forwardRef: PropTypes.object,
    setTaskAdding: PropTypes.func,
}
