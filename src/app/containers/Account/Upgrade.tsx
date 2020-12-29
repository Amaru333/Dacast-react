import React from 'react';
import { LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { UpgradePage } from '../../pages/Account/Upgrade/Upgrade';
import { Plans } from '../../redux-flow/store/Account/Upgrade/types';
import { ApplicationState } from '../../redux-flow/store';
import { UpgradeAction, getPlanDetailsAction } from '../../redux-flow/store/Account/Upgrade/actions';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getBillingPageInfosAction } from '../../redux-flow/store/Account/Plan/actions';
import { BillingPageInfos } from '../../redux-flow/store/Account/Plan/types';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';


export interface UpgradeContainerProps {
    planDetails: Plans;
    getPlanDetails: () => Promise<void>;
    billingInfos: BillingPageInfos;
    getBillingPageInfos: () => Promise<void>
}

const UpgradeContainer = (props: UpgradeContainerProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getBillingPageInfos()
        .catch(() => setNodataFetched(true))

        props.getPlanDetails()
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        (props.planDetails && props.billingInfos) ? 
            <UpgradePage planDetails={props.planDetails} billingInfos={props.billingInfos} {...props}/>
            : 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        planDetails: state.account.upgrade,
        billingInfos: state.account.plan
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UpgradeAction>) {
    return {
        getPlanDetails: async () => {
            await dispatch(getPlanDetailsAction(undefined))
        },
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UpgradeContainer);