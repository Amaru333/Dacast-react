import { Reducer } from "redux"
import { Action } from "./actions"
import { AccountAnalyticsEngagementState, ActionTypes, defaultStateAccountAnalyticsEngagement } from './types'

const reducer: Reducer<AccountAnalyticsEngagementState> = (state = defaultStateAccountAnalyticsEngagement, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCOUNT_ANALYTICS_ENGAGEMENT:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}

export { reducer as AnalyticsEngagementReducer }

