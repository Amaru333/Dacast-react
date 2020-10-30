import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, ContentAnalyticsState, defaultStateContentAnalytics } from './types'

const reducer: Reducer<ContentAnalyticsState> = (state = defaultStateContentAnalytics, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_ANALYTICS:
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
        default:
            return state;
    }
}

export { reducer as ContentAnalyticsReducer }

