import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRevenueInitialState, AnalyticsRevenueInfos } from "./types";

const reducer: Reducer<AnalyticsRevenueInfos> = (state = AnalyticsRevenueInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REVENUE :
            return {...state,
                    salesTime:  {...action.payload.salesTime, failed: action.payload.salesTime.data == null} , 
                    salesCountries: {...action.payload.salesCountries, failed: action.payload.salesCountries.data == null}, 
                    revenueTime: {...action.payload.revenueTime[0], failed: action.payload.revenueTime == null}
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRevenueReducer };

