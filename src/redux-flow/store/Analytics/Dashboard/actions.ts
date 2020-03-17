import { ActionTypes, AnalyticsDashboardInfos, GetAnalyticsDashboardOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsDashboardServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsDashboardDetails {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_DETAILS;
    payload: AnalyticsDashboardInfos;
}

export const getAnalyticsDashboardDetailsAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardDetails> ) => {
        await AnalyticsDashboardServices.getAnalyticsDashboardDetailsService(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetAnalyticsDashboardDetails;
