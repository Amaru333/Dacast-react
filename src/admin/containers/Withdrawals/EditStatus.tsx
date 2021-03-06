import React from 'react'
import { EditStatusPage } from '../../pages/Withdrawals/EditStatus'
import { connect } from 'react-redux';
import { getWithdrawalInfoAction, saveWithdrawalStatusAction, Action } from '../../redux-flow/store/Withdrawals/EditStatus/actions';
import { AdminState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { WithdrawalInfo, WithdrawalStatusAdmin } from '../../redux-flow/store/Withdrawals/EditStatus/types';
import { useParams } from 'react-router';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface EditStatusComponentProps {
    withdrawal: WithdrawalInfo;
    getWithdrawals: (withdrawalId: string) => Promise<void>;
    saveWithdrawalStatus: (withdrawalStatus: WithdrawalStatusAdmin, withdrawalId: string) => Promise<void>;
}

const EditStatus = (props: EditStatusComponentProps) => {

    let { withdrawalId } = useParams<{withdrawalId: string}>()
    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    React.useEffect(() => {
        props.getWithdrawals(withdrawalId)
        .then(() => setIsFetching(false))
    }, [])

    return isFetching ? 
        <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
        : <EditStatusPage {...props} withdrawalId={withdrawalId} />
}

export function mapStateToProps(state: AdminState) {
    return {
        withdrawal: state.withdrawals.status
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {
    return {
        getWithdrawals: async (withdrawalId: string) => {
            await dispatch(getWithdrawalInfoAction(withdrawalId));
        },
        saveWithdrawalStatus: async (withdrawalStatus: WithdrawalStatusAdmin, withdrawalId: string) => {
            await dispatch(saveWithdrawalStatusAction(withdrawalStatus, withdrawalId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStatus)