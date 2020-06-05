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

export interface GetDashboardLiveViewers {
    type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS;
    payload: {data: any};
}

export interface GetDashboardLiveTopChannels{
    type: ActionTypes.GET_DASHBOARD_LIVE_TOP;
    payload: {data: any};
}


export const getDashboardDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetDashboardDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardDetails> ) => {
        await DashboardServices.getDashboardDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_DETAILS, payload: response.data} );
            }).catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardLiveTopChannels = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardLiveTopChannels> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardLiveTopChannels> ) => {
        await DashboardServices.getDashboardTopLiveService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_TOP, payload: response.data} );
            }).catch((error) => {
                console.log(error)
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_TOP, payload: {data: {}} } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardLiveViewers = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardLiveViewers> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardLiveViewers> ) => {
        await DashboardServices.getDashboardLiveViewersService(jobID)
            .then( response => {

                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS, payload: response.data} );
            }).catch((error) => {
                console.log(error)
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS, payload: {data: 1} } );
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
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE, payload: {data: 1}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodPlayAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodPlay> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodPlay> ) => {
        await DashboardServices.getDashboardVodPlayService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload: {data: 1}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetDashboardDetails | GetDashboardVodPlayRate | GetDashboardVodPlay | GetDashboardLiveViewers | GetDashboardLiveTopChannels;
