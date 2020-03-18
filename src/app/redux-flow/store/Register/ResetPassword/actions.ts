import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { ActionTypes, ResetPasswordInfo } from './types'
import { showToastNotification } from '../../Toasts/actions';
import { resetPassword } from './service';

export interface ResetPassword {
    type: ActionTypes.RESET_PASSWORD;
    payload: ResetPasswordInfo;
}

export const resetPasswordAction = (email: string): ThunkDispatch<Promise<void>, {}, ResetPassword> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ResetPassword> ) => {
        await resetPassword(email)
            .then( response => {
                dispatch( {type: ActionTypes.RESET_PASSWORD, payload: response.data.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };

}

export type Action = ResetPassword