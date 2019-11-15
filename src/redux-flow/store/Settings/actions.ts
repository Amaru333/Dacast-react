import { ActionTypes, DeliveryAndEmbedOptionType } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "..";
import { SettingsServices } from './services';
import { showToastNotification } from '../toasts';

export interface GetDeliveryAndEmbedOptions {
    type: ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS;
    payload: DeliveryAndEmbedOptionType;
}

export interface SaveDeliveryAndEmbedOptions {
    type: ActionTypes.SAVE_DELIVERY_AND_EMBED_OPTIONS;
    payload: DeliveryAndEmbedOptionType;
}

//Exemple of Async Action
export const getDeliveryAndEmbedOptionsAction = (): ThunkDispatch<Promise<void>, {}, GetDeliveryAndEmbedOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDeliveryAndEmbedOptions> ) => {
        await SettingsServices.getDeliveryAndEmbedOptionsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveDeliveryAndEmbedOptionsAction = (data: DeliveryAndEmbedOptionType): ThunkDispatch<Promise<void>, {}, SaveDeliveryAndEmbedOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveDeliveryAndEmbedOptions> ) => {
        await SettingsServices.saveDeliveryAndEmbedOptionsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_DELIVERY_AND_EMBED_OPTIONS, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

//Exemple of classic Action
// export const classicAction = (foo: number): WhateverAction => {
//     return {
//         payload: { foo },
//         type: ActionTypes.CAPITAL_LETTER_ACTION_NAME,
//     };
// };

export type Action = GetDeliveryAndEmbedOptions | SaveDeliveryAndEmbedOptions;
