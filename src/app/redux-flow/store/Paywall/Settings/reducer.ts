import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PaywallSettingsInfos, paywallSettingsInitialState,  } from "./types";

const reducer: Reducer<PaywallSettingsInfos> = (state = paywallSettingsInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PAYWALL_SETTINGS_INFOS :
            return {
                ...action.payload
            }
        case ActionTypes.SAVE_PAYWALL_SETTINGS_INFOS : 
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}

export { reducer as PaywallSettingsReducer};