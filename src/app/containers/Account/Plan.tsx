import React from 'react';
import { PlanPage } from '../../pages/Account/Plan/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { saveBillingPagePaymentMethodAction, getBillingPageInfosAction, addBillingPagePaymenPlaybackProtectionAction, editBillingPagePaymenPlaybackProtectionAction, deleteBillingPagePaymenPlaybackProtectionAction, addBillingPageExtrasAction, PlanAction, getProductDetailsAction, purchaseProductsAction } from '../../redux-flow/store/Account/Plan/actions';
import { connect } from 'react-redux';
import { BillingPageInfos, PlaybackProtection, Extras, Products } from '../../redux-flow/store/Account/Plan/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { DashboardInfos, getDashboardDetailsAction } from '../../redux-flow/store/Dashboard';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

interface PlanContainerProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos
    getWidgetData: () => Promise<void>;
    getBillingPageInfos: () => Promise<void>;
    saveBillingPagePaymentMethod: (data: string) => Promise<void>
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    deleteBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    addBillingPageExtras: (data: Extras) => Promise<void>
    getProductDetails: () => Promise<void>;
    purchaseProducts: (data: Extras, recurlyToken: string, token3Ds?: string) => Promise<void>
}
const Plan = (props: PlanContainerProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getBillingPageInfos()
        .catch(() => setNodataFetched(true))

        props.getWidgetData()
        .catch(() => setNodataFetched(true))

        props.getProductDetails()
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.billingInfos && props.widgetData && props.billingInfos.products ?
            <PlanPage profile={props.widgetData.generalInfos} plan={props.billingInfos.currentPlan} overage={props.billingInfos.playbackProtection} {...props} />
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
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction());
        },
        saveBillingPagePaymentMethod: async (data: string) => {
            await dispatch(saveBillingPagePaymentMethodAction(data));
        },
        addBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
             await dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        },
        editBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
             await dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        deleteBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
             await dispatch(deleteBillingPagePaymenPlaybackProtectionAction(data));
        },
        addBillingPageExtras: async (data: Extras) => {
             await dispatch(addBillingPageExtrasAction(data));
        },
        getWidgetData: async () => {
             await dispatch(getDashboardDetailsAction());
        },
        getProductDetails: async () => {
             await dispatch(getProductDetailsAction());
        },
        purchaseProducts: async (data: Extras, recurlyToken: string, token3Ds?: string) => {
            await dispatch(purchaseProductsAction(data, recurlyToken, token3Ds))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan); 