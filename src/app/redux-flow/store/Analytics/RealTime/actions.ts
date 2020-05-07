import { ActionTypes, AnalyticsRealTimeInfos, AnalyticsRealTimePlaybackTime, AnalyticsRealTimeViewersTime, AnalyticsRealTimeGbTime, AnalyticsRealTimeConsumptionLocation, GetAnalyticsRealtimeOptions } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsRealTimeServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsRealTimeViewersTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_VIEWERS_TIME;
    payload: AnalyticsRealTimeViewersTime;
}

export interface GetAnalyticsRealTimePlaybackTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_PLAYBACK_TIME;
    payload: AnalyticsRealTimePlaybackTime;
}
export interface GetAnalyticsRealTimeGbTime {
    type: ActionTypes.GET_ANALYTICS_REALTIME_GB_TIME;
    payload: AnalyticsRealTimeGbTime;
}

export interface GetAnalyticsRealTimeConsumptionLocation {
    type: ActionTypes.GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION;
    payload: AnalyticsRealTimeConsumptionLocation;
}

export const getAnalyticsRealTimeViewersTimesAction = (options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeViewersTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeViewersTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeViewersTimeService(options)
            .then( response => {
                console.log(response, "response");
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_VIEWERS_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimePlaybackTimeAction = (options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimePlaybackTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimePlaybackTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimePlaybackTimeService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_PLAYBACK_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimeGbTimeAction = (options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeGbTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeGbTime> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeGbTimeService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_GB_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsRealTimeConsumptionLocationAction = (options?:  GetAnalyticsRealtimeOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsRealTimeConsumptionLocation> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsRealTimeConsumptionLocation> ) => {
        await AnalyticsRealTimeServices.getAnalyticsRealTimeConsumptionLocationService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_REALTIME_CONSUMPTION_LOCATION, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsRealTimeViewersTime | GetAnalyticsRealTimePlaybackTime | GetAnalyticsRealTimeGbTime | GetAnalyticsRealTimeConsumptionLocation;
