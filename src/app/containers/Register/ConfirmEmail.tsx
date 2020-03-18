import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, confirmEmailAction } from '../../redux-flow/store/Register/ConfirmEmail/actions';
import { connect } from 'react-redux';
import { ConfirmEmailPage } from '../../pages/Register/ConfirmEmail/ConfirmEmail';
import { ConfirmEmailInfo } from '../../redux-flow/store/Register/ConfirmEmail/types';
import { UserInfo } from '../../redux-flow/store/Register/SignUp/types';

export interface ConfirmEmailComponentProps {
    confirmEmail: Function;
    userInfos?: UserInfo;
    email?: string;
}

const ConfirmEmail = (props: ConfirmEmailComponentProps) => {
    let email: string = null
    React.useEffect(() => {
        if(props.userInfos) {
            email = props.userInfos.email
        }
    }, [])
    return(
        <ConfirmEmailPage {...props} email={email} />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        userInfos: state.register.signup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        confirmEmail: (email: string) => {
            dispatch(confirmEmailAction(email));
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);