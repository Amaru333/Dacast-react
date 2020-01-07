import { Reducer } from "redux";
import { Action } from "./actions";
import { VodSecuritySettings, defaultStateVodSecuritySettings, ActionTypes } from "./types";

const reducer: Reducer<VodSecuritySettings> = (state = defaultStateVodSecuritySettings, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_VOD_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export { reducer as VodSecurityReducer }