import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router';
import { VideoTabs } from './VideoTabs';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';
import { ContentSecuritySettings, SecuritySettings, ContentSecuritySettingsState } from '../../redux-flow/store/Settings/Security/types';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { Action, getContentSecuritySettingsAction, saveContentSecuritySettingsAction } from '../../redux-flow/store/Content/Security/actions';

export interface ContentSecurityProps {
    contentType: string
    contentSecuritySettings: ContentSecuritySettings;
    contentSecuritySettingsState: ContentSecuritySettingsState;
    globalSecuritySettings: SecuritySettings;
    getContentSecuritySettings: (contentId: string, contentType: string) => Promise<void>;
    saveContentSecuritySettings: (data: SecuritySettings, contentId: string, contentType: string) => Promise<void>;
    getSettingsSecurityOptions: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

export const VodSecurity = (props: ContentSecurityProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions();
        }
            props.getContentSecuritySettings(vodId, 'vod');
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
               props.contentSecuritySettingsState['vod'] && props.contentSecuritySettingsState['vod'][vodId] && props.globalSecuritySettings ?
                    <div className='flex flex-column'>
                        <ContentSecurityPage
                            contentType="vod"
                            contentSecuritySettings={props.contentSecuritySettingsState['vod'][vodId]}
                            contentId={vodId}
                            globalSecuritySettings={props.globalSecuritySettings}
                            saveContentSecuritySettings={props.saveContentSecuritySettings}
                            getSettingsSecurityOptions={props.getSettingsSecurityOptions}
                            showToast={props.showToast}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentSecuritySettingsState: state.content.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentSecuritySettings: async (contentId: string, contentType: string) => {
            await dispatch(getContentSecuritySettingsAction(contentId, contentType));
        },
        saveContentSecuritySettings: async (data: SecuritySettings, contentId: string, contentType: string) => {
            await dispatch(saveContentSecuritySettingsAction(data, contentId, contentType));
        },
        getSettingsSecurityOptions: async () => {
            await dispatch(getSettingsSecurityOptionsAction());
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodSecurity);