import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { Ad, contentEngagementDefaultState, ContentEngagementSettingsState } from '../../Settings/Interactions/types';

const reducer: Reducer<ContentEngagementSettingsState> = (state = contentEngagementDefaultState, action: Action) => {
    let ads: Ad[] = []
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_ENGAGEMENT_SETTINGS:
            return {
                ...state, 
                [action.payload.contentId]: {
                    ...action.payload,
                    engagementSettings: {
                        ...action.payload.engagementSettings,
                        ads: action.payload.engagementSettings.ads ?action.payload.engagementSettings.ads.map((ad) => {return {...ad, id: ad.url + ad.timestamp + ad["ad-type"]}}) : [],
                        mailCatcher: []
                    }
                }
            }
        case ActionTypes.SAVE_PLAYLIST_ENGAGEMENT_SETTINGS:
            return {
                ...state,
                [action.payload.contentId]: { ...action.payload }
            }
        case ActionTypes.SAVE_PLAYLIST_AD :
            console.log(action);
            ads = state[action.payload.id].engagementSettings.ads.slice();
            return { 
                ...state,
                [action.payload.id]: { 
                    ...state[action.payload.id],
                    engagementSettings: {
                        ...state[action.payload.id].engagementSettings,
                        ads: ads.map((item) => {
                            if (item.id !== action.payload.id) {
                                return item
                            }
                            return {
                                ...item,
                                ...action.payload
                            }
                        })
                    }
                }
            }
        case ActionTypes.CREATE_PLAYLIST_AD:
            ads = state[action.payload.id].engagementSettings.ads.slice();
            ads.splice(ads.length, 0, action.payload )
            return {
                ...state,
                [action.payload.id]: { 
                    ...state[action.payload.id],
                    engagementSettings: { ...state[action.payload.id].engagementSettings, ads: ads }
                }
            }
        case ActionTypes.DELETE_PLAYLIST_AD:
            return {
                ...state, 
                [action.payload.id]: { 
                    ...state[action.payload.id],
                    engagementSettings: { 
                        ...state[action.payload.id].engagementSettings, 
                        ads: state[action.payload.id].engagementSettings.ads.filter((item) => item.id !== action.payload.id) 
                    } 
                }
            }
        default:
            return state;
    }
};

export { reducer as PlaylistEngagementReducer }