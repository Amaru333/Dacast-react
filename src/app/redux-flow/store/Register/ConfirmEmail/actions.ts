import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { ActionTypes, ConfirmEmailInfo } from './types'
import { showToastNotification } from '../../Toasts/actions';
import { confirmEmail } from './service';

export interface ConfirmEmail {
    type: ActionTypes.SEND_CONFIRM_EMAIL;
    payload: ConfirmEmailInfo;
}

export const confirmEmailAction = (email: string): ThunkDispatch<Promise<void>, {}, ConfirmEmail> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ConfirmEmail> ) => {
        await confirmEmail(email)
            .then( response => {
                dispatch( {type: ActionTypes.SEND_CONFIRM_EMAIL, payload: response.data.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };

}

export type Action = ConfirmEmail