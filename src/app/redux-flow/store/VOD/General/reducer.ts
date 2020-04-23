import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, VodDetails, VodItem, SearchResult } from './types'

const initialVodGeneralState: VodDetails = {
    id: null,
    title: null,
    description: null,
    online: null,
    thumbnail: null,
    splashscreen: null,
    subtitles: [],
    uploadurl: null
}

const initialVodList: SearchResult | false = false


const reducer: Reducer<VodDetails> = (state = initialVodGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_DETAILS:
            return {
                ...state, ...action.payload.data
            }
        case ActionTypes.EDIT_VOD_DETAILS:
            return {
                ...state, ...action.payload
            }
        case ActionTypes.ADD_VOD_SUBTITLE:
            let newArray = state.subtitles.slice()
            newArray.splice(newArray.length, 0, action.payload)
            return {
                ...state,
                subtitles: newArray
            }
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
            }
        case ActionTypes.DELETE_VOD_SUBTITLE:
            return { ...state, subtitles: state.subtitles.filter((item) => item.id != action.payload.id) }
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
            return state
    }
}

export const reducerList: Reducer<SearchResult | false> = (state = initialVodList, action: Action) => {
    switch (action.type) {
        case ActionTypes.POST_VOD:
            return state           
        case ActionTypes.GET_VOD_LIST:
            let vodList = action.payload.data.results.map((vod: VodItem) => {return {...vod, objectID: vod.objectID.substring(4)}})
            return {...action.payload.data, results: vodList}
        case ActionTypes.DELETE_VOD:
            if(state) {
                var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
                return {...state, results: newList}
            }
        default:
            return state
    }
}

export { reducer as GeneralReducer }