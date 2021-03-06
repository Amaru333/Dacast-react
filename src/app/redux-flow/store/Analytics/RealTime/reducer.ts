import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRealTimeInitialState, AnalyticsRealTimeState } from "./types";
import { CountriesDetail } from '../../../../constants/CountriesDetails';

const reducer: Reducer<AnalyticsRealTimeState> = (state = AnalyticsRealTimeInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REALTIME: 
            if(!action.payload) {
                return state;
            }
            if(action.payload.data.failed) {
                return {
                    data: {
                        playtimePerTime: {failed: true},
                        playsPerRealTime: {failed: true},
                        playsPerLocation: {failed: true},
                        concurentViewersPerTime: {failed: true},
                    }
                }
            }
            var formateTime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.timestamp} )
            var formateDataPlaytime = action.payload.data.playtimeTimeSeries.map( (e: {playtime: number, timestamp: number }) => {return e.playtime} )
            var formateDataPlay = action.payload.data.playsTimeSeries.map( (e: {plays: number, timestamp: number }) => {return e.plays} )
            var formateDataViewers = action.payload.data.viewersTimeSeries.map( (e: {viewers: number, timestamp: number }) => {return e.viewers} )
            //var country = { 'US' : 90, 'UNknwoef': 912 };
            return {
                data: {
                    ...AnalyticsRealTimeInitialState.data,
                    playtimePerTime: {
                        time: formateTime,
                        data: formateDataPlaytime
                    },
                    playsPerRealTime: {
                        time: formateTime,
                        data: formateDataPlay
                    },
                    playsPerLocation: {
                        data: Object.entries(action.payload.data.playtimePerCountry).map(item => {
                        //data: Object.entries(country).map(item => {
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === item[0]);
                            return {
                                city: assosiatedCountry ? assosiatedCountry["\"Country\""] : "Unknown",
                                position:{
                                    latitude: assosiatedCountry ? parseInt(assosiatedCountry["\"Latitude(average)\""]) : 0,
                                    longitude: assosiatedCountry ? parseInt(assosiatedCountry["\"Longitude(average)\""]) : 0
                                },
                                consumedMB: item[1]
                            }
                        })
                    },
                    concurentViewersPerTime: {
                        time: formateTime,
                        data: formateDataViewers
                    }
                },
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRealTimeReducer };