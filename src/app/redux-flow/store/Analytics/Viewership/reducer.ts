import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsViewershipInitialState, AnalyticsViewershipState } from "./types";

const reducer: Reducer<AnalyticsViewershipState> = (state = AnalyticsViewershipInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_VIEWERSHIP: 
            return {
                data: {
                    ...AnalyticsViewershipInitialState.data,
                    consumptionPerDevices: action.payload.playtimePerOs ,
                    consumptionBreakdown:  action.payload.playtimePerCountry
                    
                },
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsViewershipReducer };

