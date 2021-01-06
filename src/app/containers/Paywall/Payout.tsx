import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { Action, addWithdrawalRequestAction, getPaymentMethodsAction, getWithdrawalRequestsAction, addPaymentMethodAction, updatePaymentMethodAction, deletePaymentMethodAction, cancelWithdrawalRequestAction } from '../../redux-flow/store/Paywall/Payout/actions'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PayoutInfos, WithdrawalRequest, PaymentMethod } from '../../redux-flow/store/Paywall/Payout';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';


export interface PayoutComponentProps {
    payoutInfos: PayoutInfos;
    getPaymentMethods: () => Promise<void>;
    getWithdrawalRequests: () => Promise<void>;
    addPaymentMethod: (data: PaymentMethod) => Promise<void>;
    updatePaymentMethod: (data: PaymentMethod) => Promise<void>;
    deletePaymentMethod: (data: PaymentMethod) => Promise<void>;
    addWithdrawalRequest: (data: WithdrawalRequest) => Promise<void>;
    cancelWithdrawalRequest: (data: WithdrawalRequest) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}


const Payout = (props: PayoutComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getPaymentMethods()
        .catch(() => setNodataFetched(true))

        props.getWithdrawalRequests()
        .catch(() => setNodataFetched(true))

    }, []) 

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.payoutInfos ?
            <PayoutPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        payoutInfos: state.paywall.payout
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaymentMethods: async () => {
            await dispatch(getPaymentMethodsAction(undefined))
        },
        getWithdrawalRequests: async () => {
            await dispatch(getWithdrawalRequestsAction(undefined))
        },
        addPaymentMethod: async (data: PaymentMethod) => {
            await dispatch(addPaymentMethodAction(data));
        },
        updatePaymentMethod: async (data: PaymentMethod) => {
            await dispatch(updatePaymentMethodAction(data));
        },
        deletePaymentMethod: async (data: PaymentMethod) => {
            await dispatch(deletePaymentMethodAction(data));
        },
        addWithdrawalRequest: async (data: WithdrawalRequest) => {
            await dispatch(addWithdrawalRequestAction(data));
        },
        cancelWithdrawalRequest: async (data: WithdrawalRequest) => {
            await dispatch(cancelWithdrawalRequestAction(data));
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);