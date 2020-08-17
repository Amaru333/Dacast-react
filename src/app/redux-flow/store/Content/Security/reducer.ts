import { ContentSecuritySettingsState, defaultStateContentSecuritySettings, GeoRestriction, DomainControl, defaultGeoRestriction, defaultDomainControl } from '../../Settings/Security/types';
import { Reducer } from 'redux';
import { ActionTypes } from './types';
import { Action } from './actions';
import { StateList } from '../../../../shared/Common/countryList';

const reducer: Reducer<ContentSecuritySettingsState> = (state = defaultStateContentSecuritySettings, action: Action) => {
    let geoRestrictionsList: GeoRestriction[] = []
    let domainControlsList: DomainControl[] = []
    switch (action.type) {
        case ActionTypes.GET_CONTENT_SECURITY_SETTINGS :
            geoRestrictionsList.push(defaultGeoRestriction)
            if(action.payload.securitySettings.geoRestriction) {
                geoRestrictionsList.push(...action.payload.securitySettings.geoRestriction)
                if(geoRestrictionsList.filter(g => g.isDefault).length > 1) {
                    geoRestrictionsList[0].isDefault = false
                }
            }
            domainControlsList.push(defaultDomainControl)
            if(action.payload.securitySettings.geoRestriction) {
                domainControlsList.push(...action.payload.securitySettings.domainControl)
                if(domainControlsList.filter(g => g.isDefault).length > 1) {
                    domainControlsList[0].isDefault = false
                }
            }
            return {
                ...state,
                [action.payload.contentType]: {
                ...state[action.payload.contentType],
                [action.payload.contentId]: {
                    ...action.payload,
                    securitySettings: {
                        ...action.payload.securitySettings,
                        passwordProtection: {
                            password: action.payload.securitySettings.passwordProtection.password ? action.payload.securitySettings.passwordProtection.password : ""
                        },
                        geoRestriction: geoRestrictionsList,
                        domainControl: domainControlsList
                    }}
                }}
            
        case ActionTypes.SAVE_CONTENT_SECURITY_SETTINGS :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],  
                [action.payload.contentId] : {
                    ...action.payload
                }}
            }
        case ActionTypes.LOCK_CONTENT:
            return state
        default:
            return state;
    }
};

export { reducer as ContentSecurityReducer }