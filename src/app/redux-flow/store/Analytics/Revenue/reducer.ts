import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRevenueInitialState, AnalyticsRevenueState } from "./types";

const reducer: Reducer<AnalyticsRevenueState> = (state = AnalyticsRevenueInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REVENUE :
            console.log(action)
            return {
                data: { ...state.data, 
                    salesByTime:  {...action.payload.data.salesTime.data, failed: action.payload.data.salesTime.data == null} , 
                    salesPerCountry: {...action.payload.data.salesCountries.data, failed: action.payload.data.salesCountries.data == null}, 
                    revenueByTime: {...action.payload.data.revenueTime, failed: action.payload.data.revenueByTime == null}
                }
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRevenueReducer };

