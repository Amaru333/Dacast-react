import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes } from "./types";
import { defaultStateContentSecuritySettings, ContentSecuritySettingsState } from '../../Settings/Security/types';

const reducer: Reducer<ContentSecuritySettingsState> = (state = defaultStateContentSecuritySettings, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_SECURITY_SETTINGS :
            return {
                ...state,
                [action.payload.contentId] : {
                    ...action.payload
                }
            }
        case ActionTypes.SAVE_LIVE_SECURITY_SETTINGS :
            return {
                ...state,
                [action.payload.contentId] : {
                    ...action.payload
                }
            }
        default:
            return state;
    }
};

export { reducer as LiveSecurityReducer }