import React from 'react'
import { WithdrawalsPage } from '../../pages/Withdrawals/Withdrawals'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getWithdrawalsAction, Action } from '../../redux-flow/store/Withdrawals/List/actions';
import { WithdrawalsList } from '../../redux-flow/store/Withdrawals/List/types';

export interface WithdrawalsComponentsProps {
    withdrawals: WithdrawalsList | false;
    getWithdrawals: (qs: string) => Promise<void>;
}

const Withdrawals = (props: WithdrawalsComponentsProps) => {
    
    return <WithdrawalsPage {...props} />
}

export function mapStateToProps(state: AdminState) {
    return {
        withdrawals: state.withdrawals.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getWithdrawals: async (qs: string) => {
            await dispatch(getWithdrawalsAction(qs));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawals)