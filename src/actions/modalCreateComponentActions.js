import * as types from '../constants/actionTypes'

function openModalCreateBoard() {
    return {
        type: types.OPEN_MODAL_CREATE_BOARD
    }
}

function closeModalCreateBoard() {
    return {
        type: types.CLOSE_MODAL_CREATE_BOARD
    }
}

export {
    openModalCreateBoard,
    closeModalCreateBoard,
}