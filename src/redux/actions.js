import * as actions from './actionTypes';

export function userAdded(description) {
    return {
        type: actions.USER_ADDED,
        payload: {
            description
        }
    }
}

// export function bugRemoved() {
//     return {
//         type: actions.BUG_REMOVED,
//         payload: {
//             id : 1
//         }
//     }
// }

// export function bugResolved(id) {
//     return {
//         type: actions.BUG_RESOLVED,
//         payload: {
//             id,
//             resolved: true
//         }
//     }
// }