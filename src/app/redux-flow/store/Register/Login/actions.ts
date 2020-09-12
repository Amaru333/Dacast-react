import { ActionTypes, LoginInfos, TokenInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { loginService } from './services';
import { showToastNotification } from '../../Toasts';

export interface Login {
    type: ActionTypes.LOGIN;
    payload: {data: TokenInfos} | false;
}

export interface LoginRequest {
    type: ActionTypes.LOGIN_REQUEST;
    payload: null;
}

export interface LoginError {
    type: ActionTypes.LOGIN_ERROR;
    payload: null;
}


export const loginAction = (data: LoginInfos): ThunkDispatch<Promise<void>, {}, Login> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, Login | LoginError> ) => {
        await loginService(data)
            .then( response => {
                dispatch( {type: ActionTypes.LOGIN, payload: response.data} );
            }).catch(() => {
                dispatch({type: ActionTypes.LOGIN_ERROR, payload: null});
            })
    };

}

export type Action = Login | LoginRequest | LoginError;