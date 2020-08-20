import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AdminState } from "../../redux-flow/store";
import { LoginPage } from '../../pages/Register/Login';
import { loginAction, Action } from '../../redux-flow/store/Register/Login/actions';
import { adminToken } from '../../utils/token';
import { LoginInfos, TokenInfos } from '../../redux-flow/store/Register/Login';
import { useHistory } from 'react-router-dom'

interface LoginContainerProps {
    login: (loginInfo: LoginInfos) => Promise<void>;
    loginInfos: TokenInfos;
}
const Login = (props: LoginContainerProps) => {

    let history = useHistory()

    React.useEffect(() => {
        if(props.loginInfos && props.loginInfos.token && props.loginInfos.token.length > 0) {
            adminToken.addTokenInfo(props.loginInfos)
            history.push('/accounts');
        }
    }, [props.loginInfos])

    const  loginUser = async (username: string, password: string) => {
        await props.login({email: username, password: password})
    }

    return (
        <LoginPage login={loginUser} /> 
    )
}

export function mapStateToProps( state: AdminState) {
    return {
        loginInfos: state.register.login,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        login: async (data: LoginInfos) => {
            await dispatch(loginAction(data));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);