import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, confirmEmailAction } from '../../redux-flow/store/Register/ConfirmEmail/actions';
import { connect } from 'react-redux';
import { ConfirmEmailPage } from '../../pages/Register/ConfirmEmail/ConfirmEmail';
import { ConfirmEmailInfo } from '../../redux-flow/store/Register/ConfirmEmail/types';
import { UserInfo } from '../../redux-flow/store/Register/SignUp/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { useQuery } from '../../../utils/utils';

export interface ConfirmEmailComponentProps {
    userInfos?: UserInfo;
    email?: string;
}

const ConfirmEmail = (props: ConfirmEmailComponentProps) => {
    let email: string = null

    let qs = useQuery()
    React.useEffect(() => {
        if(props.userInfos) {
            console.log('user info', props.userInfos)
            email = props.userInfos.email
        }
        if (qs.get('email')) {
            email = qs.get('email')
        }
    }, [props.userInfos])
    return email ?
        <ConfirmEmailPage {...props} email={email} />
        :<SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
}

export function mapStateToProps( state: ApplicationState) {
    return {
        userInfos: state.register.signup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);