import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD: 
            if(!action.payload) {
                return state;
            }
            return {
                data: {
                    ...AnalyticsDashboardInitialState.data,
                    consumptionPerTime: {data: action.payload.data.playsAndViewersTimeSeries, time: []} 
                }
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsDashboardReducer };

