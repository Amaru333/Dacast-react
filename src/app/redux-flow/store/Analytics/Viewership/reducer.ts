import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";
import { CountriesDetail } from '../../../../constants/CountriesDetails';

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP: 
            const formateDataDevice = Object.entries(action.payload.playtimePerOs).map(el => { return el[0] })
            const formateDataDeviceValue = Object.entries(action.payload.playtimePerOs).map(el => { return el[1] })
            if(action.payload.failed) {
                return {
                    data: {
                        playtimePerDevices: {failed: true},
                        playtimePerLocation: {failed: true},
                    }
                }
            }
            return {
                data: {
                    ...AnalyticsViewershipInitialState.data,
                    playtimePerDevices: {
                        labels: formateDataDevice,
                        data: formateDataDeviceValue 
                    } ,
                    playtimePerLocation:  {
                        data: Object.entries(action.payload.playtimePerCountry).map(item => {
                        //data: Object.entries(country).map(item => {
                            const assosiatedCountry = CountriesDetail.find(element => element["\"Alpha-2code\""] === item[0]);

                            return assosiatedCountry ? {
                                city: assosiatedCountry["\"Country\""],
                                position:{
                                    latitude: assosiatedCountry["\"Latitude(average)\""],
                                    longitude: assosiatedCountry["\"Longitude(average)\""]
                                },
                                consumedMB: item[1]
                            } : {}
                        })
                    }    
                },
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };

