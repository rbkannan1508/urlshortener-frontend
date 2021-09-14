import * as actions from "./actionTypes";
import {saveState } from '../localStorage/localStorage';

const initialState = {
    userInfo: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {}
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case actions.USER_ADDED: 
            saveState(action.payload);
            return {
                userInfo: { ...action.payload }
            };
        default:
            return state;
    }
}