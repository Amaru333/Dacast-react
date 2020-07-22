import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, dashboardInitialState, DashboardState } from "./types";

const reducer: Reducer<DashboardState> = (state = dashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_DASHBOARD_DETAILS :
            
            return {
                ...state,
                data: { ...action.payload.data }
            }
        case ActionTypes.GET_DASHBOARD_LIVE_VIEWERS: 
            return {
                ...state,
                data: {
                    ...state.data,
                    live: {
                        ...state.data.live,
                        liveViewers: {
                            ...state.data.live.liveViewers,
                            data: action.payload.viewers,
                            loading: action.payload.loading,
                            failed:  !action.payload.viewers ? true : action.payload.failed
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_LIVE_TOP:
            if(action.payload.content) {
                var result = []
                for (var i = 0; i < action.payload.content.length; i++) {
                    result.push({ name: action.payload.content[i], viewers: action.payload.viewers[i]})
                }
            } else {
                var result = [];
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    live: {
                        ...state.data.live,
                        topChannels: {
                            ...state.data.live.topChannels,
                            data: result,
                            loading: action.payload.loading,
                            failed: action.payload.failed
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE :
            return {
                ...state,
                data: {
                    ...state.data, 
                    vod: {
                        ...state.data.vod,
                        playRate: {
                            ...state.data.vod.playRate,
                            data: {impressions: action.payload.data.impressions, playRate: action.payload.data.plays} ,
                            loading: action.payload.loading,
                            failed: action.payload.failed
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD_IMPRESSIONS :
            return {
                ...state,
                data: {
                    ...state.data, 
                    vod: {
                        ...state.data.vod,
                        impressions: {
                            ...state.data.vod.impressions,
                            data:  action.payload.data,
                            loading: action.payload.loading,
                            failed: action.payload.failed
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD_TOP_CONTENTS :
            if(action.payload.content) {
                var result = []
                for (var i = 0; i < action.payload.content.length; i++) {
                    result.push({ name: action.payload.content[i], viewers: action.payload.viewers[i]})
                }
            } else {
                var result = [];
            }
            return {
                ...state,
                data: {
                    ...state.data, 
                    vod: {
                        ...state.data.vod,
                        topVideos: {
                            ...state.data.vod.topVideos,
                            data: result,
                            loading: action.payload.loading,
                            failed: action.payload.failed
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD_PLAY :
            console.log(action);
            return {
                ...state,
                data: {
                    ...state.data, 
                    vod: {
                        ...state.data.vod,
                        videoPlays: {
                            ...state.data.vod.videoPlays,
                            data:  action.payload.plays,
                            loading: action.payload.loading,
                            failed: !action.payload.plays ? true : action.payload.failed
                        }
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as DashboardReducer };

