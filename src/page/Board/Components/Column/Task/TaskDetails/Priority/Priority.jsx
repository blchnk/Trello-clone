import React from 'react';
import PropTypes from 'prop-types';
import style from './priority.module.scss';

export default function Priority(props) {
    let options = ['low', 'medium', 'high'];

    return (
        <>
            <span>Task priority </span>
            <select className={style.selectPriority}
                name='priority'
                id='priority-select'
                defaultValue={props.taskPriority}>
                {
                    options.map((option, index) =>
                        <option key={index} onClick={(e) => {
                            props.saveTaskPriority(e.target.value);
                        }} value={option}
                        >
                            {option}
                        </option>
                    )
                }
            </select>
        </>
    )
}

Priority.propTypes = {
    taskPriority: PropTypes.string,
    saveTaskPriority: PropTypes.func,
}
