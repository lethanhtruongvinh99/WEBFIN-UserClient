import { createStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducers/user-reducer';
import HeaderReducer from './../reducers/header-reducer';

const store = createStore(combineReducers({
    user: userReducer,
    header: HeaderReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;