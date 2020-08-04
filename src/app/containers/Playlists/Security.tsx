import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getPlaylistSecuritySettingsAction, savePlaylistSecuritySettingsAction } from '../../redux-flow/store/Playlists/Security/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { SecuritySettings, ContentSecuritySettingsState, ContentSecuritySettings } from '../../redux-flow/store/Settings/Security/types';
import { ContentSecurityPage } from '../../shared/Security/ContentSecurityPage';

export interface PlaylistSecurityContainerProps {
    playlistSecuritySettings: ContentSecuritySettingsState;
    playlistSecurity: ContentSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getPlaylistSecuritySettings: (playlistId: string) => Promise<void>;
    savePlaylistSecuritySettings: (data: SecuritySettings, playlistId: string) => Promise<void>;
    getSettingsSecurityOptions: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const PlaylistSecurity = (props: PlaylistSecurityContainerProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if (!props.playlistSecuritySettings[playlistId] || (!props.playlistSecuritySettings[playlistId] && !props.globalSecuritySettings)) {
            props.getPlaylistSecuritySettings(playlistId);
            props.getSettingsSecurityOptions();
        }
    }, [])


    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.playlistSecuritySettings[playlistId] && props.globalSecuritySettings ?
                <div className='flex flex-column'>
                    <ContentSecurityPage
                        contentSecuritySettings={props.playlistSecuritySettings[playlistId]}
                        contentId={playlistId}
                        globalSecuritySettings={props.globalSecuritySettings}
                        saveContentSecuritySettings={props.savePlaylistSecuritySettings}
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
        playlistSecuritySettings: state.playlist.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistSecuritySettings: async (playlistId: string) => {
            await dispatch(getPlaylistSecuritySettingsAction(playlistId));
        },
        savePlaylistSecuritySettings: async (data: SecuritySettings, playlistId: string) => {
            await dispatch(savePlaylistSecuritySettingsAction(data, playlistId));
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