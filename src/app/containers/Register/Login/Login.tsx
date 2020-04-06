import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoginPage } from '../../../pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions';
import { addToken } from '../../../utils/token';
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';
import { useHistory } from 'react-router-dom'

export interface LoginComponentProps {
    login: Function;
    loginInfos: TokenInfos;
}
const Login = (props: LoginComponentProps) => {

    let history = useHistory()

    React.useEffect(() => {
        if(props.loginInfos && props.loginInfos.token && props.loginInfos.token.length > 0) {
            
            addToken(props.loginInfos);
            history.push('/dashboard');
        }
    }, [props.loginInfos])

    const  loginUser = async (username: string, password: string) => {
        await props.login({email: username, password: password})
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
        login: (data: LoginInfos) => {
            dispatch(loginAction(data));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);