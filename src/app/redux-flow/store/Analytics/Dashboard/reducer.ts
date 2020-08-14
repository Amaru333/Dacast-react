import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";

const reducer: Reducer<AnalyticsDashboardState> = (state = AnalyticsDashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_DASHBOARD: 
            if(!action.payload) {
                return state;
            }
            var formateTime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.timestamp} )
            var formateDataPlaytime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.playtime} )
            return {
                data: {
                    ...AnalyticsDashboardInitialState.data,
                    playtimePerTime: {
                        data: formateDataPlaytime, time: formateTime
                    },
                    playsViewersPerTime: {
                        plays: {
                            time: [],
                            data: [],
                        },
                        viewers: {
                            time: [],
                            data: [],
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

