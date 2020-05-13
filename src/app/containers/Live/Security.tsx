import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveSecuritySettingsAction, saveLiveSecuritySettingsAction } from '../../redux-flow/store/Live/Security';
import { getSettingsSecurityOptionsAction, ContentSecuritySettings, SecuritySettings } from '../../redux-flow/store/Settings/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { LiveTabs } from './LiveTabs';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';

interface LiveSecurityProps {
    liveSecuritySettings: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getLiveSecuritySettings: Function;
    saveLiveSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
    showDiscardToast: Function;
}

const LiveSecurity = (props: LiveSecurityProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if(!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions();
        }
        props.getLiveSecuritySettings(liveId);

    }, [])

    return (
        props.liveSecuritySettings && props.globalSecuritySettings ? 
            <div className='flex flex-column'>
                <LiveTabs liveId={liveId} />
                <ContentSecurityPage 
                    contentSecuritySettings={props.liveSecuritySettings} 
                    contentId={liveId}
                    globalSecuritySettings={props.globalSecuritySettings}
                    saveContentSecuritySettings={props.saveLiveSecuritySettings}
                    getSettingsSecurityOptions={props.getSettingsSecurityOptions}
                />
            </div>            
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
        getLiveSecuritySettings: (liveId: string) => {
            dispatch(getLiveSecuritySettingsAction(liveId));
        },
        saveLiveSecuritySettings: (data: SecuritySettings, liveId: string) => {
            dispatch(saveLiveSecuritySettingsAction(data, liveId));
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