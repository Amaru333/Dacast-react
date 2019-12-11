import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { LoginPage } from '../../../components/Pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions'
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';

interface LoginContainerProps {
    login: Function,
    loginInfos: TokenInfos,
    history: any
}
const Login = (props: LoginContainerProps) => {

    return (
        <LoginPage {...props} /> 
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        loginInfos: state.register.login,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        login: (data: LoginInfos) => {
            dispatch(loginAction(data));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);