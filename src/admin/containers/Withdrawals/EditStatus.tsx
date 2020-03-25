import React from 'react'
import { EditStatusPage } from '../../pages/Withdrawals/EditStatus'
import { connect } from 'react-redux';
import { getWithdrawalInfoAction, saveWithdrawalStatusAction, Action } from '../../redux-flow/store/Withdrawals/EditStatus/actions';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { WithdrawalInfo } from '../../redux-flow/store/Withdrawals/EditStatus/types';
import { useParams } from 'react-router';

export interface EditStatusComponentProps {
    withdrawal: WithdrawalInfo;
    getWithdrawals: Function;
    saveWithdrawalStatus: Function;
}

const EditStatus = (props: EditStatusComponentProps) => {

    let {withdrawalId} = useParams()

    React.useEffect(() => {
        if(!props.withdrawal) {
            props.getWithdrawals(withdrawalId)
        }
    }, [])

    return (
        <EditStatusPage {...props} withdrawalId={withdrawalId} />
    )
}

export function mapStateToProps(state: AdminState) {
    return {
        withdrawal: state.withdrawals.status
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getWithdrawals: (withdrawalId: string) => {
            dispatch(getWithdrawalInfoAction(withdrawalId));
        },
        saveWithdrawalStatus: (withdrawalId: string, withdrawalStatus: string) => {
            dispatch(saveWithdrawalStatusAction(withdrawalId, withdrawalStatus));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStatus)