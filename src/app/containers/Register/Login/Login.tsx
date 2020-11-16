import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoginPage } from '../../../pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions';
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';
import { useHistory } from 'react-router-dom'
import { confirmEmailAction } from '../../../redux-flow/store/Register/ConfirmEmail/actions';
import { userToken } from '../../../utils/services/token/tokenService';

export interface LoginComponentProps {
    login: (data: LoginInfos) => Promise<void>;
    loginInfos: TokenInfos;
    confirmEmail: (email: string) => Promise<void>;
}
const Login = (props: LoginComponentProps) => {

    let history = useHistory()

    React.useEffect(() => {
        if(props.loginInfos && props.loginInfos.token && props.loginInfos.token.length > 0) {  
            userToken.addTokenInfo(props.loginInfos);
            // history.push('/dashboard');
            location.reload()
            window.analytics.identify(userToken.getUserInfoItem('custom:dacast_user_id'), {
                name: userToken.getUserInfoItem('custom:first_name') + ' ' + userToken.getUserInfoItem('custom:last_name'),
                email: userToken.getUserInfoItem('email')
            })
        }
    }, [props.loginInfos])

    return (
        <LoginPage {...props}/> 
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        loginInfos: state.register.login,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        login: async (data: LoginInfos) => {
            await dispatch(loginAction(data));
        },
        confirmEmail: async (email: string) => {
            await dispatch(confirmEmailAction(email));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);