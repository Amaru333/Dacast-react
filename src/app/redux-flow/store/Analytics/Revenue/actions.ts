import { ActionTypes, AnalyticsRevenueInfos, GetAnalyticsRevenueOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRevenueServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsRevenueDetails {
    type: ActionTypes.GET_ANALYTICS_REVENUE_DETAILS;
    payload: AnalyticsRevenueInfos;
}

export const getAnalyticsRevenueDetailsAction = (options?:  GetAnalyticsRevenueOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRevenueDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRevenueDetails> ) => {
        await AnalyticsRevenueServices.getAnalyticsRevenueDetailsService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REVENUE_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetAnalyticsRevenueDetails;
