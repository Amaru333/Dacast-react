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
    payload: {data: any;  failed: boolean; loading: boolean};
}

export interface GetDashboardVodPlay {
    type: ActionTypes.GET_DASHBOARD_VOD_PLAY;
    payload: {data: any;  failed: boolean; loading: boolean};
}


export interface GetDashboardVodImpressions {
    type: ActionTypes.GET_DASHBOARD_VOD_IMPRESSIONS;
    payload: {data: any;  failed: boolean; loading: boolean};
}

export interface GetDashboardVodTopVideos {
    type: ActionTypes.GET_DASHBOARD_VOD_TOP_CONTENTS;
    payload: {data: any;  failed: boolean; loading: boolean};
}
export interface GetDashboardLiveViewers {
    type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS;
    payload: {data: any;  failed: boolean; loading: boolean};
}

export interface GetDashboardLiveTopChannels{
    type: ActionTypes.GET_DASHBOARD_LIVE_TOP;
    payload: {data: any;  failed: boolean; loading: boolean};
}


export const getDashboardDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetDashboardDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardDetails> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_DETAILS, payload: {}} );
    };
}

export const getDashboardLiveTopChannels = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardLiveTopChannels> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardLiveTopChannels> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_TOP, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardTopLiveService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_TOP, payload: {...response.data, failed: false, loading: false } } );
            }).catch((error) => {
                console.log(error)
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_TOP, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardLiveViewers = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardLiveViewers> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardLiveViewers> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardLiveViewersService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS, payload: {...response.data, failed: false, loading: false } } );
            }).catch((error) => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_LIVE_VIEWERS, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodImpressionsAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodImpressions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodImpressions> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_IMPRESSIONS, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardImpressionsService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_IMPRESSIONS, payload: {...response.data, failed: false, loading: false } } );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_IMPRESSIONS, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodTopVideosAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodTopVideos> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodTopVideos> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_TOP_CONTENTS, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardTopVodService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_TOP_CONTENTS, payload: {...response.data, failed: false, loading: false } } );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_TOP_CONTENTS, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodPlayRateAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodPlayRate> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodPlayRate> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardVodPlayRateService(jobID)
            .then( response => {
                console.log(response, "response");
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE, payload: {data: response.data, failed: false, loading: false } } );
            }).catch((error) => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY_RATE, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getDashboardVodPlayAction = (jobID: string): ThunkDispatch<Promise<void>, {}, GetDashboardVodPlay> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardVodPlay> ) => {
        dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload:{data: {}, failed: false, loading: true}} );
        await DashboardServices.getDashboardVodPlayService(jobID)
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload: {...response.data, failed: false, loading: false } } );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_VOD_PLAY, payload: {data: {}, failed: true, loading: false}} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetDashboardDetails | GetDashboardVodPlayRate | GetDashboardVodPlay | GetDashboardLiveViewers | GetDashboardLiveTopChannels | GetDashboardVodTopVideos | GetDashboardVodImpressions;
