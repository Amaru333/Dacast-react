import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, ChapterMarkerInfos, defaultStateChapter } from './types'

const reducer: Reducer<ChapterMarkerInfos> = (state = defaultStateChapter, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_CHAPTER_MARKERS:
            return {
                ...state, chapterMarkers: action.payload.data.chapterMarkers ? action.payload.data.chapterMarkers.map((chapter, i) => {return {...chapter, id: chapter.text + i.toString()}}) : []
            }
        case ActionTypes.SAVE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                chapterMarkers: action.payload
            }
        case ActionTypes.ADD_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                chapterMarkers: action.payload
            }
        case ActionTypes.DELETE_VOD_CHAPTER_MARKER:
            return {
                ...state, 
                chapterMarkers: action.payload
            }
        default:
            return state;
    }
}

export { reducer as ChaptersReducer }

