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
import { Action, getContentSecuritySettingsAction, saveContentSecuritySettingsAction, lockContentAction } from '../../redux-flow/store/Content/Security/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';



const LiveSecurity = (props: ContentSecurityProps) => {

    let { liveId } = useParams<{liveId: string}>()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)


    React.useEffect(() => {
        if (!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions()
            .catch(() => setNodataFetched(true))

        }
       
            props.getContentSecuritySettings(liveId, 'live')
            .catch(() => setNodataFetched(true))


    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

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
                            lockContent={props.lockContent}
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
        getContentSecuritySettings: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentSecuritySettingsAction(contentType)(contentId));
        },
        saveContentSecuritySettings: async (data: SecuritySettings, contentId: string, contentType: ContentType) => {
            await dispatch(saveContentSecuritySettingsAction(contentType)({securitySettings: data, contentId: contentId}));
        },
        lockContent: async (contentId: string, contentType: ContentType) => {
            await dispatch(lockContentAction(contentType)(contentId));
        },
        getSettingsSecurityOptions: async () => {
            await dispatch(getSettingsSecurityOptionsAction(undefined));
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSecurity);