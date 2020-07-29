import { ThunkDispatch } from 'redux-thunk';
import { showToastNotification } from '../../Toasts/actions';
import { UserInfo, ActionTypes } from './types';
import {signupService} from './services'
import { ApplicationState } from '../..';
import { logAmplitudeEvent } from '../../../../utils/amplitudeService';
import { AxiosError } from 'axios';


export interface Signup {
    type: ActionTypes.SIGNUP;
    payload: UserInfo;
}

export const signupAction = (data: UserInfo): ThunkDispatch<Promise<void>, {}, Signup> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, Signup> ) => {
        await signupService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SIGNUP, payload: {...data}});
                logAmplitudeEvent('create account');
            }).catch((error: AxiosError) => {
                if(error.response.data.error.indexOf('An account with the given email already exists') > -1){
                    dispatch( {type: ActionTypes.SIGNUP, payload: {...data, email: "", signupError: "This email address is already linked to an account"}});
                }
            })
    };

}

export type Action = Signup;