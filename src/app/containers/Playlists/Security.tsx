import React from 'react';
import { PlaylistSecurityPage } from '../../pages/Playlist/Security/Security';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getPlaylistSecuritySettingsAction, savePlaylistSecuritySettingsAction } from '../../redux-flow/store/Playlists/Security/actions';
import { connect } from 'react-redux';
import { PlaylistSecuritySettings, SecuritySettings } from '../../redux-flow/store/Playlists/Security';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';

export interface PlaylistSecurityContainerProps {
    playlistSecuritySettings: PlaylistSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getPlaylistSecuritySettings: Function;
    savePlaylistSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
    showToast: Function;
}

const PlaylistSecurity = (props: PlaylistSecurityContainerProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if(!props.playlistSecuritySettings ||  (!props.playlistSecuritySettings && !props.globalSecuritySettings)) {
            props.getPlaylistSecuritySettings();
            props.getSettingsSecurityOptions();
        }
    }, [])


    return (
        props.playlistSecuritySettings && props.globalSecuritySettings ? 
            <div className='flex flex-column'>
                <PlaylistsTabs playlistId={playlistId} />
                <PlaylistSecurityPage {...props} />
            </div>            
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        playlistSecuritySettings: state.playlist.security,
        globalSecuritySettings: state.settings.security
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistSecuritySettings: () => {
            dispatch(getPlaylistSecuritySettingsAction());
        },
        savePlaylistSecuritySettings: (data: SecuritySettings) => {
            dispatch(savePlaylistSecuritySettingsAction(data));
        },
        getSettingsSecurityOptions: () => {
            dispatch(getSettingsSecurityOptionsAction());
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSecurity);