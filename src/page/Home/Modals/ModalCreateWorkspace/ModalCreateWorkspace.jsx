import React, { useState } from 'react'
import boardsImg from '../../../../assets/tablesImg.svg';
import style from './ModalCreateWorkspace.module.scss'
import { useDispatch } from 'react-redux'
import { closeModalCreateBoard } from '../../../../actions/modalCreateComponentActions'
import { addBoard } from '../../../../actions/boardActions'

export default function ModalCreateWorkspace() {
    const dispatch = useDispatch();
    const [boardName, setBoardName] = useState('');

    const closeModal = () => {
        dispatch(closeModalCreateBoard())
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(addBoard({ boardName: boardName }))
    }

    return (
        <>
            <div className={style.bg} onClick={() => closeModal()}>
                <div className={style.modalWrapper}>
                    <div className={style.modal} onClick={e => e.stopPropagation()}>
                        <header className={style.header}>
                            <h4 className={style.modalName}>
                                Create board
                            </h4>
                            <button aria-label="Закрыть всплывающее окно" className={style.closeButton} onClick={() => closeModal()}>
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="#fff"></path>
                                    </svg>
                                </span>
                            </button>
                        </header>
                        <div className={style.createBoardImg}>
                            <img src={boardsImg} alt="boardsIcon" />
                        </div>

                        <form className={style.createWorkspaceForm} autoComplete='off'
                            onSubmit={(e) => {
                                handleSubmitForm(e);
                                closeModal();
                            }}>
                            <div className={style.workspaceNameInputWrapper}>
                                <p className={style.workspaceNameInputTitle}>Board title</p>
                                <input type="text"
                                    className={style.workspaceNameInput}
                                    value={boardName}
                                    autoFocus={true}
                                    onChange={(e) => setBoardName(e.target.value)} />
                            </div>
                            <button disabled={boardName.length <= 0} type={'submit'} className={style.submitButton}>
                                Создать
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
