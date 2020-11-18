import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, confirmEmailAction, resendEmailAction } from '../../redux-flow/store/Register/ConfirmEmail/actions';
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
    resendEmail: (email: string) => Promise<void>;
}

const ConfirmEmail = (props: ConfirmEmailComponentProps) => {
    const  [email, setEmail] = React.useState<string>(null)

    let qs = useQuery()
    React.useEffect(() => {
        if(props.userInfos && props.userInfos.email) {
            setEmail(props.userInfos.email)
        }
        if (qs.get('email')) {
            setEmail(qs.get('email'))
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
        resendEmail: async (email: string) => {
            await dispatch(resendEmailAction(email));
        }, 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);