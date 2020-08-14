import { Reducer } from "redux";
import { ActionTypes, ContentEngagementState } from './types';
import { Action } from './actions';

const reducer: Reducer<ContentEngagementState> = (state: ContentEngagementState = {}, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_ENGAGEMENT_SETTINGS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        contentId: action.payload.contentId,
                        engagementSettings: {
                            ...action.payload.engagementSettings,
                            ads: action.payload.engagementSettings.ads ? action.payload.engagementSettings.ads.map((ad) => { return { ...ad, id: ad.url + ad.timestamp + ad["ad-type"] } }) : [],
                            adsEnabled: action.payload.engagementSettings.adsEnabled ? action.payload.engagementSettings.adsEnabled : false,
                            mailCatcher: []
                        }
                    }
                }
            }
        case ActionTypes.SAVE_CONTENT_ENGAGEMENT_SETTINGS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: { 
                        contentId: action.payload.contentId,
                        engagementSettings: action.payload.engagementSettings
                    }
                }
                
            }
        case ActionTypes.CREATE_CONTENT_AD:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: { 
                        ...state[action.payload.contentId],
                        contentId: action.payload.contentId,
                        engagementSettings: { 
                            ...state[action.payload.contentType][action.payload.contentId].engagementSettings, 
                            ads: action.payload.ads, adsId: action.payload.adsId 
                        }
                    }
                }
            }
        case ActionTypes.SAVE_CONTENT_AD:
        case ActionTypes.DELETE_CONTENT_AD:
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: { 
                        ...state[action.payload.contentType][action.payload.contentId],
                        engagementSettings: { 
                            ...state[action.payload.contentType][action.payload.contentId].engagementSettings, 
                            ads: action.payload.ads
                        } 
                    }
                }
            }
            case ActionTypes.GET_UPLOAD_URL:
                    return {
                        ...state,
                        [action.payload.data.contentType]: {
                            ...state[action.payload.data.contentType],
                            [action.payload.data.contentId]: {
                                ...state[action.payload.data.contentType][action.payload.data.contentId],
                                engagementSettings: {
                                    ...state[action.payload.data.contentType][action.payload.data.contentId].engagementSettings,
                                    uploadurl: action.payload.data.presignedURL
                                }
                            }  
                        }
                    }
                case ActionTypes.UPLOAD_IMAGE:
                    return state
                case ActionTypes.DELETE_IMAGE:
                    return state
        default:
            return state;
    }
};

export { reducer as ContentEngagementReducer }