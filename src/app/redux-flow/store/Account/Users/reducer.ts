import { Reducer } from "redux";
import { ActionTypes, Users, usersInitialState } from "./types";
import { UsersAction } from "./actions";

const reducer: Reducer<Users> = (state = usersInitialState, action: UsersAction) => {
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
                users
            }
        case ActionTypes.EDIT_USER:
            users = state.users.slice()
            return {
                ...state,
                users: users.map(user => {
                    if(user.userID === action.payload.userID){
                        return {
                            ...user,
                            ...action.payload
                        }
                    }
                    return { ...user}
                })
            }
    }
}

export { reducer as UsersReducer };