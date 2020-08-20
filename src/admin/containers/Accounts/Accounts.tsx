import React from 'react' 
import { AccountsPage } from '../../pages/Accounts/Accounts'
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getAccountsAction} from '../../redux-flow/store/Accounts/List/actions';
import { Account } from '../../redux-flow/store/Accounts/List/types'
import { useQuery } from '../../../utils/utils';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface AccountsComponentProps {
    accounts: {users: Account[]; total: number} | false;
    getAccounts: (accountId: string, qs: string) => Promise<void>;
}

const Accounts = (props: AccountsComponentProps) => {

    let query = useQuery()

    React.useEffect(() => {
        if (query.get('accountId')) {
            props.getAccounts(query.get('accountId'), null)
        }else if(!props.accounts) {
            props.getAccounts(null, null)
        }
    }, [])

    return (
        props.accounts ? 
        <AccountsPage {...props} />
        : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>

    )
}

export function mapStateToProps(state: AdminState) {
    return {
        accounts: state.accounts.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccounts: async (accountId: string, qs: string) => {
            await dispatch(getAccountsAction(accountId, qs));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)