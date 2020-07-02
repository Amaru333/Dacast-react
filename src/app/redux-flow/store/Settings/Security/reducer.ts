import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, SecuritySettings, defaultStateSettingsSecurity, GeoRestriction, DomainControl, defaultGeoRestriction, defaultDomainControl } from "./types";

const reducer: Reducer<SecuritySettings> = (state = defaultStateSettingsSecurity, action: Action) => {
    let geoRestrictionsList: GeoRestriction[] = []
    let domainControlsList: DomainControl[] = []
    switch (action.type) {
        case ActionTypes.GET_SETTINGS_SECURITY_OPTIONS :
            geoRestrictionsList.push(defaultGeoRestriction)
            if(action.payload.data.geoRestriction) {
                geoRestrictionsList.push(...action.payload.data.geoRestriction)
                if(geoRestrictionsList.filter(g => g.isDefault).length > 1) {
                    geoRestrictionsList[0].isDefault = false
                }
            }
            domainControlsList.push(defaultDomainControl)
            if(action.payload.data.geoRestriction) {
                domainControlsList.push(...action.payload.data.domainControl)
                if(domainControlsList.filter(g => g.isDefault).length > 1) {
                    domainControlsList[0].isDefault = false
                }
            }
            return {
                ...state,
                ...action.payload.data,
                passwordProtection: {
                    password: action.payload.data.passwordProtection.password ? action.payload.data.passwordProtection.password : ""
                },
                geoRestriction: geoRestrictionsList,
                domainControl: domainControlsList
            }
        case ActionTypes.SAVE_SETTINGS_SECURITY_OPTIONS:
            return {
                ...state,
                ...action.payload,
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
                        isDefault: (!action.payload.isDefault && state.geoRestriction.filter(f => f.id === action.payload.id)[0].isDefault && geoRestriction.id === '-1') ? true : false
                    }
                }
            })
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
                        isDefault: (!action.payload.isDefault && state.domainControl.filter(f => f.id === action.payload.id)[0].isDefault && domainControl.id === '-1') ? true : false
                    }
                }
            })
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

