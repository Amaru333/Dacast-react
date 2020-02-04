import { Reducer } from "redux";
import { VodEngagementSettings, ActionTypes, vodEngagementDefaultState } from './types';
import { Action } from './actions';
import { Ad, InteractionsInfos } from '../../Settings/Interactions/types';

const reducer: Reducer<VodEngagementSettings> = (state = vodEngagementDefaultState, action: Action) => {
    let ads: Ad[] = []
    switch (action.type) {
        case ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS:
            return {...action.payload}
        case ActionTypes.SAVE_VOD_ENGAGEMENT_SETTINGS:
            return {...action.payload}
        case ActionTypes.SAVE_VOD_AD :
                ads = state.engagementSettings.adList.slice();
                return  {...state, adList: ads.map((item) => {
                    if (item.id !== action.payload.id) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                    }
                })}
        case ActionTypes.CREATE_VOD_AD:
                ads = state.engagementSettings.adList.slice();
                ads.splice(ads.length, 0, action.payload )
                return {...state,
                    adList: ads  
                }
        case ActionTypes.DELETE_VOD_AD:
            return {...state, adList: state.engagementSettings.adList.filter((item) => item.id != action.payload.id)}
        default:
            return state;
    }
};

export { reducer as VodEngagementReducer }