import React from 'react';
import { LiveSecurityPage } from '../../pages/Live/Security/Security';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, LiveSecuritySettings, SecuritySettings, getLiveSecuritySettingsAction, saveLiveSecuritySettingsAction } from '../../redux-flow/store/Live/Security';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';

interface LiveSecurityProps {
    liveSecuritySettings: LiveSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getLiveSecuritySettings: Function;
    saveLiveSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
}

export const LiveSecurity = (props: LiveSecurityProps) => {

    React.useEffect(() => {
        if(!props.liveSecuritySettings && !props.globalSecuritySettings) {
            props.getLiveSecuritySettings();
            props.getSettingsSecurityOptions();
        }
    }, [])

    return (
        props.liveSecuritySettings && props.globalSecuritySettings ? 
        <LiveSecurityPage {...props} />
        : <LoadingSpinner color='dark-violet' size='large' />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSecurity);