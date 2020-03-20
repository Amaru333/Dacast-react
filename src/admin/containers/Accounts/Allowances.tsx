import React from 'react' 
import { AccountAllowancesPage } from '../../pages/Accounts/Allowances'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getAccountAllowancesAction, saveAccountAllowancesAction } from '../../redux-flow/store/Accounts/Allowances/actions';
import { AccountAllowances } from '../../redux-flow/store/Accounts/Allowances/types';
import { useParams } from 'react-router-dom';

export interface AccountAllowancesComponentProps {
    accountAllowances: AccountAllowances;
    getAccountAllowances: Function;
    saveAccountAllowances: Function;
}

const AccountAllowances = (props: AccountAllowancesComponentProps) => {

    let { accountId } = useParams()

    React.useEffect(() => {
        if(!props.accountAllowances) {
            props.getAccountAllowances(accountId)
        }
    }, [])

    return (
        <AccountAllowancesPage {...props} accountId={accountId} />
    )
 }

 export function mapStateToProps(state: AdminState) {
    return {
        accountInfo: state.accounts.account
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getAccountAllowances: (accountId: string) => {
            dispatch(getAccountAllowancesAction(accountId));
        },
        saveAccountAllowances: (accountInfo: {[key: string]: string}, accountId: string) => {
            dispatch(saveAccountAllowancesAction(accountInfo, accountId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAllowances)