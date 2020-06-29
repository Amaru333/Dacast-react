import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { Ad, contentEngagementDefaultState, ContentEngagementSettingsState } from '../../Settings/Interactions/types';

const reducer: Reducer<ContentEngagementSettingsState> = (state = contentEngagementDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS:
            return {
                ...state, 
                [action.payload.contentId]: {
                    ...action.payload,
                    engagementSettings: {
                        ...action.payload.engagementSettings,
                        ads: action.payload.engagementSettings.ads ?action.payload.engagementSettings.ads.map((ad) => {return {...ad, id: ad.url + ad.timestamp + ad["ad-type"]}}) : [],
                        adsEnabled: action.payload.engagementSettings.adsEnabled ? action.payload.engagementSettings.adsEnabled : false,
                        mailCatcher: []
                    }
                }
            }
        case ActionTypes.SAVE_VOD_ENGAGEMENT_SETTINGS:
            return {
                ...state,
                [action.payload.contentId]: { ...action.payload }
            }
            case ActionTypes.CREATE_VOD_AD:
                return {
                    ...state,
                    [action.payload.contentId]: { 
                        ...state[action.payload.contentId],
                        engagementSettings: { ...state[action.payload.contentId].engagementSettings, ads: action.payload.ads, adsId: action.payload.adsId }
                    }
                }
            case ActionTypes.SAVE_VOD_AD:
            case ActionTypes.DELETE_VOD_AD:
                return {
                    ...state, 
                    [action.payload.contentId]: { 
                        ...state[action.payload.contentId],
                        engagementSettings: { 
                            ...state[action.payload.contentId].engagementSettings, 
                            ads: action.payload.ads
                        } 
                    }
                }
            case ActionTypes.GET_UPLOAD_URL:
                return {
                    ...state,
                    uploadurl: action.payload.data.presignedURL
                }
            case ActionTypes.UPLOAD_IMAGE:
                return state
            case ActionTypes.DELETE_IMAGE:
                return state
        default:
            return state;
    }
};

export { reducer as VodEngagementReducer }