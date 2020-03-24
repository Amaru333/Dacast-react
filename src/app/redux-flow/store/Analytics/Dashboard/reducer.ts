import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE :
            return {
                data: { ...state.data, consumptionPerDevice:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME :
            return {
                data: { ...state.data, consumptionPerTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION :
            return {
                data: { ...state.data, consumptionPerLocation:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME :
            return {
                data: { ...state.data, playsViewersPerTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_TOP_CONTENTS :
            return {
                data: { ...state.data, topContents:  action.payload}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsDashboardReducer };

