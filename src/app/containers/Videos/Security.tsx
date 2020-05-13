import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getVodSecuritySettingsAction, saveVodSecuritySettingsAction } from '../../redux-flow/store/VOD/Security/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';
import { ContentSecuritySettings, SecuritySettings } from '../../redux-flow/store/Settings/Security/types';

interface VodSecurityContainerProps {
    vodSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getVodSecuritySettings: Function;
    saveVodSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
}

export const VodSecurity = (props: VodSecurityContainerProps) => {

    let { vodId } = useParams()
    
    React.useEffect(() => {
        if(!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions();
        }
        props.getVodSecuritySettings(vodId);
    }, [])

    return (
        props.vodSecuritySettings && props.globalSecuritySettings ? 
            <div className='flex flex-column'>
                <VideoTabs videoId={vodId} />
                <ContentSecurityPage 
                    contentSecuritySettings={props.vodSecuritySettings} 
                    contentId={vodId}
                    globalSecuritySettings={props.globalSecuritySettings}
                    saveContentSecuritySettings={props.saveVodSecuritySettings}
                    getSettingsSecurityOptions={props.getSettingsSecurityOptions}
                />
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
        saveVodSecuritySettings: (data: SecuritySettings, vodId: string) => {
            dispatch(saveVodSecuritySettingsAction(data, vodId));
        },
        getSettingsSecurityOptions: () => {
            dispatch(getSettingsSecurityOptionsAction());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodSecurity);