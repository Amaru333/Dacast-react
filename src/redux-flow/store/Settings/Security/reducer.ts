import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, SettingsSecurityDetails, defaultStateSettingsSecurity } from "./types";

const reducer: Reducer<SettingsSecurityDetails> = (state = defaultStateSettingsSecurity, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_SECURITY_OPTIONS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_GEO_RESTRICTION_GROUP:
            let savedGeoRestriction = state.geoRestriction.filter(item => item.name !== action.payload.name)
            savedGeoRestriction.push(action.payload)
            return {
                ...state,
                geoRestriction: savedGeoRestriction,
            }
        case ActionTypes.DELETE_GEO_RESTRICTION_GROUP:
            let deletedGeoRestriction = state.geoRestriction.filter(item => item.name !== action.payload.name)
            return {
                ...state,
                geoRestriction: deletedGeoRestriction,
            }
        case ActionTypes.SAVE_DOMAIN_CONTROL_GROUP:
            let savedDomainControl = state.domainControl.filter(item => item.name !== action.payload.name)
            savedDomainControl.push(action.payload)
            return {
                ...state,
                domainControl: savedDomainControl,
            }
        case ActionTypes.DELETE_DOMAIN_CONTROL_GROUP:
            let deletedDomainControl = state.domainControl.filter(item => item.name !== action.payload.name)
            return {
                ...state,
                domainControl: deletedDomainControl,
            }
        default:
            return state;
    }
};

// Named export
export { reducer as SettingsSecurityReducer };

