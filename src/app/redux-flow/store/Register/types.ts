import { combineReducers, Reducer } from 'redux';
import { LoginReducer, TokenInfos } from './Login';
import { ConfirmEmailInfo } from './ConfirmEmail/types';
import { ConfirmEmailReducer } from './ConfirmEmail/reducer';
import { ForgotPasswordInfo } from './ResetPassword/types';
import { ResetPasswordReducer } from './ResetPassword/reducer';


export const RegisterInitialState: RegisterState = {
    login: false,
    confirmEmail: false,
    resetPassword: false
}

export interface RegisterState {
    login: false | TokenInfos;
    confirmEmail: false | ConfirmEmailInfo;
    resetPassword: false | ForgotPasswordInfo;

}

export const RegisterReducer: Reducer<RegisterState> = combineReducers({
    login: LoginReducer,
    confirmEmail: ConfirmEmailReducer,
    resetPassword: ResetPasswordReducer
})