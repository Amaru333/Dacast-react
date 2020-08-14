import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { getSettingsSecurityOptionsAction, SecuritySettings } from '../../redux-flow/store/Settings/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { LiveTabs } from './LiveTabs';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';
import { ContentSecurityProps } from '../Videos/Security';
import { Action, getContentSecuritySettingsAction, saveContentSecuritySettingsAction } from '../../redux-flow/store/Content/Security/actions';



const LiveSecurity = (props: ContentSecurityProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions();
        }
       
            props.getContentSecuritySettings(liveId, 'live');
        

    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
               props.contentSecuritySettingsState['live'] && props.contentSecuritySettingsState['live'][liveId] && props.globalSecuritySettings ?
                    <div className='flex flex-column'>
                        <ContentSecurityPage
                            contentType="live"
                            contentSecuritySettings={props.contentSecuritySettingsState['live'][liveId]}
                            contentId={liveId}
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

export function mapStateToProps( state: ApplicationState ) {
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
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSecurity);