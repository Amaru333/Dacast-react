import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes } from './types';
import { vodEngagementServices } from './services';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';

export interface GetVodEngagementSettings {
    type: ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveVodEngagementSettings {
    type: ActionTypes.SAVE_VOD_ENGAGEMENT_SETTINGS;
    payload: ContentEngagementSettings;
}

export interface SaveVodAd {
    type: ActionTypes.SAVE_VOD_AD;
    payload: Ad;
}

export interface CreateVodAd {
    type: ActionTypes.CREATE_VOD_AD;
    payload: Ad;
}

export interface DeleteVodAd {
    type: ActionTypes.DELETE_VOD_AD;
    payload: Ad; 
}

export const getVodEngagementSettingsAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodEngagementSettings> ) => {
        await vodEngagementServices.getVodEngagementSettings(vodId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS, payload: {contentId: vodId, engagementSettings: response.data.data}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodEngagementSettingsAction = (data: ContentEngagementSettings): ThunkDispatch<Promise<void>, {}, SaveVodEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodEngagementSettings> ) => {
        await vodEngagementServices.saveVodEngagementSettings(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_ENGAGEMENT_SETTINGS, payload: response.data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, SaveVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodAd> ) => {
        await vodEngagementServices.saveVodAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_AD, payload: response.data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createVodAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, CreateVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateVodAd> ) => {
        await vodEngagementServices.createVodAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_VOD_AD, payload: response.data} );
                dispatch(showToastNotification("Ad created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteVodAdAction = (data: Ad): ThunkDispatch<Promise<void>, {}, DeleteVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteVodAd> ) => {
        await vodEngagementServices.deleteVodAd(data)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_VOD_AD, payload: response.data} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodEngagementSettings | SaveVodEngagementSettings | SaveVodAd | CreateVodAd | DeleteVodAd