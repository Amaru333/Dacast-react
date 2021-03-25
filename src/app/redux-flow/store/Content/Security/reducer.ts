import { ContentSecuritySettingsState, defaultStateContentSecuritySettings, GeoRestriction, DomainControl, defaultGeoRestriction, defaultDomainControl } from '../../Settings/Security/types';
import { Reducer } from 'redux';
import { ActionTypes } from './types';
import { Action } from './actions';
import { StateList } from '../../../../shared/Common/countryList';

const reducer: Reducer<ContentSecuritySettingsState> = (state = defaultStateContentSecuritySettings, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_SECURITY_SETTINGS :
            return {
                ...state,
                [action.payload.contentType]: {
                ...state[action.payload.contentType],
                [action.payload.contentId]: {
                    contentId: action.payload.contentId,
                    securitySettings: action.payload.securitySettings
                }
            }
        }
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