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
                    vod: {
                        totalVideos: 0,
                        videoPlays: 0,
                        impressions: 0,
                        topVideos: [],
                        playRate: 0,
                        ...action.payload.data.vod
                    },
                    live: {
                        activeChannels: 0,
                        totalChannels: 0,
                        liveViewers: 0,
                        topChannels: [],
                        ...action.payload.data.live
                    }
                }
            }
        default: return state
    };
}

export { reducer as DashboardReducer };

