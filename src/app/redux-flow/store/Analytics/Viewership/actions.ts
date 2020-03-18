import { ActionTypes, AnalyticsViewershipInfos, GetAnalyticsViewershipOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsViewershipServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsViewershipDetails {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_DETAILS;
    payload: AnalyticsViewershipInfos;
}

export const getAnalyticsViewershipDetailsAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipDetails> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipDetailsService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetAnalyticsViewershipDetails;
