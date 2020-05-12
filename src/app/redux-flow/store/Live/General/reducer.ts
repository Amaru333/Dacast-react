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
}

export const reducerList: Reducer<SearchResult| false> = (state = initialLiveList, action: Action) => {
    switch (action.type) {  
        case ActionTypes.GET_LIVE_LIST:
            let liveList = action.payload.data.results.map((live: LiveItem) => {return {...live, objectID: live.objectID.substring(8)}})
            return {...action.payload.data, results: liveList}
        case ActionTypes.DELETE_LIVE_CHANNEL:
            if(state) {
                var newList = state.results.filter(elem => elem.objectID !== action.payload)
                return {...state, results: newList}
            }
        default:
            return state;
    }
};

export { reducer as LiveGeneralReducer }