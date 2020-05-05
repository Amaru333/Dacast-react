import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRealTimeInitialState, AnalyticsRealTimeState } from "./types";

const reducer: Reducer<AnalyticsRealTimeState> = (state = AnalyticsRealTimeInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION:
            return {
                data: { ...state.data, consumptionPerLocation: action.payload }
            }
        case ActionTypes.GET_ANALYTICS_REALTIME_GB_TIME:
            return {
                data: { ...state.data, gbPerTime: action.payload }
            }
        case ActionTypes.GET_ANALYTICS_REALTIME_PLAYBACK_TIME:
            return {
                data: { ...state.data, newPlaybackSessionsPerTime: action.payload }
            }
        case ActionTypes.GET_ANALYTICS_REALTIME_VIEWERS_TIME:
            return {
                data: { ...state.data, concurentViewersPerTime: action.payload }
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRealTimeReducer };

