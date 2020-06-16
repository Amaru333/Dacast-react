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
    payload: {ads: Ad[]; contentId: string;};
}

export interface CreateVodAd {
    type: ActionTypes.CREATE_VOD_AD;
    payload: {ads: Ad[], adsId: string; contentId: string};
}

export interface DeleteVodAd {
    type: ActionTypes.DELETE_VOD_AD;
    payload: {ads: Ad[]; contentId: string;}; 
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
                dispatch( {type: ActionTypes.SAVE_VOD_ENGAGEMENT_SETTINGS, payload: data} );
                dispatch(showToastNotification("Engagement settings saved", "fixed", "success"))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveVodAdAction = (data: Ad[], adsId: string, vodId: string): ThunkDispatch<Promise<void>, {}, SaveVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodAd> ) => {
        await vodEngagementServices.saveVodAd(data, adsId, vodId)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_VOD_AD, payload: {ads: data, contentId: vodId}} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createVodAdAction = (data: Ad[], adsId: string, vodId: string): ThunkDispatch<Promise<void>, {}, CreateVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateVodAd> ) => {
        await vodEngagementServices.saveVodAd(data, adsId, vodId)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_VOD_AD, payload: {ads: data, adsId: response.data.data.adsId, contentId: vodId}} );
                dispatch(showToastNotification("Ad created", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteVodAdAction = (data: Ad[], adsId: string, vodId: string): ThunkDispatch<Promise<void>, {}, DeleteVodAd> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteVodAd> ) => {
        await vodEngagementServices.saveVodAd(data, adsId, vodId)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_VOD_AD, payload: {ads: data, contentId: vodId}} );
                dispatch(showToastNotification("Ad saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodEngagementSettings | SaveVodEngagementSettings | SaveVodAd | CreateVodAd | DeleteVodAd