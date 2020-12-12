import { createStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducers/user-reducer';

const store = createStore(combineReducers({
    user: userReducer,
}));

export default store;