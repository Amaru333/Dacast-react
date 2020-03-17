import { combineReducers, Reducer } from 'redux';
import { LoginReducer, TokenInfos } from './Login';
import { UserInfo } from './SignUp/types';
import { SignupReducer } from './SignUp/reducer'


export const RegisterInitialState: RegisterState = {
    login: false,
    signup: false
}

export interface RegisterState {
    login: false | TokenInfos;
    signup: false | UserInfo;
}

export const RegisterReducer: Reducer<RegisterState> = combineReducers({
    login: LoginReducer,
    signup: SignupReducer
})