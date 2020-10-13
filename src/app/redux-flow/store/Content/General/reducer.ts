import { Reducer } from "redux"
import { Action } from "./actions"
import { ContentDetailsState, SubtitleInfo, ActionTypes } from './types'

const reducer: Reducer<ContentDetailsState> = (state = {}, action: Action) => {

    let newArray: SubtitleInfo[] = []

    switch (action.type) {
        case ActionTypes.GET_CONTENT_DETAILS:            
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
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
                        title: action.payload.data.title,
                        description: action.payload.data.description,
                        online: action.payload.data.online,
                        countdown: action.payload.data.countdown ?  action.payload.data.countdown : null
                    }
                }
            }
        case ActionTypes.ADD_CONTENT_SUBTITLE:
            newArray = state[action.payload.contentType][action.payload.contentId].subtitles ? state[action.payload.contentType][action.payload.contentId].subtitles.slice() : []
            if (newArray.findIndex(item => item.targetID === action.payload.data.targetID) > -1) {
                newArray[newArray.findIndex(item => item.targetID === action.payload.data.targetID)] = action.payload.data
            } else {
                newArray.splice(newArray.length, 0, action.payload.data)
            }
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        subtitles: newArray
                    }
                }   
            }
        case ActionTypes.DELETE_CONTENT_SUBTITLE:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        subtitles: state[action.payload.contentId][action.payload.contentId].subtitles.filter((item) => item.targetID != action.payload.targetID)
                    }
                }   
            }
        case ActionTypes.GET_UPLOAD_URL:
            newArray = state[action.payload.contentType][action.payload.contentId].subtitles ? state[action.payload.contentType][action.payload.contentId].subtitles.slice() : []
            newArray.splice(newArray.length, 0, action.payload.data)
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        uploadurl: action.payload.url,
                        subtitles: action.payload.data ? newArray : state[action.payload.contentType][action.payload.contentId].subtitles
                        }
                    }
                }
        case ActionTypes.UPLOAD_IMAGE:
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        uploadurl: null
                        }
                    }
                }
        case ActionTypes.UPLOAD_IMAGE_FROM_VIDEO:
            return state
        case ActionTypes.DELETE_IMAGE:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        poster: null
                    }
                }
            }
        default:
            return state
    }
}

export { reducer as GeneralReducer }