import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { ActionTypes, ForgotPasswordInfo } from './types'
import { showToastNotification } from '../../Toasts/actions';
import { resetPassword } from './service';

export interface ForgotPassword {
    type: ActionTypes.FORGOT_PASSWORD;
    payload: {data: ForgotPasswordInfo};
}

export const forgotPasswordAction = (email: string): ThunkDispatch<Promise<void>, {}, ForgotPassword> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ForgotPassword> ) => {
        await resetPassword(email)
            .then( response => {
                dispatch( {type: ActionTypes.FORGOT_PASSWORD, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };

}

export type Action = ForgotPassword