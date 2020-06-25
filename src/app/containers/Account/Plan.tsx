import React from 'react';
import { PlanPage } from '../../pages/Account/Plan/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { saveBillingPagePaymentMethodAction, getBillingPageInfosAction, addBillingPagePaymenPlaybackProtectionAction, editBillingPagePaymenPlaybackProtectionAction, deleteBillingPagePaymenPlaybackProtectionAction, addBillingPageExtrasAction } from '../../redux-flow/store/Account/Plan/actions';
import { connect } from 'react-redux';
import { CreditCardPayment, PaypalPayment, BillingPageInfos, PlaybackProtection, Extras } from '../../redux-flow/store/Account/Plan/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface PlanContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: Function;
    saveBillingPagePaymentMethod: Function;
    addBillingPagePaymenPlaybackProtection: Function;
    editBillingPagePaymenPlaybackProtection: Function;
    deleteBillingPagePaymenPlaybackProtection: Function;
    addBillingPageExtras: Function;
}
const Plan = (props: PlanContainerProps) => {

    React.useEffect(() => {
        if(!props.billingInfos) {
            props.getBillingPageInfos();
        }
    }, [])
    return (
        props.billingInfos ?
            <PlanPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        billingInfos: state.account.plan
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

export default connect(mapStateToProps, mapDispatchToProps)(Plan); 