import { Reducer } from "redux";
import { LiveDetails, initialLiveGeneralState, ActionTypes, LiveItem, initialLiveList } from './types';
import { Action } from './actions';


const reducer: Reducer<LiveDetails> = (state = initialLiveGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.SAVE_LIVE_DETAILS:
                return {
                    ...state, ...action.payload
                };    
        default:
            return state;
    }
}

export const reducerList: Reducer<LiveItem[] | false> = (state = initialLiveList, action: Action) => {
    switch (action.type) {  
        case ActionTypes.GET_LIVE_LIST:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

export { reducer as LiveGeneralReducer }