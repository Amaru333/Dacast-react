import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRealTimeServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsRealtime {
    type: ActionTypes.GET_ANALYTICS_REALTIME;
    payload:  {data: any};
}

export const getAnalyticsRealTimeAction = (options?: any): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealtime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealtime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTime(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME, payload: { data: response.data } } );
            }).catch((error) => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME, payload: {data: {failed: true}}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}


export type Action = GetAnalyticsRealtime;
