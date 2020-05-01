import { Reducer } from "redux";
import { LiveDetails, initialLiveGeneralState, ActionTypes, LiveItem, initialLiveList, SearchResult } from './types';
import { Action } from './actions';


const reducer: Reducer<LiveDetails> = (state = initialLiveGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_LIVE_DETAILS:
            return {
                ...state, ...action.payload.data
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
        case ActionTypes.DELETE_LIVE_THUMBNAIL:
            return {
                ...state, thumbnail: ""
            };
        case ActionTypes.CHANGE_LIVE_SPLASHSCREEN:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_LIVE_SPLASHSCREEN:
            return {
                ...state, splashscreen: ""
            };
        case ActionTypes.CHANGE_LIVE_POSTER:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_LIVE_POSTER:
            return {
                ...state, poster: ""
            };
        default:
            return state;
    }
}

export const reducerList: Reducer<SearchResult| false> = (state = initialLiveList, action: Action) => {
    switch (action.type) {  
        case ActionTypes.GET_LIVE_LIST:
            let liveList = action.payload.data.results.map((live: LiveItem) => {return {...live, objectID: live.objectID.substring(8)}})
            return {...action.payload.data, results: liveList}
        case ActionTypes.DELETE_LIVE_CHANNEL:
            if(state) {
                var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
                return {...state, results: newList}
            }
        default:
            return state;
    }
};

export { reducer as LiveGeneralReducer }