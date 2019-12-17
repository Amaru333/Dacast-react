import React from 'react';
import { BillingPage } from '../../components/Pages/Account/Billing/Billing';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { BillingAction, saveBillingPagePaymentMethodAction, getBillingPageInfosAction } from '../../redux-flow/store/Account/Billing/actions';
import { connect } from 'react-redux';
import { CreditCardPayment, PaypalPayment, BillingPageInfos } from '../../redux-flow/store/Account/Billing/types';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface BillingContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: Function;
    saveBillingPagePaymentMethod: Function;
}
const Billing = (props: BillingContainerProps) => {

    React.useEffect(() => {
        if(!props.billingInfos) {
            props.getBillingPageInfos();
        }
    }, [])
    return (
        props.billingInfos ?
        <BillingPage {...props} />
        : <LoadingSpinner size='large' color='coral' />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        billingInfos: state.account.billing
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, BillingAction>) {
    return {
        getBillingPageInfos: () => {
            dispatch(getBillingPageInfosAction());
        },
        saveBillingPagePaymentMethod: (data: CreditCardPayment | PaypalPayment) => {
            dispatch(saveBillingPagePaymentMethodAction(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing); 