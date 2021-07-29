import { Reducer } from "redux"
import { Action } from "./actions"
import { AccountAnalyticsAudienceState, ActionTypes, defaultStateAccountAnalyticsAudience } from './types'

const reducer: Reducer<AccountAnalyticsAudienceState> = (state = defaultStateAccountAnalyticsAudience, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCOUNT_ANALYTICS_AUDIENCE:
            return {
                data: action.payload.data
            }
        default:
            return state;
    }
}

export { reducer as AudienceReducer }

