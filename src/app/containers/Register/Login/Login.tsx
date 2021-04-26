import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../../redux-flow/store";
import { LoginPage } from '../../../pages/Register/Login/Login';
import { loginAction, Action } from '../../../redux-flow/store/Register/Login/actions';
import { LoginInfos, TokenInfos } from '../../../redux-flow/store/Register/Login';
import { confirmEmailAction } from '../../../redux-flow/store/Register/ConfirmEmail/actions';
import { userToken } from '../../../utils/services/token/tokenService';
import { segmentService } from '../../../utils/services/segment/segmentService';
import EventHooker from '../../../../utils/services/event/eventHooker';
import { useHistory } from 'react-router';

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
            segmentService.identify({
                userId: userToken.getUserInfoItem('user-id'),
                firstName: userToken.getUserInfoItem('custom:first_name'),
                lastName: userToken.getUserInfoItem('custom:last_name'),
                email: userToken.getUserInfoItem('email'),
                company: userToken.getUserInfoItem('custom:website')
            })
            setTimeout(() => {
                EventHooker.dispatch('EVENT_LOG_IN_SUCCESS')
            }, 1500)
            history.push('/')
        }

        if(props.loginInfos && props.loginInfos.loginToken) {
            history.push('/selectAccount?email=' + props.loginInfos.email)
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
