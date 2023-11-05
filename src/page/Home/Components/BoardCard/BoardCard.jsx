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
            <ul className={style.cardsBody}>
                {
                    props.boards.map((item, key) =>
                        <li className={style.card} key={key}>
                            <Link className={style.link} style={{ margin: '0.5rem' }} to={`/board/${item.boardId}`}>
                                <span>{item.boardName}</span>
                            </Link>
                        </li>
                    )
                }

                <li className={cx(style.card, style.createCard)} onClick={() => handleClick()}>
                    <Link className={style.link}>
                        <span className={style.centerSpan}>Create board</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}

BoardCard.propTypes = {
    boards: PropTypes.array
}
