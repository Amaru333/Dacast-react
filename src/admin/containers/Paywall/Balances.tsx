import React from 'react' 
import { connect } from 'react-redux';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useQuery } from '../../../utils/utils';
import { BalancesPage } from '../../pages/Paywall/Balances';
import { getBalancesAction } from '../../redux-flow/store/Paywall/Balances/actions';
import { AccountBalanceInfo } from '../../redux-flow/store/Paywall/Balances/types';

export interface BalancesComponentProps {
    balanceInfo: AccountBalanceInfo | false;
    getBalances: (accountId: string) => Promise<void>;
}

const Balances = (props: BalancesComponentProps) => {

    return <BalancesPage {...props} />
}

export function mapStateToProps(state: AdminState) {
    return {
        balanceInfo: state.paywall.balances
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getBalances: async (accountId: string) => {
            await dispatch(getBalancesAction(accountId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Balances)