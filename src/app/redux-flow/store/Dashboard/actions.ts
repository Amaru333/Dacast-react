import { ActionTypes, DashboardInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "..";
import { DashboardServices } from './services';
import { showToastNotification } from '../Toasts';

export interface GetDashboardDetails {
    type: ActionTypes.GET_DASHBOARD_DETAILS;
    payload: {data: DashboardInfos};
}

export interface GetDashboardVodPlayRate {
    type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE;
    payload: {data: any};
}

export interface GetDashboardVodPlay {
    type: ActionTypes.GET_DASHBOARD_VOD_PLAY;
    payload: {data: any};
}

export const getDashboardDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetDashboardDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardDetails> ) => {
        await DashboardServices.getDashboardDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}
export const getDashboardVodPlayRateAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodPlayRate> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodPlayRate> ) => {
        await DashboardServices.getDashboardVodPlayRateService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodPlayAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodPlay> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodPlay> ) => {
        await DashboardServices.getDashboardVodPlayRateService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetDashboardDetails | GetDashboardVodPlayRate | GetDashboardVodPlay;
