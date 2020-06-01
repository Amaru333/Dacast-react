import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_JOB_IDS: 
            return {
                data: {...AnalyticsViewershipInitialState.data},
                jobIds: action.payload.data
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, content: {failed: true}  }}
                }
            }
            return {
                ...state,
                data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, device: {failed:true}  }}
                }
            }
            return {
                ...state,
                data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, device: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, map: {failed:true}  }}
                }
            }
            return {
                ...state,
                data: { ...state.data, concurrentPlayback:  {  ...state.data.concurrentPlayback, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, consumptionPerDomain:  {failed:true}  }
                }
            }
            return {
                ...state,
                data: { ...state.data, consumptionPerDomain:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, consumptionPerDevices:  {failed:true}  }
                }
            }
            return {
                ...state,
                data: { ...state.data, consumptionPerDevices:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, playsViewersPerTime:  {failed:true}  }
                }
            }
            return {
                ...state,
                data: { ...state.data, playsViewersPerTime:  action.payload}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, content: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, map: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, time: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, consumptionBreakdown:  {  ...state.data.consumptionBreakdown, time: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, viewingTimeBreakdown:  {  ...state.data.viewingTimeBreakdown, map: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, map: action.payload ? action.payload.map.filter(element => element.consumedMB !== undefined) : false   }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, viewingTimeBreakdown:  {  ...state.data.viewingTimeBreakdown, content: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, content: action.payload  }}
            }
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE :
            if(action.failed) {
                return {
                    ...state,
                    data: { ...state.data, viewingTimeBreakdown:  {  ...state.data.viewingTimeBreakdown, device: {failed: true}  }  }
                }
            }
            return {
                ...state,
                data: { ...state.data, viewingTimeBreakdown:   {  ...state.data.viewingTimeBreakdown, device: action.payload  }}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };

