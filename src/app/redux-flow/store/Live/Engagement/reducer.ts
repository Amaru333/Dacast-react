import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { Ad, ContentEngagementSettings, contentEngagementDefaultState } from '../../Settings/Interactions/types';

const reducer: Reducer<ContentEngagementSettings> = (state = contentEngagementDefaultState, action: Action) => {
    let ads: Ad[] = []
    switch (action.type) {
        case ActionTypes.GET_LIVE_ENGAGEMENT_SETTINGS:
            return {
                ...action.payload, 
                engagementSettings: {
                    ...action.payload.engagementSettings,
                    ads: action.payload.engagementSettings.ads ?action.payload.engagementSettings.ads.map((ad) => {return {...ad, id: ad.url + ad.timestamp + ad["ad-type"]}}) : [],
                    mailCatcher: []
                }

            }        
        case ActionTypes.SAVE_LIVE_ENGAGEMENT_SETTINGS:
            return {...action.payload}
        case ActionTypes.SAVE_LIVE_AD :
            ads = state.engagementSettings.ads.slice();
            return  {...state, engagementSettings: {...state.engagementSettings, ads: ads.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}}
        case ActionTypes.CREATE_LIVE_AD:
            ads = state.engagementSettings.ads.slice();
            ads.splice(ads.length, 0, action.payload )
            return {...state,
                engagementSettings: {...state.engagementSettings, ads: ads} 
            }
        case ActionTypes.DELETE_LIVE_AD:
            return {...state, engagementSettings: {...state.engagementSettings, ads: state.engagementSettings.ads.filter((item) => item.id !== action.payload.id)}}
        default:
            return state;
    }
};

export { reducer as LiveEngagementReducer }