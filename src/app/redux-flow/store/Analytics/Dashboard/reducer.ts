import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD: 
            if(!action.payload) {
                return state;
            }
            if(action.payload.data.failed) {
                return {
                    data: {
                        ...AnalyticsDashboardInitialState.data,
                        playtimePerTime: {
                            failed: true
                        },
                        playsViewersPerTime: {
                            failed: true
                        }
                    }
                }
            }
            var formateTime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.timestamp} )
            var formateDataPlaytime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.playtime} )
            var formateDataPlays = action.payload.data.playsAndViewersTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.plays} )
            var formateDataViewers = action.payload.data.playsAndViewersTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.viewers} )

            return {
                data: {
                    ...AnalyticsDashboardInitialState.data,
                    playtimePerTime: {
                        data: formateDataPlaytime, time: formateTime
                    },
                    playsViewersPerTime: {
                        plays: {
                            time: formateTime,
                            data: formateDataPlays,
                        },
                        viewers: {
                            time: formateTime,
                            data: formateDataViewers,
                        },
                        failed: false
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsDashboardReducer };

