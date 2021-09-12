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
        default:
            return state;
    }
}