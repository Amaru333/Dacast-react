import React from 'react';
import { BillingPage } from '../../pages/Account/Billing/Billing';
import { BillingPageInfos, getBillingPageInfosAction, saveBillingPagePaymentMethodAction, PlanAction, CreditCardPayment, PaypalPayment } from '../../redux-flow/store/Account/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface BillingContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: Function;
    saveBillingPagePaymentMethod: Function;
}

const Billing = (props: BillingContainerProps) => {

    React.useEffect(() => {
        props.getBillingPageInfos();
    }, [props.billingInfos.paymentMethod])

    return (
        props.billingInfos ? 
        <BillingPage {...props} />
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
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