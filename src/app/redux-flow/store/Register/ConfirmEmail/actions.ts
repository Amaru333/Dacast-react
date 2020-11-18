import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { ActionTypes, ConfirmEmailInfo } from './types'
import { showToastNotification } from '../../Toasts/actions';
import { confirmEmail, resendEmail } from './service';

export interface ConfirmEmail {
    type: ActionTypes.SEND_CONFIRM_EMAIL;
    payload: {data: ConfirmEmailInfo};
}

export interface ResendEmail {
    type: ActionTypes.RESEND_EMAIL;
    payload: {data: ConfirmEmailInfo};
}

export const confirmEmailAction = (email: string): ThunkDispatch<Promise<void>, {}, ConfirmEmail> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ConfirmEmail> ) => {
        await confirmEmail(email)
            .then( response => {
                dispatch( {type: ActionTypes.SEND_CONFIRM_EMAIL, payload: response.data} );
                dispatch(showToastNotification('Your account is now active', 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };

}

export const resendEmailAction = (email: string): ThunkDispatch<Promise<void>, {}, ConfirmEmail> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ConfirmEmail> ) => {
        await resendEmail(email)
            .then( response => {
                dispatch( {type: ActionTypes.SEND_CONFIRM_EMAIL, payload: response.data} );
                dispatch(showToastNotification('Your account is now active', 'fixed', "success"));
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject(error)
            })
    };

}

export type Action = ConfirmEmail | ResendEmail