import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(),
);

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;