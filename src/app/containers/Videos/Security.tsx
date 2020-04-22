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
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';

interface VodSecurityContainerProps {
    vodSecuritySettings: VodSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getVodSecuritySettings: Function;
    saveVodSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
}

export const VodSecurity = (props: VodSecurityContainerProps) => {

    let { vodId } = useParams()
    
    React.useEffect(() => {
        if(!props.vodSecuritySettings ||  (!props.vodSecuritySettings && !props.globalSecuritySettings)) {
            props.getVodSecuritySettings(vodId);
            props.getSettingsSecurityOptions();
        }
    }, [])

    return (
        props.vodSecuritySettings && props.globalSecuritySettings ? 
            <div className='flex flex-column'>
                <VideoTabs videoId={vodId} />
                <VodSecurityPage {...props} />
            </div>
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
        getVodSecuritySettings: (vodId: string) => {
            dispatch(getVodSecuritySettingsAction(vodId));
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