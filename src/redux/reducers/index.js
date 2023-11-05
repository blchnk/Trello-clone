import { combineReducers } from "redux";
import boardReducer from './boardReducer'
import modalCreateComponentReducer from './modalCreateComponentReducer'

const rootReducer = combineReducers({
    boardReducer: boardReducer,
    modalCreateComponentReducer 
});

export default rootReducer;