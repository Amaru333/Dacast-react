import React from 'react' 
import { AccountAllowancesPage } from '../../pages/Accounts/Allowances'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getAccountAllowancesAction, saveAccountAllowancesAction } from '../../redux-flow/store/Accounts/Allowances/actions';
import { Allowances, PutAllowances } from '../../redux-flow/store/Accounts/Allowances/types';
import { useParams } from 'react-router-dom';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface AccountAllowancesComponentProps {
    accountAllowances: Allowances;
    getAccountAllowances: (accountId: string) => Promise<void>;
    saveAccountAllowances: (accountInfo: PutAllowances, accountId: string) => Promise<void>;
}

const AccountAllowances = (props: AccountAllowancesComponentProps) => {

    let { accountId } = useParams()
    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    React.useEffect(() => {
        props.getAccountAllowances(accountId)
        .then(() => setIsFetching(false))

    }, [])

    return !isFetching ?
        <AccountAllowancesPage {...props} accountId={accountId} />
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
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