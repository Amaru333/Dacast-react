import { Reducer } from "redux"
import { Action } from "./actions"
import { ActionTypes, analyticsInitialState, AnalyticsState } from './types'

const reducer: Reducer<AnalyticsState> = (state = analyticsInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_REVENUE_ANALYTICS:
            return {
                ...state,
                sales: {
                    ...action.payload.data
                }
            }
        case ActionTypes.GET_DATA_ANALYTICS:
            return {
                ...state,
                data: {
                    ...action.payload.data
                }
            }
        case ActionTypes.GET_AUDIENCE_ANALYTICS:
            return {
                ...state,
                audience: {
                    ...action.payload.data
                }
            }
        default:
            return state;

    }
}

export { reducer as AnalyticsReducer }

