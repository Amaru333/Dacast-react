import React from 'react' 
import { AccountsPage } from '../../pages/Accounts/Accounts'
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getAccountsAction} from '../../redux-flow/store/Accounts/List/actions';
import { Account } from '../../redux-flow/store/Accounts/List/types'

export interface AccountsComponentProps {
    accounts: {users: Account[]; total: number} | false;
    getAccounts: (qs: string) => Promise<void>;
}

const Accounts = (props: AccountsComponentProps) => {
    return <AccountsPage {...props} />
}

export function mapStateToProps(state: AdminState) {
    return {
        accounts: state.accounts.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccounts: async (qs: string) => {
            await dispatch(getAccountsAction(qs));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)