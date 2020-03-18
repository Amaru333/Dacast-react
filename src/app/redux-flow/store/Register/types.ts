import { combineReducers, Reducer } from 'redux';
import { LoginReducer, TokenInfos } from './Login';
import { UserInfo } from './SignUp/types';
import { SignupReducer } from './SignUp/reducer'
import { ConfirmEmailInfo } from './ConfirmEmail/types';
import { ConfirmEmailReducer } from './ConfirmEmail/reducer';
import { ResetPasswordInfo } from './ResetPassword/types';
import { ResetPasswordReducer } from './ResetPassword/reducer';


export const RegisterInitialState: RegisterState = {
    login: false,
    signup: false,
    confirmEmail: false,
    resetPassword: false
}

export interface RegisterState {
    login: false | TokenInfos;
    signup: false | UserInfo;
    confirmEmail: false | ConfirmEmailInfo;
    resetPassword: false | ResetPasswordInfo;

}

export const RegisterReducer: Reducer<RegisterState> = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    confirmEmail: ConfirmEmailReducer,
    resetPassword: ResetPasswordReducer
})