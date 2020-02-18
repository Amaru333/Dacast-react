import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PaywallSettingsPage } from '../../pages/Paywall/Settings/Settings';
import { getPaywallSettingsInfosAction, Action, savePaywallSettingsInfosAction } from '../../redux-flow/store/Paywall/Settings/actions';
import { PaywallSettingsInfos } from '../../redux-flow/store/Paywall/Settings/types';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PaywallSettingsComponentProps {
    paywallSettingsInfos: PaywallSettingsInfos;
    getPaywallSettingsInfos: Function;
    savePaywallSettingsInfos: Function;
}
const PaywallSettings = (props: PaywallSettingsComponentProps) => {

    React.useEffect(() => {
        if(!props.paywallSettingsInfos) {
            props.getPaywallSettingsInfos();
        }
    }, [])

    return (
        props.paywallSettingsInfos ?
            <PaywallSettingsPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='large' color='coral' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        paywallSettingsInfos: state.paywall.paywallSettings
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaywallSettingsInfos: () => {
            dispatch(getPaywallSettingsInfosAction());
        },
        savePaywallSettingsInfos: (data: PaywallSettingsInfos) => {
            dispatch(savePaywallSettingsInfosAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaywallSettings);