import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";
import { CountriesDetail } from '../../../../constants/CountriesDetails';

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP: 
            const formateDataDevice = Object.entries(action.payload.playtimePerOs).map(el => { return el[0] })
            const formateDataDeviceValue = Object.entries(action.payload.playtimePerOs).map(el => { return el[1] })
            const formateCsvDataDevice = Object.entries(action.payload.playtimePerOs).map(el => { return { device: el[0], playtime: el[1] } })
            const formateCsvDataLocation = Object.entries(action.payload.playtimePerCountry).map(el => { return { country: el[0], playtime: el[1] } })

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
                        data: formateDataDeviceValue,
                        csv: { header: { device: "Device", playtime: "Play Time" }, data: formateCsvDataDevice }
                    } ,
                    playtimePerLocation:  {
                        data: Object.entries(action.payload.playtimePerCountry).map(item => {
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
                        }),
                        csv: { header: { country: "Country", playtime: "Play Time" }, data: formateCsvDataLocation }

                    }    
                },
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };