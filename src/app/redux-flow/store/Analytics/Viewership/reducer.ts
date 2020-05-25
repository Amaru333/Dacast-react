import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_JOB_IDS: 
            return {
                ...state,
                jobIds: action.payload.data
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT :
            return {
                data: { ...state.data, concurrentPlaybackDevice:  {  ...state.data.concurrentPlaybackDevice, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE :
            return {
                data: { ...state.data, concurrentPlaybackDevice:  {  ...state.data.concurrentPlaybackDevice, device: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP :
            return {
                data: { ...state.data, concurrentPlaybackDevice:  {  ...state.data.concurrentPlaybackDevice, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
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
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT :
            return {
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP :
            return {
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME :
            return {
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, time: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP :
            return {
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT :
            return {
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE :
            return {
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, device: action.payload  }}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };

