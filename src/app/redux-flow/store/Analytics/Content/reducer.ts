import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, AnalyticsContentState, defaultAnalyticsContentState } from './types'

const reducer: Reducer<AnalyticsContentState> = (state = defaultAnalyticsContentState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_CONTENT_LIST:
            return {
                ...state,
                contentList: action.payload
            }
        case ActionTypes.GET_ANALYTICS_CONTENT_DATA:
            return {
                ...state,
                contentData: action.payload
            }
        default:
            return state;
    }
}

export { reducer as AnalyticsContentReducer }

