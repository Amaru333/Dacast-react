import React from 'react'
import { EditAccountPage } from '../../pages/Accounts/EditAccount'
import { Action, getAccountInfoAction, saveAccountInfoAction } from '../../redux-flow/store/Accounts/EditAccount/actions';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PutAccountInfo, AccountInfo } from '../../redux-flow/store/Accounts/EditAccount/types';
import { useParams } from 'react-router-dom';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface EditAccountComponentProps {
    accountInfo: AccountInfo;
    getAccountInfo: (accountId: string) => Promise<void>;
    saveAccountInfo: (accountInfo: PutAccountInfo, accountId: string) => Promise<void>;
}

const EditAccount = (props: EditAccountComponentProps ) => {

    let { accountId } = useParams()

    React.useEffect(() => {
        props.getAccountInfo(accountId)
    }, [])
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
        getAccountInfo: async (accountId: string) => {
            await dispatch(getAccountInfoAction(accountId));
        },
        saveAccountInfo: async (accountInfo: PutAccountInfo, accountId: string) => {
            await dispatch(saveAccountInfoAction(accountInfo, accountId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount)

