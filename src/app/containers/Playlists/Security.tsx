import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { SecuritySettings} from '../../redux-flow/store/Settings/Security/types';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';
import { ContentSecurityProps } from '../Videos/Security';
import { getContentSecuritySettingsAction, saveContentSecuritySettingsAction, Action, lockContentAction } from '../../redux-flow/store/Content/Security/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

const PlaylistSecurity = (props: ContentSecurityProps) => {

    let { playlistId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!props.globalSecuritySettings) {
            props.getSettingsSecurityOptions()
            .catch(() => setNodataFetched(true))
        }
            props.getContentSecuritySettings(playlistId, 'playlist')
            .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />

            {
                props.contentSecuritySettingsState['playlist'] &&props.contentSecuritySettingsState['playlist'][playlistId] && props.globalSecuritySettings ?
                <div className='flex flex-column'>
                    <ContentSecurityPage
                        contentType="playlist"
                        contentSecuritySettings={props.contentSecuritySettingsState['playlist'][playlistId]}
                        contentId={playlistId}
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
        lockContent: async (contentId: string, contentType: string) => {
            await dispatch(lockContentAction(contentId, contentType));
        },
        getSettingsSecurityOptions: async () => {
            await dispatch(getSettingsSecurityOptionsAction());
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSecurity);