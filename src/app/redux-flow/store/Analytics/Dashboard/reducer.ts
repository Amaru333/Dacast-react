import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";
import { tsToLocaleDate } from '../../../../../utils/formatUtils';

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
            var formateDataPlays = action.payload.data.playsAndViewersTimeSeries.map( (e: {plays: number, timestamp: number }) => {return e.plays} )
            var formateDataViewers = action.payload.data.playsAndViewersTimeSeries.map( (e: {viewers: number, timestamp: number }) => {return e.viewers} )
            var formateCsvPlaytime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => { return { date: tsToLocaleDate(e.timestamp, { hour: "2-digit", minute: "2-digit", day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/,/g, ''), playtime: e.playtime} } )
            var formateCsvPlaysViewers = action.payload.data.playsAndViewersTimeSeries.map( (e: {plays: number, viewers: number, timestamp: number }) => { return { date: tsToLocaleDate(e.timestamp, { hour: "2-digit", minute: "2-digit", day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/,/g, ''), plays: e.plays, viewers: e.viewers} } )

            return {
                data: {
                    ...AnalyticsDashboardInitialState.data,
                    playtimePerTime: {
                        data: formateDataPlaytime, 
                        time: formateTime,
                        csv: {
                            header : { date: 'Date', playtime: 'Play Time' },
                            data:  formateCsvPlaytime
                        }
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
                        csv: {
                            header : { date: 'Date', plays: 'Plays', viewers: 'Viewers' },
                            data:  formateCsvPlaysViewers
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