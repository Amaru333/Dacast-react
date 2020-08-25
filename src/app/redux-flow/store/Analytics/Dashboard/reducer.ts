import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsDashboardInitialState, AnalyticsDashboardState } from "./types";
import { tsToLocaleDate } from '../../../../../utils/utils';

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

            var test = [{"playtime":0,"timestamp":1598306400},{"playtime":0,"timestamp":1598310000},{"playtime":7,"timestamp":1598313600},{"playtime":144,"timestamp":1598317200},{"playtime":671,"timestamp":1598320800},{"playtime":4,"timestamp":1598324400},{"playtime":9,"timestamp":1598328000},{"playtime":4,"timestamp":1598331600},{"playtime":9,"timestamp":1598335200},{"playtime":2,"timestamp":1598338800},{"playtime":87,"timestamp":1598342400},{"playtime":141,"timestamp":1598346000},{"playtime":1724,"timestamp":1598349600},{"playtime":1531,"timestamp":1598353200}]
            var test2 = [{"plays":0,"timestamp":1598306400,"viewers":0},{"plays":0,"timestamp":1598310000,"viewers":0},{"plays":0,"timestamp":1598313600,"viewers":0},{"plays":0,"timestamp":1598317200,"viewers":0},{"plays":0,"timestamp":1598320800,"viewers":0},{"plays":0,"timestamp":1598324400,"viewers":0},{"plays":0,"timestamp":1598328000,"viewers":0},{"plays":0,"timestamp":1598331600,"viewers":0},{"plays":0,"timestamp":1598335200,"viewers":0},{"plays":0,"timestamp":1598338800,"viewers":0},{"plays":0,"timestamp":1598342400,"viewers":0},{"plays":0,"timestamp":1598346000,"viewers":0},{"plays":0,"timestamp":1598349600,"viewers":0},{"plays":0,"timestamp":1598353200,"viewers":0}]

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

