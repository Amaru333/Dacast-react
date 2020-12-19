import React from 'react'
import { AccountLogsPage } from '../../pages/Accounts/Logs'
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { getAccountLogsAction, Action } from '../../redux-flow/store/Accounts/AccountLogs/actions';
import { Logs } from '../../redux-flow/store/Accounts/AccountLogs/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';

export interface AccountLogsComponentProps {
    accountLogs: Logs[] | false;
    getAccountLogs: Function;
}

const AccountLogs = (props: AccountLogsComponentProps) => {

    let { accountId } = useParams<{accountId: string}>()
    
    React.useEffect(() => {
        if(!props.accountLogs) {
            props.getAccountLogs(accountId)
        }
    }, [])

    return props.accountLogs ?
        <AccountLogsPage {...props} />
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}

export function mapStateToProps(state: AdminState) {
    return {
        accountLogs: state.accounts.logs
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccountLogs: (accountId: string) => {
            dispatch(getAccountLogsAction(accountId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountLogs)