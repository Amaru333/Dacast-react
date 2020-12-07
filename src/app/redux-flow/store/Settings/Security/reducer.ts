import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, SecuritySettings, defaultStateSettingsSecurity, GeoRestriction, DomainControl, defaultGeoRestriction, defaultDomainControl } from "./types";

const reducer: Reducer<SecuritySettings> = (state = defaultStateSettingsSecurity, action: Action) => {
    let geoRestrictionsList: GeoRestriction[] = []
    let domainControlsList: DomainControl[] = []
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_SECURITY_OPTIONS:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.CREATE_GEO_RESTRICTION_GROUP:
            geoRestrictionsList = state.geoRestriction
            if(action.payload.isDefault) {
                geoRestrictionsList = geoRestrictionsList.map((item: GeoRestriction) => {return {...item, isDefault: false}})
            }
            geoRestrictionsList.push(action.payload)
            return {
                ...state,
                geoRestriction: geoRestrictionsList,
            }
        case ActionTypes.SAVE_GEO_RESTRICTION_GROUP:
            geoRestrictionsList = state.geoRestriction.map((geoRestriction) => {
                if(geoRestriction.id === action.payload.id) {
                    return action.payload
                } else {
                    return {
                        ...geoRestriction,
                        isDefault: action.payload.isDefault ? false : geoRestriction.isDefault
                    }
                }
            })
            if(geoRestrictionsList.filter(g => g.isDefault).length < 1) {
                geoRestrictionsList[0].isDefault = true
            }
            return {
                ...state,
                geoRestriction: geoRestrictionsList,
            }
        case ActionTypes.DELETE_GEO_RESTRICTION_GROUP:
            let deletedGeoRestriction = state.geoRestriction.filter(item => item.id !== action.payload.id)
            if(deletedGeoRestriction.filter(g => g.isDefault).length === 0) {
                deletedGeoRestriction[0].isDefault = true
            }
            return {
                ...state,
                geoRestriction: deletedGeoRestriction,
            }
        case ActionTypes.CREATE_DOMAIN_CONTROL_GROUP:
            domainControlsList = state.domainControl
            if(action.payload.isDefault) {
                domainControlsList = domainControlsList.map((item: DomainControl) => {return {...item, isDefault: false}})
            }
            domainControlsList.push(action.payload)
            return {
                ...state,
                domainControl: domainControlsList,
            }
        case ActionTypes.SAVE_DOMAIN_CONTROL_GROUP:
            domainControlsList = state.domainControl.map((domainControl) => {
                if(domainControl.id === action.payload.id) {
                    return action.payload
                } else {
                    return {
                        ...domainControl,
                        isDefault: action.payload.isDefault ? false : domainControl.isDefault
                    }
                }
            })
            if(domainControlsList.filter(g => g.isDefault).length < 1) {
                domainControlsList[0].isDefault = true
            }
            return {
                ...state,
                domainControl: domainControlsList,
            }
        case ActionTypes.DELETE_DOMAIN_CONTROL_GROUP:
            let deletedDomainControl = state.domainControl.filter(item => item.id !== action.payload.id)
            if(deletedDomainControl.filter(g => g.isDefault).length === 0) {
                deletedDomainControl[0].isDefault = true
            }
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

