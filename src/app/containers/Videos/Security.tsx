import React from 'react';
import { VodSecurityPage } from '../../pages/Videos/Security/Security';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodSecuritySettingsAction, saveVodSecuritySettingsAction } from '../../redux-flow/store/VOD/Security/actions';
import { connect } from 'react-redux';
import { VodSecuritySettings, SecuritySettings } from '../../redux-flow/store/VOD/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface VodSecurityContainerProps {
    vodSecuritySettings: VodSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getVodSecuritySettings: Function;
    saveVodSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
}

export const VodSecurity = (props: VodSecurityContainerProps) => {

    React.useEffect(() => {
        if(!props.vodSecuritySettings ||  (!props.vodSecuritySettings && !props.globalSecuritySettings)) {
            props.getVodSecuritySettings();
            props.getSettingsSecurityOptions();
        }
    }, [])

    return (
        props.vodSecuritySettings && props.globalSecuritySettings ? 
            <VodSecurityPage {...props}/>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        vodSecuritySettings: state.vod.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodSecuritySettings: () => {
            dispatch(getVodSecuritySettingsAction());
        },
        saveVodSecuritySettings: (data: SecuritySettings) => {
            dispatch(saveVodSecuritySettingsAction(data));
        },
        getSettingsSecurityOptions: () => {
            dispatch(getSettingsSecurityOptionsAction());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodSecurity);