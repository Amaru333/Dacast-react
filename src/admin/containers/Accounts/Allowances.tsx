import React from 'react' 
import { AccountAllowancesPage } from '../../pages/Accounts/Allowances'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getAccountAllowancesAction, saveAccountAllowancesAction } from '../../redux-flow/store/Accounts/Allowances/actions';
import { Allowances, PutAllowances } from '../../redux-flow/store/Accounts/Allowances/types';
import { useParams } from 'react-router-dom';
import { PutAccountInfo } from '../../redux-flow/store/Accounts/EditAccount/types';

export interface AccountAllowancesComponentProps {
    accountAllowances: Allowances;
    getAccountAllowances: (accountId: string) => Promise<void>;
    saveAccountAllowances: (accountInfo: PutAllowances, accountId: string) => Promise<void>;
}

const AccountAllowances = (props: AccountAllowancesComponentProps) => {

    let { accountId } = useParams()

    React.useEffect(() => {
        props.getAccountAllowances(accountId)

    }, [])

    return (
        <AccountAllowancesPage {...props} accountId={accountId} />
    )
}

export function mapStateToProps(state: AdminState) {
    return {
        accountAllowances: state.accounts.allowances
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccountAllowances: async (accountId: string) => {
            await dispatch(getAccountAllowancesAction(accountId));
        },
        saveAccountAllowances: async (accountInfo: PutAllowances, accountId: string) => {
            await dispatch(saveAccountAllowancesAction(accountInfo, accountId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAllowances)