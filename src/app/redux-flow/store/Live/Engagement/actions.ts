import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { liveEngagementServices } from './services';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';

export interface GetLiveEngagementSettings {
    type: ActionTypes.GET_LIVE_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveLiveEngagementSettings {
    type: ActionTypes.SAVE_LIVE_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveLiveAd {
    type: ActionTypes.SAVE_LIVE_AD;
    payload: Ad;
}

export interface CreateLiveAd {
    type: ActionTypes.CREATE_LIVE_AD;
    payload: Ad;
}

export interface DeleteLiveAd {
    type: ActionTypes.DELETE_LIVE_AD;
    payload: Ad; 
}

export const getLiveEngagementSettingsAction = (): ThunkDispatch<Promise<void>, {}, GetLiveEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetLiveEngagementSettings> ) => {
        await liveEngagementServices.getLiveEngagementSettings()
            .then( response => {
                dispatch( {type: ActionTypes.GET_LIVE_ENGAGEMENT_SETTINGS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveEngagementSettingsAction = (data: ContentEngagementSettings): ThunkDispatch<Promise<void>, {}, SaveLiveEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveEngagementSettings> ) => {
        await liveEngagementServices.saveLiveEngagementSettings(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_ENGAGEMENT_SETTINGS, payload: response.data} );
                dispatch(showToastNotification("Changes have been saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveLiveAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, SaveLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveLiveAd> ) => {
        await liveEngagementServices.saveLiveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_LIVE_AD, payload: response.data} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createLiveAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, CreateLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateLiveAd> ) => {
        await liveEngagementServices.createLiveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_LIVE_AD, payload: response.data} );
                dispatch(showToastNotification("Ad has been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteLiveAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, DeleteLiveAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteLiveAd> ) => {
        await liveEngagementServices.deleteLiveAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_LIVE_AD, payload: response.data} );
                dispatch(showToastNotification("Ad has been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetLiveEngagementSettings | SaveLiveEngagementSettings | SaveLiveAd | CreateLiveAd | DeleteLiveAd