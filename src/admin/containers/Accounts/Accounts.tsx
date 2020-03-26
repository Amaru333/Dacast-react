import React from 'react' 
import { AccountsPage } from '../../pages/Accounts/Accounts'
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getAccountsAction} from '../../redux-flow/store/Accounts/List/actions';
import { Account } from '../../redux-flow/store/Accounts/List/types'
import { useQuery } from '../../utils/utils';

export interface AccountsComponentProps {
    accounts: Account[] | false;
    getAccounts: (accountId: string) => void;
}

const Accounts = (props: AccountsComponentProps) => {

    let query = useQuery()

    React.useEffect(() => {
        if (query.get('accountId')) {
            props.getAccounts(query.get('accountId'))
        }else if(!props.accounts) {
            props.getAccounts(null)
        }
    }, [])

    return (
        <AccountsPage {...props} />
    )
}

export function mapStateToProps(state: AdminState) {
    return {
        accounts: state.accounts.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccounts: (accountId: string) => {
            dispatch(getAccountsAction(accountId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)