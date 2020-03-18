import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRevenueInitialState, AnalyticsRevenueState } from "./types";

const reducer: Reducer<AnalyticsRevenueState> = (state = AnalyticsRevenueInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REVENUE_DETAILS :
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRevenueReducer };

