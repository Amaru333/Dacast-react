import React from 'react';
import { PlaylistSecurityPage } from '../../pages/Playlist/Security/Security';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getPlaylistSecuritySettingsAction, savePlaylistSecuritySettingsAction } from '../../redux-flow/store/Playlists/Security/actions';
import { connect } from 'react-redux';
import { PlaylistSecuritySettings, SecuritySettings } from '../../redux-flow/store/Playlists/Security';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsSecurityOptionsAction } from '../../redux-flow/store/Settings/Security/actions';

export interface PlaylistSecurityContainerProps {
    playlistSecuritySettings: PlaylistSecuritySettings;
    globalSecuritySettings: SecuritySettings;
    getPlaylistSecuritySettings: Function;
    savePlaylistSecuritySettings: Function;
    getSettingsSecurityOptions: Function;
}

const PlaylistSecurity = (props: PlaylistSecurityContainerProps) => {


    React.useEffect(() => {
        if(!props.playlistSecuritySettings ||  (!props.playlistSecuritySettings && !props.globalSecuritySettings)) {
            props.getPlaylistSecuritySettings();
            props.getSettingsSecurityOptions();
        }
    }, [])


    return (
        props.playlistSecuritySettings && props.globalSecuritySettings ? 
            <PlaylistSecurityPage {...props}/>
            : <LoadingSpinner color='dark-violet' size='large' />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSecurity);