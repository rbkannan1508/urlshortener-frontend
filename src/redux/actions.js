import * as actions from './actionTypes';

export function userAdded(description) {
    return {
        type: actions.USER_ADDED,
        payload: {
            description
        }
    }
}