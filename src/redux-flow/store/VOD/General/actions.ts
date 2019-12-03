import { ActionTypes, VodDetails } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { VodGeneralServices } from './services';

export interface GetVodDetails {
    type: ActionTypes.GET_VOD_DETAILS;
    payload: VodDetails;
}

export const getVodDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetVodDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodDetails> ) => {
        await VodGeneralServices.getVodDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_DETAILS, payload: response.data} );
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetVodDetails