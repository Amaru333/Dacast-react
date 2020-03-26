import { combineReducers, Reducer } from 'redux';
import { LoginReducer, TokenInfos } from './Login';


export const RegisterInitialState: RegisterState = {
    login: false
}

export interface RegisterState {
    login: false | TokenInfos;

}

export const RegisterReducer: Reducer<RegisterState> = combineReducers({
    login: LoginReducer
})