import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PaywallSettingsPage } from '../../pages/Paywall/Settings/Settings';
import { getPaywallSettingsInfosAction, Action, savePaywallSettingsInfosAction } from '../../redux-flow/store/Paywall/Settings/actions';
import { PaywallSettingsInfos } from '../../redux-flow/store/Paywall/Settings/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Privilege } from '../../../utils/services/token/token';
import { userToken } from '../../utils/services/token/tokenService';
import PlanLimitReachedModal from '../../containers/Navigation/PlanLimitReachedModal';

export interface PaywallSettingsComponentProps {
    paywallSettingsInfos: PaywallSettingsInfos;
    associatePrivilege: Privilege;
    getPaywallSettingsInfos: () => Promise<void>;
    savePaywallSettingsInfos: (data: PaywallSettingsInfos) => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}
const PaywallSettings = (props: PaywallSettingsComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [PlanLimitReachedModalOpen, setPlanLimitReachedModalOpen] = React.useState<boolean>(false)

    const isLocked = () => {
        return props.associatePrivilege && !userToken.getPrivilege(props.associatePrivilege)
    }

    React.useEffect(() => {
        if (isLocked()) {
            setPlanLimitReachedModalOpen(true)
        } else {
            props.getPaywallSettingsInfos()
                .catch(() => setNodataFetched(true))
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            {props.paywallSettingsInfos || isLocked() ?
                <PaywallSettingsPage {...props} />
                : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>}
            <PlanLimitReachedModal type='feature_not_included_starter_paywall' toggle={() => setPlanLimitReachedModalOpen(false)} opened={PlanLimitReachedModalOpen === true} allowNavigation={true}/>
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        paywallSettingsInfos: state.paywall.paywallSettings
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaywallSettingsInfos: async () => {
            await dispatch(getPaywallSettingsInfosAction(undefined))
        },
        savePaywallSettingsInfos: async (data: PaywallSettingsInfos) => {
            await dispatch(savePaywallSettingsInfosAction(data))
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaywallSettings);
