import { Reducer } from "redux";
import { Action } from "./actions";
import { UserInfo, defaultStateSignup, ActionTypes } from "./types";

const reducer: Reducer<UserInfo> = (state = defaultStateSignup, action: Action) => {
    switch(action.type) {
        case ActionTypes.SIGNUP : 
            return {
                ... state, ...action.payload
            }
        default :
            return {...state}
    }
}

export { reducer as SignupReducer }