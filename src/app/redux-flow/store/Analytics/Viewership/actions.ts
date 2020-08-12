import { ActionTypes, GetAnalyticsViewershipOptions, AnalyticsViewershipConcurrentPlayback, AnalyticsViewershipConsumptionDomain, AnalyticsViewershipConsumptionDevices, AnalyticsViewershipPlaysViewersTime, AnalyticsViewershipConsumptionBreakdown, AnalyticsViewershipViewingTimeBreakdown, ViewershipJobIDs } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsViewershipServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsViewership {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP;
    payload:  {data: any};
}

export const getAnalyticsViewershipAction = (options?: GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewership> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewership> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewership(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetAnalyticsViewership;
