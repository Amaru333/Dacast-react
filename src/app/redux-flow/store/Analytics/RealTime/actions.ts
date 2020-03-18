import { ActionTypes, AnalyticsRealTimeInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRealTimeServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsRealTimeDetails {
    type: ActionTypes.GET_ANALYTICS_REALTIME_DETAILS;
    payload: AnalyticsRealTimeInfos;
}

export const getAnalyticsRealTimeDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeDetails> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetAnalyticsRealTimeDetails;
