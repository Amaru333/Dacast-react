import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts';
import { ActionTypes, VodEngagementSettings } from './types';
import { vodEngagementServices } from './services';

export interface GetVodEngagementSettings {
    type: ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS;
    payload: VodEngagementSettings;
}

export const getVodEngagementSettingsAction = (): ThunkDispatch<Promise<void>, {}, GetVodEngagementSettings> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodEngagementSettings> ) => {
        await vodEngagementServices.getVodEngagementSettings()
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_ENGAGEMENT_SETTINGS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodEngagementSettings