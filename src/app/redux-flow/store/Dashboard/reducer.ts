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
                            ...action.payload.data
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
                            ...action.payload.data
                        }
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as DashboardReducer };

