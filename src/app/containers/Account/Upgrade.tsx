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
import { CompanyPageInfos, getCompanyPageDetailsAction } from '../../redux-flow/store/Account/Company';
import { userToken } from '../../utils/services/token/tokenService';
import { showToastNotification, hideToast } from '../../redux-flow/store/Toasts';
import { Size, NotificationType, NotificationPosition } from '../../../components/Toast/ToastTypes';

export interface UpgradeContainerProps {
    planDetails: Plans;
    billingInfos: BillingPageInfos;
    companyInfo: CompanyPageInfos;
    getPlanDetails: () => Promise<void>;
    getBillingPageInfos: () => Promise<void>;
    getCompanyInfo: () => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const UpgradeContainer = (props: UpgradeContainerProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(userToken.getPrivilege('privilege-billing')) {
            props.getBillingPageInfos()
                .catch(() => setNodataFetched(true))
        }

        props.getPlanDetails()
            .catch(() => setNodataFetched(true))

        if(!props.companyInfo) {
            props.getCompanyInfo()
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.planDetails ?
            <UpgradePage planDetails={props.planDetails} billingInfos={props.billingInfos} {...props}/>
            :
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        planDetails: state.account.upgrade,
        billingInfos: state.account.plan,
        companyInfo: state.account.company
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, UpgradeAction>) {
    return {
        getPlanDetails: async () => {
            await dispatch(getPlanDetailsAction(undefined))
        },
        getBillingPageInfos: async () => {
            await dispatch(getBillingPageInfosAction(undefined));
        },
        getCompanyInfo: async () => {
            await dispatch(getCompanyPageDetailsAction(undefined))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType, permanent?: boolean, position?: NotificationPosition) => {
            return dispatch(showToastNotification(text, size, notificationType, permanent, position))
        },
        hideToast: (toast: ToastType) => {
            return dispatch(hideToast(toast))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UpgradeContainer);
