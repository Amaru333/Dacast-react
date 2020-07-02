import React from 'react';
import { BillingPage } from '../../pages/Account/Billing/Billing';
import { BillingPageInfos, getBillingPageInfosAction, saveBillingPagePaymentMethodAction, PlanAction, CreditCardPayment, PaypalPayment } from '../../redux-flow/store/Account/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

export interface BillingContainerProps {
    billingInfos: BillingPageInfos;
    saveBillingPagePaymentMethod: Function;
}

export const Billing = (props: BillingContainerProps) => {
    return (
        <BillingPage {...props} />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        billingInfos: state.account.plan
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlanAction>) {
    return {
        getBillingPageInfos: () => {
            dispatch(getBillingPageInfosAction());
        },
        saveBillingPagePaymentMethod: (data: CreditCardPayment | PaypalPayment) => {
            dispatch(saveBillingPagePaymentMethodAction(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing); 