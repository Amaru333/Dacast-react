import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD_NEW:
            return {
                ...state,
                newDashboardInfo: action.payload,
                data: state.data
            }
        case ActionTypes.GET_ANALYTICS_TOP_CONTENT: 
            return {
                ...state,
                topContent: action.payload,
                data: state.data
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsDashboardReducer };