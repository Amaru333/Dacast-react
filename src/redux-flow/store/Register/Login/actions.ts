import { ActionTypes, LoginInfos, TokenInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { loginService } from './services';
import { showToastNotification } from '../../Toasts';

export interface Login {
    type: ActionTypes.LOGIN;
    payload: TokenInfos;
}

export const loginAction = (data: LoginInfos): ThunkDispatch<Promise<void>, {}, Login> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, Login> ) => {
        await loginService(data)
            .then( response => {
                dispatch( {type: ActionTypes.LOGIN, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };

}

export type Action = Login;