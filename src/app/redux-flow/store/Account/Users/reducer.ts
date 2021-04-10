import { Reducer } from "redux";
import { ActionTypes, MultiUserDetails, usersInitialState } from "./types";
import { UsersAction } from "./actions";

const reducer: Reducer<MultiUserDetails> = (state = usersInitialState, action: UsersAction) => {
    let users = null
    switch(action.type) {
        case ActionTypes.GET_USERS_DETAILS:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.ADD_USER:
            users = state.users.slice()
            users.splice(users.length, 0, action.payload)
            return {
                ...state,
                users: users,
                filteredUsers: state.filteredUsers.splice(state.filteredUsers.length, 0, action.payload)
            }
        case ActionTypes.EDIT_USER_ROLE:
            users = state.users.slice()
            return {
                ...state,
                users: users.map(user => {
                    if(user.userId === action.payload.userId){
                        return {
                            ...user,
                            ...action.payload
                        }
                    }
                    return user
                }),
                filteredUsers: state.filteredUsers.map(user => {
                    if(user.userId === action.payload.userId){
                        return {
                            ...user,
                            ...action.payload
                        }
                    }
                    return user
                })
            }
        case ActionTypes.DELETE_USER: 
            return {
                ...state,
                users: state.users.filter(user => user.userId !== action.payload),
                filteredUsers: state.filteredUsers.filter(user => user.userId !== action.payload),
            }
        case ActionTypes.CANCEL_USER_INVITE:
            return {
                ...state,
                users: state.users.filter(user => user.invitationId !== action.payload.invitationId),
                filteredUsers: state.filteredUsers.filter(user => user.invitationId !== action.payload.invitationId),

            }
        case ActionTypes.RESEND_USER_INVITE:
            return state
        case ActionTypes.FILTER_USERS_LIST:
            return {
                ...state,
                filteredUsers: action.payload
            }
        default: 
            return state
    }
}

export { reducer as MultiUsersReducer };