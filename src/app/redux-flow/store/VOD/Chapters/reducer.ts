import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, ChapterMarkerInfos, defaultStateChapter, ChapterMarkerInfosState } from './types'

const reducer: Reducer<ChapterMarkerInfosState> = (state = defaultStateChapter, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_CHAPTER_MARKERS:
            return {
                ...state,
                [action.payload.id] : {
                    chapterMarkers: action.payload.data.chapterMarkers && action.payload.data.chapterMarkers.length > 0 ? action.payload.data.chapterMarkers.map((chapter, i) => {return {...chapter, id: chapter.text + i.toString()}}) 
                        : []
                }
            }
        case ActionTypes.SAVE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                [action.payload.id] : {
                    ...state[action.payload.id],
                    chapterMarkers: action.payload.data
                }
            }
        case ActionTypes.ADD_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                [action.payload.id] : {
                    ...state[action.payload.id],
                    chapterMarkers: action.payload.data
                }
            }
        case ActionTypes.DELETE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                [action.payload.id] : {
                    ...state[action.payload.id],
                    chapterMarkers: action.payload.data
                }
            }
        default:
            return state;
    }
}

export { reducer as ChaptersReducer }

