import { ActionTypes, DeliveryAndEmbedOptionType } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "..";
import { SettingsServices } from './services';
import { showToastNotification } from '../toasts';

export interface getDeliveryAndEmbedOptions {
    type: ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS;
    payload: DeliveryAndEmbedOptionType;
}

//Exemple of Async Action
export const getDeliveryAndEmbedOptionsAction = (): ThunkDispatch<Promise<void>, {}, getDeliveryAndEmbedOptions> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, getDeliveryAndEmbedOptions> ) => {
        await SettingsServices.getDeliveryAndEmbedOptionsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS, payload: response.data} );
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

export type Action = getDeliveryAndEmbedOptions;
