import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, dashboardInitialState, DashboardState } from "./types";

const reducer: Reducer<DashboardState> = (state = dashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_DASHBOARD_DETAILS :
            return {
                ...state,
                info: { 
                    
                    ...action.payload,
                    vod: {
                        totalVideos: 0,
                        videoPlays: 0,
                        impressions: 0,
                        topVideos: [],
                        playRate: 0,
                        ...action.payload.vod
                    },
                    live: {
                        activeChannels: 0,
                        totalChannels: 0,
                        liveViewers: 0,
                        topChannels: [],
                        ...action.payload.live
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_GENERAL_DETAILS:
            return {
                ...state,
                info: {
                    ...state.info,
                    generalInfos: action.payload.generalInfos,
                    currentPlan: action.payload.currentPlan,
                    playbackProtection: action.payload.playbackProtection
                }
            }
        case ActionTypes.GET_DASHBOARD_LIVE:
            return {
                ...state,
                info: {
                    ...state.info,
                    live: {
                        activeChannels: 0,
                        totalChannels: 0,
                        liveViewers: 0,
                        topChannels: [],
                        ...action.payload
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD:
            return {
                ...state,
                info: {
                    ...state.info,
                    vod: {
                        totalVideos: 0,
                        videoPlays: 0,
                        impressions: 0,
                        topVideos: [],
                        playRate: 0,
                        ...action.payload
                    },
                }
            }
        case ActionTypes.GET_DASHBOARD_PAYWALL:
            return {
                ...state,
                info: {
                    ...state.info,
                    paywall: action.payload
                }
            }
        default: return state
    };
}

export { reducer as DashboardReducer };

