import { ActionTypes, AnalyticsRealTimeInfos, AnalyticsRealTimePlaybackTime, AnalyticsRealTimeViewersTime, AnalyticsRealTimeGbTime, AnalyticsRealTimeConsumptionLocation, GetAnalyticsRealtimeOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRealTimeServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsRealTimeViewersTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_VIEWERS_TIME;
    payload: {data: AnalyticsRealTimeViewersTime};
}

export interface GetAnalyticsRealTimePlaybackTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_PLAYBACK_TIME;
    payload: {data: AnalyticsRealTimePlaybackTime};
}
export interface GetAnalyticsRealTimeGbTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_GB_TIME;
    payload: {data: AnalyticsRealTimeGbTime};
}

export interface GetAnalyticsRealTimeConsumptionLocation {
    type: ActionTypes.GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION;
    payload: {data: AnalyticsRealTimeConsumptionLocation};
}

export interface GetAnalyticsRealtimeJobIds {
    type: ActionTypes.GET_ANALYTICS_REALTIME_JOB_IDS;
    payload:  {data: any};
}

export const getAnalyticsRealTimeJobIdsAction = (): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealtimeJobIds> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealtimeJobIds> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeJobIds()
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_JOB_IDS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimeViewersTimesAction = (jobId: string, options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeViewersTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeViewersTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeViewersTimeService(jobId, options)
            .then( response => {
                console.log(response, "response");
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_VIEWERS_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimePlaybackTimeAction = (jobId: string, options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimePlaybackTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimePlaybackTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimePlaybackTimeService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_PLAYBACK_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimeGbTimeAction = (jobId: string, options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeGbTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeGbTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeGbTimeService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_GB_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimeConsumptionLocationAction = (jobId: string, options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeConsumptionLocation> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeConsumptionLocation> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeConsumptionLocationService(jobId, options)
            .then( response => {
                console.log(response);
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsRealTimeViewersTime | GetAnalyticsRealTimePlaybackTime | GetAnalyticsRealTimeGbTime | GetAnalyticsRealTimeConsumptionLocation | GetAnalyticsRealtimeJobIds;
