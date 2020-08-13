import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRealTimeInitialState, AnalyticsRealTimeState } from "./types";

const reducer: Reducer<AnalyticsRealTimeState> = (state = AnalyticsRealTimeInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REALTIME: 
            return {
                data: {
                    ...AnalyticsRealTimeInitialState.data
                },
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRealTimeReducer };

