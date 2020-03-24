import { ActionTypes, GetAnalyticsDashboardOptions, AnalyticsDashboardConsumptionPerTime, AnalyticsDashboardPlaysViewersPerTime, AnalyticsDashboardConsumptionPerDevice, AnalyticsDashboardTopContents, AnalyticsDashboardConsumptionPerLocation } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsDashboardServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAnalyticsDashboardConsumptionTime {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME;
    payload: AnalyticsDashboardConsumptionPerTime | false;
}

export interface GetAnalyticsDashboardPlaysViewersTime {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME;
    payload: AnalyticsDashboardPlaysViewersPerTime | false;
}

export interface GetAnalyticsDashboardConsumptionDevice {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE;
    payload: AnalyticsDashboardConsumptionPerDevice | false;
}

export interface GetAnalyticsDashboardTopContents {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_TOP_CONTENTS;
    payload: AnalyticsDashboardTopContents | false;
}

export interface GetAnalyticsDashboardConsumptionLocation {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION;
    payload: AnalyticsDashboardConsumptionPerLocation | false;
}

export const getAnalyticsDashboardConsumptionLocationAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardConsumptionLocation> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardConsumptionLocation> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboardConsumptionLocation(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsDashboardTopContentsAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardTopContents> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardTopContents> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_TOP_CONTENTS, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboardTopContent(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_TOP_CONTENTS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsDashboardConsumptionDeviceAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardConsumptionDevice> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardConsumptionDevice> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboardConsumptionDevice(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsDashboardPlaysViewersTimeAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardPlaysViewersTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardPlaysViewersTime> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboardPlaysViewersTime(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getAnalyticsDashboardConsumptionTimeAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboardConsumptionTime> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboardConsumptionTime> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboardConsumptionTime(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetAnalyticsDashboardConsumptionTime | GetAnalyticsDashboardPlaysViewersTime | GetAnalyticsDashboardConsumptionDevice | GetAnalyticsDashboardTopContents | GetAnalyticsDashboardConsumptionLocation;
