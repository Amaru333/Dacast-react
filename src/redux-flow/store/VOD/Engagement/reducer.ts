import { Reducer } from "redux";
import { VodEngagementSettings, ActionTypes, vodEngagementDefaultState } from './types';
import { Action } from './actions';

const reducer: Reducer<VodEngagementSettings> = (state = vodEngagementDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS:
            return {...action.payload}
        default:
            return state;
    }
};

export { reducer as VodEngagementReducer }