import { Reducer } from "redux";
import { LiveDetails, initialLiveGeneralState, ActionTypes } from './types';
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
        case ActionTypes.CHANGE_LIVE_THUMBNAIL:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.CHANGE_LIVE_SPLASHSCREEN:
                return {
                    ...state,
                    ...action.payload
                };
        case ActionTypes.CHANGE_LIVE_POSTER:
                return {
                    ...state,
                    ...action.payload
                };
        default:
            return state;
    }
}

export { reducer as LiveGeneralReducer }