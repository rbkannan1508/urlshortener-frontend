import * as actions from './actionTypes';

export function userAdded(payload) {
    return {
        type: actions.USER_ADDED,
        payload
    }
}