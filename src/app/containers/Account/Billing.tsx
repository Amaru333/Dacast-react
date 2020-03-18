import React from 'react';
import { BillingPage } from '../../pages/Account/Billing/Billing';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { BillingAction, saveBillingPagePaymentMethodAction, getBillingPageInfosAction, addBillingPagePaymenPlaybackProtectionAction, editBillingPagePaymenPlaybackProtectionAction, deleteBillingPagePaymenPlaybackProtectionAction, addBillingPageExtrasAction } from '../../redux-flow/store/Account/Billing/actions';
import { connect } from 'react-redux';
import { CreditCardPayment, PaypalPayment, BillingPageInfos, PlaybackProtection, Extras } from '../../redux-flow/store/Account/Billing/types';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface BillingContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: Function;
    saveBillingPagePaymentMethod: Function;
    addBillingPagePaymenPlaybackProtection: Function;
    editBillingPagePaymenPlaybackProtection: Function;
    deleteBillingPagePaymenPlaybackProtection: Function;
    addBillingPageExtras: Function;
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
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
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
        addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => {
            dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        },
        editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => {
            dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        deleteBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => {
            dispatch(deleteBillingPagePaymenPlaybackProtectionAction(data));
        },
        addBillingPageExtras: (data: Extras) => {
            dispatch(addBillingPageExtrasAction(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing); 