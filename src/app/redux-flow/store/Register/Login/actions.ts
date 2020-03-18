import { ActionTypes, LoginInfos, TokenInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { loginService } from './services';
import { showToastNotification } from '../../Toasts';

export interface Login {
    type: ActionTypes.LOGIN;
    payload: TokenInfos;
}

export interface Logout {
    type: ActionTypes.LOGOUT;
    payload: null;
}

export const loginAction = (data: LoginInfos): ThunkDispatch<Promise<void>, {}, Login> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, Login> ) => {
        await loginService(data)
            .then( response => {
                dispatch( {type: ActionTypes.LOGIN, payload: response.data.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };

}

export const LogoutAction = (): ThunkDispatch<void, {}, Logout> =>{
    return (dispatch: ThunkDispatch<ApplicationState , {}, Logout>) => {
        dispatch({type: ActionTypes.LOGOUT, payload: null})
    }
}

export type Action = Login | Logout;