import React from 'react';
import style from './ProgressBar.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default function ProgressBar({ progress }) {
    const progressBarWidth = `${progress}%`;

    return (
        <div className={style.progressBar}>
            <div className={cx(style.progressBarCurrent, progress === 100 ? style.green : '')} style={{ width: progressBarWidth }} />
        </div>
    )
}

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
}