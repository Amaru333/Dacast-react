import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts/actions';
import { UserInfo, ActionTypes } from './types';
import {signupService, confirmEmail} from './services'
import { ApplicationState } from '../..';


export interface Signup {
    type: ActionTypes.SIGNUP
    payload: UserInfo;
}

export const signupAction = (data: UserInfo): ThunkDispatch<Promise<void>, {}, Signup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, Signup> ) => {
        await signupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SIGNUP, payload: response.data});
                confirmEmail(data.email);
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };

}

export type Action = Signup;