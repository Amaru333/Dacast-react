import React from 'react'
import { ResetPasswordPage } from '../../pages/Register/ResetPassword/ResetPassword'
import { resetPasswordAction, Action } from '../../redux-flow/store/Register/ResetPassword/actions';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

export interface ResetPasswordComponentProps {
    resetPassword: Function;
}

const ResetPassword = (props: ResetPasswordComponentProps) => {

    return <ResetPasswordPage {...props} />
}

export function mapStateToProps( state: ApplicationState) {
    return {
        userInfos: state.register.signup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        resetPassword: (email: string) => {
            dispatch(resetPasswordAction(email));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);