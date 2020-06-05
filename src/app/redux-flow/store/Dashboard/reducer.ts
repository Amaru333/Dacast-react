import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, dashboardInitialState, DashboardState } from "./types";

const reducer: Reducer<DashboardState> = (state = dashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_DASHBOARD_DETAILS :
            return {
                ...state,
                data: {
                    ...action.payload.data, 
                    isPayingPlan: {
                        displayName: 'Scale',
                        price: 390,
                        nextBill: 189,
                        lastBill: 198
                    },
                    isTrial: {
                        daysLeft: 30,
                    }
                }
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
                            data: action.payload.viewers
                        }
                    }
                }
               
            }
        case ActionTypes.GET_DASHBOARD_LIVE_TOP:
            console.log(action)
            if(action.payload.content) {
                var result = []
                for (var i = 0; i < action.payload.content.length; i++) {
                    result.push({ name: action.payload.content[i], viewers: action.payload.viewers[i]})
                }
                console.log(result);
            } else {
                var result = [];
            }
            console.log(result)
            return {
                ...state,
                data: {
                    ...state.data,
                    live: {
                        ...state.data.live,
                        topChannels: {
                            ...state.data.live.topChannels,
                            data: result
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
                        'play-rate': {
                            ...state.data.vod['play-rate'],
                            data:  action.payload.data
                        }
                    }
                }
            }
        case ActionTypes.GET_DASHBOARD_VOD_PLAY :
            return {
                ...state,
                data: {
                    ...state.data, 
                    vod: {
                        ...state.data.vod,
                        videoPlays: {
                            ...state.data.vod.videoPlays,
                            data:  action.payload.data
                        }
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as DashboardReducer };

