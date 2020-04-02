import React from 'react'
import { ForgotPasswordPage } from '../../pages/Register/ResetPassword/ForgotPassword'
import { forgotPasswordAction, Action } from '../../redux-flow/store/Register/ResetPassword/actions';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

export interface ForgotPasswordComponentProps {
    forgotPassword: Function;
}

const ForgotPassword = (props: ForgotPasswordComponentProps) => {

    return <ForgotPasswordPage {...props} />
}

export function mapStateToProps( state: ApplicationState) {
    return {
        userInfos: state.register.signup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        forgotPassword: (email: string) => {
            dispatch(forgotPasswordAction(email));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);