import { ActionTypes, EmbedSettingsOptionType } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { SettingsServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetEmbedSettingsOptions {
    type: ActionTypes.GET_EMBED_SETTINGS_OPTIONS;
    payload: {data: EmbedSettingsOptionType};
}

export interface SaveEmbedSettingsOptions {
    type: ActionTypes.SAVE_EMBED_SETTINGS_OPTIONS;
    payload: EmbedSettingsOptionType;
}

//Exemple of Async Action
export const getEmbedSettingsOptionsAction = (): ThunkDispatch<Promise<void>, {}, GetEmbedSettingsOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetEmbedSettingsOptions> ) => {
        await SettingsServices.getEmbedSettingsOptionsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_EMBED_SETTINGS_OPTIONS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveEmbedSettingsOptionsAction = (data: EmbedSettingsOptionType): ThunkDispatch<Promise<void>, {}, SaveEmbedSettingsOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveEmbedSettingsOptions> ) => {
        await SettingsServices.saveEmbedSettingsOptionsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_EMBED_SETTINGS_OPTIONS, payload: data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetEmbedSettingsOptions | SaveEmbedSettingsOptions;
