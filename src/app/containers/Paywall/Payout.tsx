import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { Action, addPaymentMethodRequestAction, deletePaymentMethodRequestAction, addWithdrawalRequestAction, getPaymentMethodsAction, getWithdrawalRequestsAction } from '../../redux-flow/store/Paywall/Payout/actions'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PayoutInfos, PaymentMethodRequest, WithdrawalRequest } from '../../redux-flow/store/Paywall/Payout';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';


export interface PayoutComponentProps {
    payoutInfos: PayoutInfos;
    getPaymentMethods: Function;
    getWithdrawalRequests: Function;
    addPaymentMethodRequest: Function;
    deletePaymentMethodRequest: Function;
    addWithdrawalRequest: Function;
    showToast: Function;
}


const Payout = (props: PayoutComponentProps) => {

    React.useEffect(() => {
        if(!props.payoutInfos) {
            props.getPaymentMethods()
            props.getWithdrawalRequests()
        }
    }, []) 

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
        getPaymentMethods: () => {
            dispatch(getPaymentMethodsAction());
        },
        getWithdrawalRequests: () => {
            dispatch(getWithdrawalRequestsAction())
        },
        addPaymentMethodRequest: (data: PaymentMethodRequest) => {
            dispatch(addPaymentMethodRequestAction(data));
        },
        deletePaymentMethodRequest: (data: string) => {
            dispatch(deletePaymentMethodRequestAction(data));
        },
        addWithdrawalRequest: (data: WithdrawalRequest) => {
            dispatch(addWithdrawalRequestAction(data));
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);