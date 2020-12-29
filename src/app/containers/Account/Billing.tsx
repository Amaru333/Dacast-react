import React from 'react';
import { BillingPage } from '../../pages/Account/Billing/Billing';
import { BillingPageInfos, getBillingPageInfosAction, saveBillingPagePaymentMethodAction, PlanAction } from '../../redux-flow/store/Account/Plan';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface BillingContainerProps {
    billingInfos: BillingPageInfos;
    getBillingPageInfos: () => Promise<void>
    saveBillingPagePaymentMethod: (data: string) => Promise<void>;
}

const Billing = (props: BillingContainerProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getBillingPageInfos()
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
    return <BillingPage {...props} />
        
}

export function mapStateToProps( state: ApplicationState) {
    return {
        billingInfos: state.account.plan
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, PlanAction>) {
    return {
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
        saveBillingPagePaymentMethod: async (data: string) => {
            await dispatch(saveBillingPagePaymentMethodAction(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing); 