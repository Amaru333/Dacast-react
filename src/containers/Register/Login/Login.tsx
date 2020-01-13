import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoginPage } from '../../../Pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions';
import { addToken } from '../../../utils/token';
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';

interface LoginContainerProps {
    login: Function;
    loginInfos: TokenInfos;
    history: any;
}
const Login = (props: LoginContainerProps) => {

    React.useEffect(() => {}, [props.loginInfos])

    const  loginUser = async (username: string, password: string) => {
        await props.login({username: username, password: password})
        if(props.loginInfos && props.loginInfos.token.length > 0) {
            addToken(props.loginInfos);
            props.history.push('/dashboard');
        }
    }

    return (
        <LoginPage login={loginUser} /> 
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