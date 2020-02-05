import { Reducer } from "redux";
import { Action } from "./actions";
import { LiveSecuritySettings, defaultStateLiveSecuritySettings, ActionTypes } from "./types";

const reducer: Reducer<LiveSecuritySettings> = (state = defaultStateLiveSecuritySettings, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_LIVE_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export { reducer as LiveSecurityReducer }