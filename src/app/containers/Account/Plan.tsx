import React from 'react';
import { PlanPage } from '../../pages/Account/Plan/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { saveBillingPagePaymentMethodAction, getBillingPageInfosAction, addBillingPagePaymenPlaybackProtectionAction, editBillingPagePaymenPlaybackProtectionAction, deleteBillingPagePaymenPlaybackProtectionAction, addBillingPageExtrasAction, PlanAction, getProductDetailsAction, purchaseProductsAction } from '../../redux-flow/store/Account/Plan/actions';
import { connect } from 'react-redux';
import { CreditCardPayment, PaypalPayment, BillingPageInfos, PlaybackProtection, Extras, Products } from '../../redux-flow/store/Account/Plan/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { DashboardInfos, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';

interface PlanContainerProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos
    getWidgetData: Function;
    getBillingPageInfos: Function;
    saveBillingPagePaymentMethod: Function;
    addBillingPagePaymenPlaybackProtection: Function;
    editBillingPagePaymenPlaybackProtection: Function;
    deleteBillingPagePaymenPlaybackProtection: Function;
    addBillingPageExtras: Function;
    getProductDetails: Function;
    purchaseProducts: Function;
}
const Plan = (props: PlanContainerProps) => {

    React.useEffect(() => {
        if(!props.billingInfos) {
            props.getBillingPageInfos();
        }
        if(!props.widgetData) {
            props.getWidgetData();
        }
        if(!props.billingInfos.products) {
            props.getProductDetails();
        }
    }, [])

    return (
        props.billingInfos && props.widgetData && props.billingInfos.products ?
            <PlanPage plan={props.widgetData.isPayingPlan} {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        billingInfos: state.account.plan,
        widgetData: state.dashboard.data
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlanAction>) {
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
        getWidgetData: () => {
            dispatch(getDashboardDetailsAction());
        },
        getProductDetails: () => {
            dispatch(getProductDetailsAction());
        },
        purchaseProducts: async (data: Extras, recurlyToken: string, token3Ds?: string, callback?: Function, fallback?: Function) => {
            await dispatch(purchaseProductsAction(data, recurlyToken, token3Ds, callback, fallback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan); 