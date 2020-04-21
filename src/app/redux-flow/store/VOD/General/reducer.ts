import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, VodDetails, VodItem, SearchResult } from './types';

const initialVodGeneralState: VodDetails = {
    metadata: null,
    thumbnail: null,
    splashscreen: null,
    subtitles: []
}

const initialVodList: SearchResult | false = false;


const reducer: Reducer<VodDetails> = (state = initialVodGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_DETAILS:
            return {
                ...state, ...action.payload.data
            };
        case ActionTypes.EDIT_VOD_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.ADD_VOD_SUBTITLE:
            let newArray = state.subtitles.slice()
            newArray.splice(newArray.length, 0, action.payload)
            return {
                ...state,
                subtitles: newArray
            };
        case ActionTypes.EDIT_VOD_SUBTITLE:
            return {
                ...state, subtitles: state.subtitles.map((item) => {
                    if (item.id !== action.payload.id) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                    }
                })
            };
        case ActionTypes.DELETE_VOD_SUBTITLE:
            return { ...state, subtitles: state.subtitles.filter((item) => item.id != action.payload.id) }
        case ActionTypes.CHANGE_VOD_THUMBNAIL:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.CHANGE_VOD_SPLASHSCREEN:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.CHANGE_VOD_POSTER:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.DELETE_VOD_POSTER:
            return {
                ...state, poster: ""
            };
        default:
            return state;
    }
};

export const reducerList: Reducer<SearchResult | false> = (state = initialVodList, action: Action) => {
    switch (action.type) {
        case ActionTypes.POST_VOD:
                return state           
        case ActionTypes.GET_VOD_LIST:
            let vodList = action.payload.data.results.map((vod) => {return {...vod, objectID: vod.objectID.substring(4)}})
            return {...action.payload.data, results: vodList}
        case ActionTypes.DELETE_VOD:
            if(state) {
                var newList = state.results.filter(elem => elem.title !== action.payload.name);
                return {...state, results: newList};
            }
        default:
            return state;
    }
};

export { reducer as GeneralReducer };