import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { Action, getPayoutInfosAction, addPaymentMethodRequestAction, deletePaymentMethodRequestAction, addWithdrawalRequestAction } from '../../redux-flow/store/Paywall/Payout/actions'
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PayoutInfos, PaymentMethodRequest, WithdrawalRequest } from '../../redux-flow/store/Paywall/Payout';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface PayoutComponentProps {
    payoutInfos: PayoutInfos;
    getPayoutInfos: Function;
    addPaymentMethodRequest: Function;
    deletePaymentMethodRequest: Function;
    addWithdrawalRequest: Function;
}


const Payout = (props: PayoutComponentProps) => {

    React.useEffect(() => {
        if(!props.payoutInfos) {
            props.getPayoutInfos();
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
        getPayoutInfos: () => {
            dispatch(getPayoutInfosAction());
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);