import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, AnalyticsRevenueInitialState, AnalyticsRevenueInfos } from "./types";

const reducer: Reducer<AnalyticsRevenueInfos> = (state = AnalyticsRevenueInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ANALYTICS_REVENUE :
            const salesTimeData =  action.payload.errors === true ? {failed: true} : ( action.payload.salesTime.data ? {...action.payload.salesTime }  : {data: [], time: []}  )
            const salesCountriesData =  action.payload.errors === true ? {failed: true} : ( action.payload.salesTime.data ? {...action.payload.salesCountries }  : {data: [], countries: []}  )
            const revenueTimeData =  action.payload.errors === true ? {failed: true} : ( action.payload.revenueTime ? {...action.payload.revenueTime[0] }  : { currency: '', data: [], time: []}  )

            return {
                ...state,
                salesTime: salesTimeData, 
                salesCountries: salesCountriesData, 
                revenueTime: revenueTimeData
            }
        default:
            return state;
    }
};

export { reducer as AnalyticsRevenueReducer };

