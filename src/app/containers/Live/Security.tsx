import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveSecuritySettingsAction, saveLiveSecuritySettingsAction } from '../../redux-flow/store/Live/Security';
import { getSettingsSecurityOptionsAction, ContentSecuritySettings, SecuritySettings, ContentSecuritySettingsState } from '../../redux-flow/store/Settings/Security';
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
    liveSecuritySettingsState: ContentSecuritySettingsState;
    globalSecuritySettings: SecuritySettings;
    getLiveSecuritySettings: (liveId: string) => Promise<void>;
    saveLiveSecuritySettings: (data: SecuritySettings, liveId: string) => Promise<void>;
    getSettingsSecurityOptions: () => Promise<void>;
    showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const LiveSecurity = (props: LiveSecurityProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions();
        }
        if (!props.liveSecuritySettingsState[liveId]) {
            props.getLiveSecuritySettings(liveId);
        }

    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.liveSecuritySettingsState[liveId] && props.globalSecuritySettings ?
                    <div className='flex flex-column'>
                        <ContentSecurityPage
                            contentSecuritySettings={props.liveSecuritySettingsState[liveId]}
                            contentId={liveId}
                            globalSecuritySettings={props.globalSecuritySettings}
                            saveContentSecuritySettings={props.saveLiveSecuritySettings}
                            getSettingsSecurityOptions={props.getSettingsSecurityOptions}
                            showToast={props.showDiscardToast}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps( state: ApplicationState ) {
    return {
        liveSecuritySettingsState: state.live.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveSecuritySettings: async (liveId: string) => {
            await dispatch(getLiveSecuritySettingsAction(liveId));
        },
        saveLiveSecuritySettings: async (data: SecuritySettings, liveId: string) => {
            await dispatch(saveLiveSecuritySettingsAction(data, liveId));
        },
        getSettingsSecurityOptions: async () => {
            await dispatch(getSettingsSecurityOptionsAction());
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSecurity);