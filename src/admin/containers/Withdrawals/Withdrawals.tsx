import React from 'react'
import { WithdrawalsPage } from '../../pages/Withdrawals/Withdrawals'
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getWithdrawalsAction, Action } from '../../redux-flow/store/Withdrawals/List/actions';
import { WithdrawalsList } from '../../redux-flow/store/Withdrawals/List/types';
import { useQuery } from '../../../utils/utils';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface WithdrawalsComponentsProps {
    withdrawals: WithdrawalsList | false;
    getWithdrawals: (qs: string) => Promise<void>;
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
        props.withdrawals ? 
        <WithdrawalsPage {...props} />
        : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>

    )
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