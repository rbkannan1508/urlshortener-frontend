import * as actions from "./actionTypes";

export default function reducer(state = [], action) {
    switch(action.type) {
        case actions.USER_ADDED: 
            return [
                ...state,
                {
                    userId: action.payload.description.userId,
                    username: action.payload.description.username,
                    accountId: action.payload.description.accountId,
                    email: action.payload.description.email,
                    isLoggedIn: true
                }
            ]
        // case actions.BUG_REMOVED:
        //     return state.filter(bug => bug.id !== action.payload.id);
        // case actions.BUG_RESOLVED:
        //     return state.map(bug => bug.id === action.payload.id ? {...bug, resolved : true} : bug);
        default:
            return state;
    }
}