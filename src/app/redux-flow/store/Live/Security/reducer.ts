import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes } from "./types";
import { ContentSecuritySettings, defaultStateContentSecuritySettings } from '../../Settings/Security/types';

const reducer: Reducer<ContentSecuritySettings> = (state = defaultStateContentSecuritySettings, action: Action) => {
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