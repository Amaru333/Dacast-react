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
                    vod: action.payload.vod,
                    live: action.payload.live
                }
            }
        case ActionTypes.GET_DASHBOARD_GENERAL_DETAILS:
            return {
                info: {
                    ...state.info,
                    generalInfos: action.payload.generalInfos,
                    currentPlan: action.payload.currentPlan,
                    playbackProtection: action.payload.playbackProtection,
                    vod: state.info ? state.info.vod : null,
                    paywall: state.info ? state.info.paywall : null,
                    live: state.info ? state.info.live : null
                }
            }
        case ActionTypes.GET_DASHBOARD_LIVE:
            return {
                ...state,
                info: {
                    ...state.info,
                    generalInfos: state.info ? state.info.generalInfos : null,
                    currentPlan: state.info ? state.info.currentPlan : null,
                    playbackProtection: state.info ? state.info.playbackProtection : null,
                    vod: state.info ? state.info.vod : null,
                    live: {
                        ...state.info.live,
                        ...action.payload
                    },
                    paywall: state.info ? state.info.paywall : null,
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD:
            return {
                ...state,
                info: {
                    ...state.info,
                    generalInfos: state.info ? state.info.generalInfos : null,
                    currentPlan: state.info ? state.info.currentPlan : null,
                    playbackProtection: state.info ? state.info.playbackProtection : null,
                    vod: {
                        ...state.info.vod,
                        ...action.payload
                    },
                    paywall: state.info ? state.info.paywall : null,
                    live: state.info ? state.info.live : null
                }
            }
        case ActionTypes.GET_DASHBOARD_PAYWALL:
            return {
                ...state,
                info: {
                    ...state.info,
                    generalInfos: state.info ? state.info.generalInfos : null,
                    currentPlan: state.info ? state.info.currentPlan : null,
                    playbackProtection: state.info ? state.info.playbackProtection : null,
                    vod: state.info ? state.info.vod : null,
                    paywall: action.payload,
                    live: state.info ? state.info.live : null
                }
            }
        default: return state
    };
}

export { reducer as DashboardReducer };

