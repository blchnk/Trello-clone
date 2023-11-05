import React, {useRef} from 'react';
import style from './ChecklistName.module.scss';
import PropTypes from "prop-types";

const ChecklistName = ({name, setChecklistName, editChecklistNameHandler}) => {
    const ref = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== '') {
            ref.current.blur();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className={style.checklistTitleInput}
                       ref={ref}
                       value={name}
                       onBlur={name !== '' ? editChecklistNameHandler : undefined}
                       onChange={e => setChecklistName(e.target.value)}
                />
            </form>
        </>
    );
};

ChecklistName.propTypes = {
    name: PropTypes.string.isRequired,
    setChecklistName: PropTypes.func.isRequired,
    editChecklistNameHandler: PropTypes.func.isRequired,
}
export default ChecklistName;