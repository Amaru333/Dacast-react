import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, SettingsSecurityDetails, defaultStateSettingsSecurity, GeoRestriction, DomainControl } from "./types";

const reducer: Reducer<SettingsSecurityDetails> = (state = defaultStateSettingsSecurity, action: Action) => {
    let savedGeoRestriction
    let savedDomainControl
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_SECURITY_OPTIONS :
            return {
                ...state,
                ...action.payload.data,
            }
        case ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.CREATE_GEO_RESTRICTION_GROUP:
            savedGeoRestriction = state.geoRestriction.filter(item => item.name !== action.payload.name)
            if(action.payload.isDefault) {
                savedGeoRestriction = savedGeoRestriction.map((item: GeoRestriction) => {return {...item, isDefault: false}})
            }
            savedGeoRestriction.push(action.payload)
            return {
                ...state,
                geoRestriction: savedGeoRestriction,
            }
        case ActionTypes.SAVE_GEO_RESTRICTION_GROUP:
            savedGeoRestriction = state.geoRestriction.filter(item => item.name !== action.payload.name)
            if(action.payload.isDefault) {
                savedGeoRestriction = savedGeoRestriction.map((item: GeoRestriction) => {return {...item, isDefault: false}})
            }
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
        case ActionTypes.CREATE_DOMAIN_CONTROL_GROUP:
            savedDomainControl = state.domainControl.filter(item => item.name !== action.payload.name)
            if(action.payload.isDefault) {
                savedDomainControl = savedDomainControl.map((item: DomainControl) => {return {...item, isDefault: false}})
            }
            savedDomainControl.push(action.payload)
            return {
                ...state,
                domainControl: savedDomainControl,
            }
        case ActionTypes.SAVE_DOMAIN_CONTROL_GROUP:
            savedDomainControl = state.domainControl.filter(item => item.name !== action.payload.name)
            if(action.payload.isDefault) {
                savedDomainControl = savedDomainControl.map((item: DomainControl) => {return {...item, isDefault: false}})
            }
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

