import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { SettingsIntegrationServices } from './services';
import { showToastNotification } from '../../toasts';
import { ApiIntegrationPageInfos } from './types';

export interface GetSettingsIntegrationDetails {
    type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS;
    payload: ApiIntegrationPageInfos;
}

export const getSettingsIntegrationAction = (): ThunkDispatch<Promise<void>, {}, GetSettingsIntegrationDetails> => {
    var fakeData : ApiIntegrationPageInfos  = {
        apiKeys: [
            {
                label: "My Api Key",
                clientId: "client_id",
                authToken: "auth_token_12234556",
                type: "rw"
            },{
                label: "My Api Key 2",
                clientId: "client_id_2",
                authToken: "auth_token_12234556",
                type: "ro"
            }
        ],
        encoderKeys: [
            {
                label: "My Encoder Key",
                clientId: "client_id",
                authToken: "auth_token_12234556",
                type: "rw"
            },{
                label: "My Encoder Key 2",
                clientId: "client_id_2",
                authToken: "auth_token_12234556",
                type: "ro"
            }
        ],
        webHook: [{
            enable: true,
            url: "dacast.com/callback",
            method: "POST"
        }]
    };
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsIntegrationDetails> ) => {
        setTimeout(() => {
            dispatch( {type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS, payload: fakeData} );

        }, 1000);
    };

    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsIntegrationDetails> ) => {
        await SettingsIntegrationServices.getSettingsIntegrationService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetSettingsIntegrationDetails;
