import { Reducer } from "redux"
import { Action } from "./actions"
import { AccountAnalyticsPaywallState, ActionTypes, defaultStateAccountAnalyticsPaywall } from './types'

const reducer: Reducer<AccountAnalyticsPaywallState> = (state = defaultStateAccountAnalyticsPaywall, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCOUNT_ANALYTICS_PAYWALL:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}

export { reducer as AnalyticsPaywallReducer }

