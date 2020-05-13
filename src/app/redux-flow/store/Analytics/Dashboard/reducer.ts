import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD_JOB_IDS: 
            return {
                ...state,
                jobIds: action.payload.data
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE :
            return {
                ...state,
                data: { ...state.data, consumptionPerDevice:  action.payload.data}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME :
            return {
                ...state,
                data: { ...state.data, consumptionPerTime:  action.payload.data}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION :
            return {
                ...state,
                data: { ...state.data, consumptionPerLocation:  action.payload.data}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME :
            return {
                ...state,
                data: { ...state.data, playsViewersPerTime:  action.payload.data}
            }
        case ActionTypes.GET_ANALYTICS_DASHBOARD_TOP_CONTENTS :
            return {
                ...state,
                data: { ...state.data, topContents:  action.payload.data}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsDashboardReducer };

