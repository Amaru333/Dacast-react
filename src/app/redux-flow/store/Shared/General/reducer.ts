import { Reducer } from "redux"
import { Action } from "./actions"
import { ContentDetails, ContentItem, SearchResult, ContentDetailsState, SubtitleInfo, ActionTypes } from './types'

const initialContentList: SearchResult | false = false

const reducer: Reducer<ContentDetailsState> = (state = {}, action: Action) => {

    let newArray: SubtitleInfo[] = []

    switch (action.type) {
        case ActionTypes.GET_CONTENT_DETAILS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.data.id] : {
                        ...state[action.payload.contentType][action.payload.data.id],
                        ...action.payload.data
                    }
                }
            }
        case ActionTypes.EDIT_CONTENT_DETAILS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.data.id] : {
                        ...state[action.payload.contentType][action.payload.data.id],
                        ...action.payload.data
                    }
                }
            }
        case ActionTypes.ADD_CONTENT_SUBTITLE:
            newArray = state[action.payload.contentId].subtitles ? state[action.payload.contentId].subtitles.slice() : []
            if (newArray.findIndex(item => item.targetID === action.payload.data.targetID) > -1) {
                newArray[newArray.findIndex(item => item.targetID === action.payload.data.targetID)] = action.payload.data
            } else {
                newArray.splice(newArray.length, 0, action.payload.data)
            }
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    subtitles: newArray
                }
            }
        case ActionTypes.DELETE_CONTENT_SUBTITLE:
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    subtitles: state[action.payload.contentId].subtitles.filter((item) => item.targetID != action.payload.targetID)
                }
            }
        case ActionTypes.GET_UPLOAD_URL:
            newArray = state[action.payload.contentType][action.payload.contentId].subtitles ? state[action.payload.contentType][action.payload.contentId].subtitles.slice() : []
            newArray.splice(newArray.length, 0, action.payload.data)
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.data.id] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                    uploadurl: action.payload.url,
                    subtitles: action.payload.data ? newArray : state[action.payload.contentType][action.payload.contentId].subtitles
                }
            }}
        case ActionTypes.UPLOAD_IMAGE:
            return {
                ...state, 
                [action.payload.contentId] : {
                    ...state[action.payload.contentId],
                    uploadurl: null,
                }
            }
        case ActionTypes.UPLOAD_IMAGE_FROM_VIDEO:
            return state
        case ActionTypes.DELETE_IMAGE:
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    poster: {}
                }
            }
        default:
            return state
    }
}

export const reducerList: Reducer<SearchResult | false> = (state = initialContentList, action: Action) => {
    switch (action.type) {
        case ActionTypes.POST_CONTENT:
            return state
        case ActionTypes.GET_CONTENT_LIST:
            let contentList = action.payload.data.results.map((content: ContentItem) => { return { ...content, objectID: content.objectID.substring(4) } })
            return { ...action.payload.data, results: contentList }
        case ActionTypes.DELETE_CONTENT:
            // if (state) {
            //     var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
            //     return { ...state, results: newList, totalResults: state.totalResults - 1 }
            // }
            return state
        default:
            return state
    }
}

export { reducer as GeneralReducer }