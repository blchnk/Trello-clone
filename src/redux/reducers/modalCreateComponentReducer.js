import * as types from '../../constants/actionTypes'

const initialState = {
    modalCreateBoard: false,
    modalEditTask: false,
}

const modalCreateComponentReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_MODAL_CREATE_BOARD:
            return {
                modalCreateBoard: true,
            };
        case types.CLOSE_MODAL_CREATE_BOARD:
            return {
                modalCreateBoard: false,
            };
        default:
            return state;
    }
};

export default modalCreateComponentReducer;