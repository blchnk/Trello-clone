import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import style from './TaskName.module.scss';

export default function TaskName(props) {
    const ref = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        if (props.taskName !== '') {
            ref.current.blur();
        }
    }

    return (
        <>
            <form className={style.taskNameForm} onSubmit={handleSubmit} >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill='white' viewBox="0 -960 960 960" >
                    <path d="M240-560h360v-120H240v120Zm-40 440q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                </svg>
                <input
                    className={style.inputTaskName} ref={ref}
                    value={props.taskName}
                    onBlur={props.taskName !== '' ? props.handleSubmit : undefined}
                    onChange={(e) => props.setTaskName(e.target.value)}
                />
            </form>
        </>
    )
}

TaskName.propTypes = {
    taskName: PropTypes.string,
    setTaskName: PropTypes.func,
    handleSubmit: PropTypes.func,
}
