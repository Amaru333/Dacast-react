import React from 'react'
import { EditAccountPage } from '../../pages/Accounts/EditAccount'
import { Action, getAccountInfoAction, saveAccountInfoAction } from '../../redux-flow/store/Accounts/EditAccount/actions';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AccountInfo } from '../../redux-flow/store/Accounts/EditAccount/types';
import { useParams } from 'react-router-dom';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface EditAccountComponentProps {
    accountInfo: AccountInfo;
    getAccountInfo: Function;
    saveAccountInfo: Function;
}

const EditAccount = (props: EditAccountComponentProps ) => {

    let { accountId } = useParams()

    React.useEffect(() => {
        if(!props.accountInfo) {
            props.getAccountInfo(accountId)
        }
    })
    return props.accountInfo ?
        <EditAccountPage {...props} />
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}

export function mapStateToProps(state: AdminState) {
    return {
        accountInfo: state.accounts.account
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccountInfo: (accountId: string) => {
            dispatch(getAccountInfoAction(accountId));
        },
        saveAccountInfo: (accountInfo: AccountInfo) => {
            dispatch(saveAccountInfoAction(accountInfo))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)

