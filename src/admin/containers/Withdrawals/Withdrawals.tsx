import React from 'react'
import { WithdrawalsPage } from '../../pages/Withdrawals/Withdrawals'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getWithdrawalsAction, Action } from '../../redux-flow/store/Withdrawals/List/actions';
import { Withdrawal } from '../../redux-flow/store/Withdrawals/List/types';
import { useQuery } from '../../../utils/utils';

export interface WithdrawalsComponentsProps {
    withdrawals: Withdrawal[] | false;
    getWithdrawals: Function;
}

const Withdrawals = (props: WithdrawalsComponentsProps) => {

    let query = useQuery()

    React.useEffect(() => {
        if (query.get('accountId')) {
            props.getWithdrawals(query.get('accountId'))
        }else if(!props.withdrawals) {
            props.getWithdrawals(null)
        }
    }, [])
    
    return (
        <WithdrawalsPage {...props} />
    )
}

export function mapStateToProps(state: AdminState) {
    return {
        withdrawals: state.withdrawals.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getWithdrawals: (accountId: string) => {
            dispatch(getWithdrawalsAction(accountId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawals)