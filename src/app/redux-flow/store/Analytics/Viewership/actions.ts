import { ActionTypes, GetAnalyticsViewershipOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsViewershipServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsViewership {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP;
    payload: any;
}

export const getAnalyticsViewershipAction = (options?: GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewership> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewership> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewership(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP, payload: {failed: true} } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action = GetAnalyticsViewership;