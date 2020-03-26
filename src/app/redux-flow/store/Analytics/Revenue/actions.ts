import { ActionTypes, AnalyticsRevenueInfos, GetAnalyticsRevenueOptions, AnalyticsRevenueSalesByTime, AnalyticsRevenueSalesPerCountry, AnalyticsRevenueRevenueByTime } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRevenueServices } from './services';
import { showToastNotification } from '../../Toasts';


export interface GetAnalyticsRevenueSalesByTime {
    type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_BY_TIME;
    payload: AnalyticsRevenueSalesByTime | false;
}

export interface GetAnalyticsRevenueRevenueByTime {
    type: ActionTypes.GET_ANALYTICS_REVENUE_REVENUE_BY_TIME;
    payload: AnalyticsRevenueRevenueByTime | false;
}

export interface GetAnalyticsRevenueSalesPerCountry {
    type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY;
    payload: AnalyticsRevenueSalesPerCountry | false;
}


export const getAnalyticsRevenueSalesTimeAction = (options?:  GetAnalyticsRevenueOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRevenueSalesByTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRevenueSalesByTime> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_BY_TIME, payload: false} );
        await AnalyticsRevenueServices.getAnalyticsRevenueSalesTimeService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_BY_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRevenueRevenueTimeAction = (options?:  GetAnalyticsRevenueOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRevenueRevenueByTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRevenueRevenueByTime> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_REVENUE_BY_TIME, payload: false} );
        await AnalyticsRevenueServices.getAnalyticsRevenueRevenueTimeService(options)
            .then( response => {
                setTimeout(() => {
                    dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_REVENUE_BY_TIME, payload: response.data} );
                }, 2000);
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRevenueSalesCountryAction = (options?:  GetAnalyticsRevenueOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRevenueSalesPerCountry> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRevenueSalesPerCountry> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY, payload: false} );
        await AnalyticsRevenueServices.getAnalyticsRevenueSalesCountryService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsRevenueSalesByTime | GetAnalyticsRevenueRevenueByTime | GetAnalyticsRevenueSalesPerCountry;
