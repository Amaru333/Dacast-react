import { ActionTypes, AnalyticsRevenueInfos, GetAnalyticsRevenueOptions, AnalyticsRevenueSalesByTime, AnalyticsRevenueSalesPerCountry, AnalyticsRevenueRevenueByTime } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRevenueServices } from './services';
import { showToastNotification } from '../../Toasts';


export interface GetAnalyticsRevenue {
    type: ActionTypes.GET_ANALYTICS_REVENUE;
    payload: AnalyticsRevenueInfos | false;
}

export const getAnalyticsRevenueAction = (options?:  GetAnalyticsRevenueOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRevenue> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRevenue> ) => {
        await AnalyticsRevenueServices.getAnalyticsRevenueService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE, payload: response.data} );
            }).catch((e) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsRevenue;
