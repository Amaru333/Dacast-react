import React from 'react';
import { VodSecurityPage } from '../../../components/Pages/VOD/Security/Security';
import { ApplicationState } from '../../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodSecuritySettingsAction, saveVodSecuritySettingsAction } from '../../../redux-flow/store/VOD/Security/actions';
import { connect } from 'react-redux';
import { VodSecuritySettings, SecuritySettings } from '../../../redux-flow/store/VOD/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface VodSecurityContainerProps {
    vodSecuritySettings: VodSecuritySettings;
    getVodSecuritySettings: Function
    saveVodSecuritySettings: Function
}

export const VodSecurity = (props: VodSecurityContainerProps) => {

    React.useEffect(() => {
        if(!props.vodSecuritySettings) {
            props.getVodSecuritySettings();
        }
    }, [])

    return (
        props.vodSecuritySettings ? 
            <VodSecurityPage {...props}/>
            : <LoadingSpinner color='dark-violet' size='large' />
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        vodSecuritySettings: state.vod.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodSecuritySettings: () => {
            dispatch(getVodSecuritySettingsAction());
        },
        saveVodSecuritySettings: (data: SecuritySettings) => {
            dispatch(saveVodSecuritySettingsAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodSecurity);