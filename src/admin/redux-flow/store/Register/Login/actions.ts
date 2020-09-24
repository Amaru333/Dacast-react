import { ActionTypes, LoginInfos, TokenInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { AdminState } from "../../index";
import { loginService } from './services';
import { adminToken } from '../../../../utils/services/token/tokenService';

export interface Login {
    type: ActionTypes.LOGIN;
    payload: TokenInfos;
}

export interface Logout {
    type: ActionTypes.LOGOUT;
    payload: null;
}

export const loginAction = (data: LoginInfos): ThunkDispatch<Promise<void>, {}, Login> => {
    return async (dispatch: ThunkDispatch<AdminState , {}, Login> ) => {
        await loginService(data)
            .then( response => {
                dispatch( {type: ActionTypes.LOGIN, payload: response.data.data} );
            }).catch(() => {
            })
    };

}

export const LogoutAction = (): ThunkDispatch<void, {}, Logout> =>{
    return (dispatch: ThunkDispatch<AdminState , {}, Logout>) => {
        dispatch({type: ActionTypes.LOGOUT, payload: null})
        adminToken.resetUserInfo()
    }
}

export type Action = Login | Logout;