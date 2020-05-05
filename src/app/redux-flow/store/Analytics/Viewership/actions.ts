import { ActionTypes, GetAnalyticsViewershipOptions, AnalyticsViewershipConcurrentPlayback, AnalyticsViewershipConsumptionDomain, AnalyticsViewershipConsumptionDevices, AnalyticsViewershipPlaysViewersTime, AnalyticsViewershipConsumptionBreakdown, AnalyticsViewershipViewingTimeBreakdown } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsViewershipServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsViewershipConcurrentPlayback {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK;
    payload: AnalyticsViewershipConcurrentPlayback;
}
export interface GetAnalyticsViewershipConsumptionDomain {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN;
    payload: AnalyticsViewershipConsumptionDomain | false;
}
export interface GetAnalyticsViewershipConsumptionDevice {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE;
    payload: AnalyticsViewershipConsumptionDevices;
}
export interface GetAnalyticsViewershipPlaysViewersTime {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME;
    payload: AnalyticsViewershipPlaysViewersTime;
}
export interface GetAnalyticsViewershipConsumptionBreakdown {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN;
    payload: AnalyticsViewershipConsumptionBreakdown;
}
export interface GetAnalyticsViewershipViewingTime {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN;
    payload: AnalyticsViewershipViewingTimeBreakdown;
}

export const getAnalyticsViewershipViewingTimeAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipViewingTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipViewingTime> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipViewingTimeBreakdownService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionBreakdownAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionBreakdown> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionBreakdown> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionBreakdownService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipPlaysViewersTimeAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipPlaysViewersTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipPlaysViewersTime> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipPlaysViewersTimeService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionDeviceAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionDevice> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionDevice> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionDevicesService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionDomainAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionDomain> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionDomain> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionDomainService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConcurrentPlaybackAction = (options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConcurrentPlayback> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConcurrentPlayback> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConcurrentPlaybackService(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsViewershipConcurrentPlayback | GetAnalyticsViewershipConsumptionDomain | GetAnalyticsViewershipConsumptionDevice | GetAnalyticsViewershipPlaysViewersTime
| GetAnalyticsViewershipConsumptionBreakdown | GetAnalyticsViewershipViewingTime;
