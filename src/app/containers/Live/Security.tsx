import React from 'react';
import { LiveSecurityPage } from '../../pages/Live/Security/Security';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, LiveSecuritySettings, SecuritySettings, getLiveSecuritySettingsAction, saveLiveSecuritySettingsAction } from '../../redux-flow/store/Live/Security';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

interface LiveSecurityProps {
    liveSecuritySettings: LiveSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getLiveSecuritySettings: Function;
    saveLiveSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
    showDiscardToast: Function;
}

export const LiveSecurity = (props: LiveSecurityProps) => {

    React.useEffect(() => {
        if(!props.liveSecuritySettings || (!props.liveSecuritySettings && !props.globalSecuritySettings)) {
            props.getLiveSecuritySettings();
            props.getSettingsSecurityOptions();
        }
    }, [])

    return (
        props.liveSecuritySettings && props.globalSecuritySettings ? 
            <LiveSecurityPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
    
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        liveSecuritySettings: state.live.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveSecuritySettings: () => {
            dispatch(getLiveSecuritySettingsAction());
        },
        saveLiveSecuritySettings: (data: SecuritySettings) => {
            dispatch(saveLiveSecuritySettingsAction(data));
        },
        getSettingsSecurityOptions: () => {
            dispatch(getSettingsSecurityOptionsAction());
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSecurity);