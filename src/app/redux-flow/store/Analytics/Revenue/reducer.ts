import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRevenueInitialState, AnalyticsRevenueState } from "./types";

const reducer: Reducer<AnalyticsRevenueState> = (state = AnalyticsRevenueInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REVENUE_SALES_BY_TIME :
            return {
                data: { ...state.data, salesByTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_REVENUE_REVENUE_BY_TIME :
            return {
                data: { ...state.data, revenueByTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY :
            return {
                data: { ...state.data, salesPerCountry:  action.payload}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRevenueReducer };

