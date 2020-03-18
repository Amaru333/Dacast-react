import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { SettingsIntegrationServices } from './services';
import { showToastNotification } from '../../Toasts';
import { ApiIntegrationPageInfos } from './types';

export interface GetSettingsIntegrationDetails {
    type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS;
    payload: ApiIntegrationPageInfos;
}

export const getSettingsIntegrationAction = (): ThunkDispatch<Promise<void>, {}, GetSettingsIntegrationDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsIntegrationDetails> ) => {
        await SettingsIntegrationServices.getSettingsIntegrationService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetSettingsIntegrationDetails;
