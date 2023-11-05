import React from 'react';
import BoardCard from './Components/BoardCard/BoardCard';
import ModalCreateWorkspace from './Modals/ModalCreateWorkspace/ModalCreateWorkspace';
import {useSelector} from 'react-redux';
import style from './Home.module.scss';

export default function Home() {
    const modalCreateWorkspace = useSelector(state => state.modalCreateComponentReducer.modalCreateBoard);
    const boards = useSelector(state => state.boardReducer.boards);

    return (
        <>
            <div className='container'>
                <h1 className={style.header}>BOARDS</h1>

                <BoardCard boards={boards}/>
                {modalCreateWorkspace && <ModalCreateWorkspace/>}
            </div>
        </>
    )
}
