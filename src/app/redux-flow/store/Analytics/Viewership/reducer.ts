import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK :
            return {
                data: { ...state.data, concurrentPlaybackDevice:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN :
            return {
                data: { ...state.data, consumptionPerDomain:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE :
            return {
                data: { ...state.data, consumptionPerDevices:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME :
            return {
                data: { ...state.data, playsViewersPerTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN :
            return {
                data: { ...state.data, consumptionBreakdown:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN :
            return {
                data: { ...state.data, viewingTimeBreakdown:  action.payload}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };

