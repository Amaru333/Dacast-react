import { ActionTypes, TokenInfos } from "./types";
import { applyViewModel } from "../../../../utils/utils";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatPostLoginInput, formatPostLoginOutput } from "./viewModel";

export interface Login {
    type: ActionTypes.LOGIN;
    payload: TokenInfos | false;
}

export interface LoginRequest {
    type: ActionTypes.LOGIN_REQUEST;
    payload: null;
}

export interface LoginError {
    type: ActionTypes.LOGIN_ERROR;
    payload: null;
}

export const loginAction = applyViewModel(dacastSdk.postLogin, formatPostLoginInput, formatPostLoginOutput, ActionTypes.LOGIN, null, null)

export type Action = Login | LoginRequest | LoginError;