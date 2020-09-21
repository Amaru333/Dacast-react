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

export interface PaywallSettingsComponentProps {
    paywallSettingsInfos: PaywallSettingsInfos;
    getPaywallSettingsInfos: () => Promise<void>;
    savePaywallSettingsInfos: (data: PaywallSettingsInfos) => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}
const PaywallSettings = (props: PaywallSettingsComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getPaywallSettingsInfos()
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.paywallSettingsInfos ?
            <PaywallSettingsPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
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
            await dispatch(getPaywallSettingsInfosAction())
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