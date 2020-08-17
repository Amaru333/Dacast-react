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
                            adsSettings: {
                                ...action.payload.engagementSettings.adsSettings,
                                ads: action.payload.engagementSettings.adsSettings.ads.map((ad) => { return { ...ad, id: ad.url + ad.timestamp + ad["ad-type"] } }) || [],
                            },
                            mailCatcher: null
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
                        engagementSettings: {
                            ...state[action.payload.contentType][action.payload.contentId].engagementSettings,
                            ...action.payload.engagementSettings
                        }
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
                            adsSettings: {
                                ...state[action.payload.contentType][action.payload.contentId].engagementSettings.adsSettings, 
                                ads: action.payload.ads
                            }
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
                            adsSettings: {
                                ...state[action.payload.contentType][action.payload.contentId].engagementSettings.adsSettings, 
                                ads: action.payload.ads

                            }
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
                case ActionTypes.DELETE_IMAGE:
                case ActionTypes.LOCK_SECTION:
                    return state
        default:
            return state;
    }
};

export { reducer as ContentEngagementReducer }