import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, ContentAnalyticsState, defaultStateContentAnalytics } from './types'

const reducer: Reducer<ContentAnalyticsState> = (state = defaultStateContentAnalytics, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_ANALYTICS:
            console.log(state);
            return {
                ...state,
                [action.payload.contentType]: {
                    ...(state[action.payload.contentType]),
                    [action.payload.contentId] : {
                        ...(state[action.payload.contentType] ? state[action.payload.contentType][action.payload.contentId] : []),
                        ...action.payload.data
                    }
                }
            }
        default:
            return state;
    }
}

export { reducer as ContentAnalyticsReducer }

