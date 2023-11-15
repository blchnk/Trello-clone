import React from 'react'
import PropTypes from 'prop-types';
import style from './BoardCard.module.scss'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { openModalCreateBoard } from '../../../../actions/modalCreateComponentActions'
import { useDispatch } from 'react-redux'

export default function BoardCard(props) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(openModalCreateBoard())
    }

    return (
        <>
            <div className={style.cardsBody}>
                {
                    props.boards.map(item =>
                        <div key={item.boardId} className={style.cardWrapper}>
                            <div className={style.card}>
                                <Link
                                    className={style.link}
                                    to={`/board/${item.boardId}`}
                                >
                                    <span className={style.boardName}>{item.boardName}</span>
                                </Link>
                            </div>
                        </div>
                    )
                }

                <div className={style.cardWrapper}>
                    <div
                        className={cx(style.card, style.createCard)}
                        onClick={handleClick}>
                        <Link className={style.link}>
                            <span className={style.centerSpan}>Create board</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

BoardCard.propTypes = {
    boards: PropTypes.array
}
