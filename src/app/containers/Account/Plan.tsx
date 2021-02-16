import React from 'react';
import { PlanPage } from '../../pages/Account/Plan/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { getBillingPageInfosAction, addBillingPagePaymenPlaybackProtectionAction, editBillingPagePaymenPlaybackProtectionAction, PlanAction, getProductDetailsAction } from '../../redux-flow/store/Account/Plan/actions';
import { connect } from 'react-redux';
import { BillingPageInfos, PlaybackProtection } from '../../redux-flow/store/Account/Plan/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { DashboardInfos, getDashboardDetailsAction, getDashboardGeneralDetailsAction } from '../../redux-flow/store/Dashboard';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

interface PlanContainerProps {
    billingInfos: BillingPageInfos;
    widgetData: DashboardInfos
    getWidgetData: () => Promise<void>;
    getBillingPageInfos: () => Promise<void>;
    addBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    editBillingPagePaymenPlaybackProtection: (data: PlaybackProtection) => Promise<void>
    getProductDetails: () => Promise<void>;
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
        widgetData: state.dashboard.info
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlanAction>) {
    return {
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
        addBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
             await dispatch(addBillingPagePaymenPlaybackProtectionAction(data));
        },
        editBillingPagePaymenPlaybackProtection: async (data: PlaybackProtection) => {
             await dispatch(editBillingPagePaymenPlaybackProtectionAction(data));
        },
        getWidgetData: async () => {
             await dispatch(getDashboardGeneralDetailsAction(undefined));
        },
        getProductDetails: async () => {
             await dispatch(getProductDetailsAction(undefined));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan); 