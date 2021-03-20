import { Reducer } from "redux"
import { Action } from "./actions"
import { AccountAnalyticsDataState, ActionTypes, defaultStateAccountAnalyticsData } from './types'

const reducer: Reducer<AccountAnalyticsDataState> = (state = defaultStateAccountAnalyticsData, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ACCOUNT_ANALYTICS_DATA:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}

export { reducer as AnalyticsDataReducer }

