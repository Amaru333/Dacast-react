import { Reducer } from "redux"
import { Action } from "./actions"
import { ContentDetailsState, SubtitleInfo, ActionTypes, VodDetails } from './types'

const reducer: Reducer<ContentDetailsState> = (state = {}, action: Action) => {

    let newArray: SubtitleInfo[] = []
    let vodContent: VodDetails = null
    switch (action.type) {
        case ActionTypes.GET_CONTENT_DETAILS:            
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.id] : {
                        ...action.payload
                    }
                }
            }
        case ActionTypes.EDIT_CONTENT_DETAILS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.id] : {
                        ...state[action.payload.contentType][action.payload.id],
                        ...action.payload
                    }
                }
            }
        case ActionTypes.ADD_CONTENT_SUBTITLE:
            vodContent= state[action.payload.contentType][action.payload.contentId] as VodDetails
            newArray = vodContent.subtitles ? vodContent.subtitles.slice() : []
            newArray.splice(newArray.length, 0, action.payload.data)
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
            vodContent = state[action.payload.contentType][action.payload.contentId] as VodDetails
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        subtitles: vodContent.subtitles.filter((item) => item.targetID != action.payload.id),
                        tempSubtitleFileId: null
                    }
                }   
            }
        case ActionTypes.GET_UPLOAD_URL:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        uploadurl: action.payload.url,
                        tempSubtitleFileId: action.payload.subtitleInfo ? action.payload.subtitleInfo.targetID : null
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
        case ActionTypes.GENERATE_ENCODER_KEY:            
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        encoderKey: action.payload.encoderKey
                    }
                }
            }
        default:
            return state
    }
}

export { reducer as GeneralReducer }