import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoginPage } from '../../../pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions';
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';
import { useHistory } from 'react-router-dom'
import { confirmEmailAction } from '../../../redux-flow/store/Register/ConfirmEmail/actions';
import { userToken } from '../../../utils/token';

export interface LoginComponentProps {
    login: Function;
    loginInfos: TokenInfos;
    confirmEmail: Function;
}
const Login = (props: LoginComponentProps) => {

    let history = useHistory()

    React.useEffect(() => {
        if(props.loginInfos && props.loginInfos.token && props.loginInfos.token.length > 0) {
            
            userToken.addTokenInfo(props.loginInfos);
            history.push('/dashboard');
        }
    }, [props.loginInfos])

    const  loginUser = async (username: string, password: string, callback: Function) => {
        await props.login({email: username, password: password}, callback)
    }

    return (
        <LoginPage {...props} login={loginUser} /> 
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        loginInfos: state.register.login,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        login: (data: LoginInfos, callback: Function) => {
            dispatch(loginAction(data)).then(callback) ;
        },
        confirmEmail: (email: string) => {
            dispatch(confirmEmailAction(email));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);