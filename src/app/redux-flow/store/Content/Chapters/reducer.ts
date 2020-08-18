import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, ChapterMarkerInfos, defaultStateChapter, ChapterMarkerInfosState } from './types'

const reducer: Reducer<ChapterMarkerInfosState> = (state = defaultStateChapter, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_CHAPTER_MARKERS:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        chapterMarkers: action.payload.data.chapterMarkers && action.payload.data.chapterMarkers.length > 0 ? action.payload.data.chapterMarkers.map((chapter, i) => {return {...chapter, id: chapter.text + i.toString()}}) 
                            : []
                    }
                }

            }
        case ActionTypes.SAVE_CONTENT_CHAPTER_MARKER:
        case ActionTypes.ADD_CONTENT_CHAPTER_MARKER:
        case ActionTypes.DELETE_CONTENT_CHAPTER_MARKER:
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        chapterMarkers: action.payload.data
                    }
                }

            }
        default:
            return state;
    }
}

export { reducer as ChaptersReducer }

