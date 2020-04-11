import React from 'react';
import { SignupPage } from '../../../pages/Register/SignUp/SignUp';
import { UserInfo } from '../../../redux-flow/store/Register/SignUp/types';
import { ApplicationState } from '../../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, signupAction } from '../../../redux-flow/store/Register/SignUp/actions';
import { connect } from 'react-redux';

export interface SignupContainerProps {
    signup: Function;
    UserInfo: UserInfo;
}

export const Signup = (props: SignupContainerProps) => {
    return(
        <SignupPage {...props} />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        UserInfo: state.register.signup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        signup: (data: UserInfo, callback?: Function, fallback?: Function) => {
            dispatch(signupAction(data)).then(callback, fallback);
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);