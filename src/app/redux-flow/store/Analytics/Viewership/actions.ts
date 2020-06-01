import { ActionTypes, GetAnalyticsViewershipOptions, AnalyticsViewershipConcurrentPlayback, AnalyticsViewershipConsumptionDomain, AnalyticsViewershipConsumptionDevices, AnalyticsViewershipPlaysViewersTime, AnalyticsViewershipConsumptionBreakdown, AnalyticsViewershipViewingTimeBreakdown, ViewershipJobIDs } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsViewershipServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsViewershipJobIds {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_JOB_IDS;
    payload:  {data: ViewershipJobIDs};
    failed?: boolean;
}

export interface GetAnalyticsViewershipConcurrentPlaybackDevice {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE;
    payload: AnalyticsViewershipConcurrentPlayback;
    failed?: boolean;
}

export interface GetAnalyticsViewershipConcurrentPlaybackContent {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT;
    payload: AnalyticsViewershipConcurrentPlayback;
    failed?: boolean;
}

export interface GetAnalyticsViewershipConcurrentPlaybackMap {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP;
    payload: AnalyticsViewershipConcurrentPlayback;
    failed?: boolean;
}

export interface GetAnalyticsViewershipConsumptionBreakdownTime {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME;
    payload: AnalyticsViewershipConsumptionBreakdown;
    failed?: boolean;
}
export interface GetAnalyticsViewershipConsumptionBreakdownContent {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT;
    payload: AnalyticsViewershipConsumptionBreakdown;
    failed?: boolean;
}
export interface GetAnalyticsViewershipConsumptionBreakdownMap {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP;
    payload: AnalyticsViewershipConsumptionBreakdown;
    failed?: boolean;
}

export interface GetAnalyticsViewershipViewingTimeDevice {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE;
    payload: AnalyticsViewershipViewingTimeBreakdown;
    failed?: boolean;
}

export interface GetAnalyticsViewershipViewingTimeContent {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT;
    payload: AnalyticsViewershipViewingTimeBreakdown;
    failed?: boolean;
}

export interface GetAnalyticsViewershipViewingTimeMap {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP;
    payload: AnalyticsViewershipViewingTimeBreakdown;
    failed?: boolean;
}

export interface GetAnalyticsViewershipConsumptionDomain {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN;
    payload: AnalyticsViewershipConsumptionDomain | false;
    failed?: boolean;
}
export interface GetAnalyticsViewershipConsumptionDevice {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE;
    payload: AnalyticsViewershipConsumptionDevices;
    failed?: boolean;
}
export interface GetAnalyticsViewershipPlaysViewersTime {
    type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME;
    payload: AnalyticsViewershipPlaysViewersTime;
    failed?: boolean;
}


export const getAnalyticsViewershipJobIdsAction = (options?: GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipJobIds> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipJobIds> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipJobIds(options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_JOB_IDS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipViewingTimeContentAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipViewingTimeContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipViewingTimeContent> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipViewingTimeBreakdownContentService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipViewingTimeDeviceAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipViewingTimeDevice> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipViewingTimeDevice> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipViewingTimeBreakdownDeviceService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipViewingTimeMapAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipViewingTimeMap> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipViewingTimeMap> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipViewingTimeBreakdownMapService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConcurrentPlaybackDeviceAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConcurrentPlaybackDevice> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConcurrentPlaybackDevice> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConcurrentPlaybackDeviceService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConcurrentPlaybackContentAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConcurrentPlaybackContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConcurrentPlaybackContent> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConcurrentPlaybackContentService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConcurrentPlaybackMapAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConcurrentPlaybackMap> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConcurrentPlaybackMap> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConcurrentPlaybackMapService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export const getAnalyticsViewershipConsumptionBreakdownTimeAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionBreakdownTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionBreakdownTime> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionBreakdownTimeService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionBreakdownContentAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionBreakdownContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionBreakdownContent> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionBreakdownContentService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionBreakdownMapAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionBreakdownMap> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionBreakdownMap> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionBreakdownMapService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}
export const getAnalyticsViewershipPlaysViewersTimeAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipPlaysViewersTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipPlaysViewersTime> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipPlaysViewersTimeService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionDeviceAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionDevice> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionDevice> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionDevicesService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsViewershipConsumptionDomainAction = (jobId: string, options?:  GetAnalyticsViewershipOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsViewershipConsumptionDomain> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsViewershipConsumptionDomain> ) => {
        await AnalyticsViewershipServices.getAnalyticsViewershipConsumptionDomainService(jobId, options)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN, payload: response.data} );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN, failed: true } );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsViewershipJobIds | GetAnalyticsViewershipConcurrentPlaybackDevice | GetAnalyticsViewershipConcurrentPlaybackContent | GetAnalyticsViewershipConcurrentPlaybackMap| GetAnalyticsViewershipConsumptionDomain | GetAnalyticsViewershipConsumptionDevice | GetAnalyticsViewershipPlaysViewersTime
| GetAnalyticsViewershipConsumptionBreakdownTime | GetAnalyticsViewershipConsumptionBreakdownContent | GetAnalyticsViewershipConsumptionBreakdownMap | GetAnalyticsViewershipViewingTimeDevice | GetAnalyticsViewershipViewingTimeContent | GetAnalyticsViewershipViewingTimeMap;
