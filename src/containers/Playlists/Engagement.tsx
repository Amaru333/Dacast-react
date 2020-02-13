import React from 'react';
import { PlaylistEngagementPage } from '../../pages/Playlist/Engagement/Engagement';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PlaylistEngagementSettings } from "../../redux-flow/store/Playlists/Engagement/types"
import { getPlaylistEngagementSettingsAction, Action, savePlaylistEngagementSettingsAction, savePlaylistAdAction, createPlaylistAdAction, deletePlaylistAdAction } from '../../redux-flow/store/Playlists/Engagement/actions';
import { Ad } from '../../redux-flow/store/Settings/Interactions/types';

export interface PlaylistEngagementComponentProps {
    playlistEngagementSettings: PlaylistEngagementSettings;
    getPlaylistEngagementSettings: Function;
    savePlaylistEngagementSettings: Function;
    savePlaylistAd: Function;
    createPlaylistAd: Function;
    deletePlaylistAd: Function;
}

export const PlaylistEngagement = (props: PlaylistEngagementComponentProps) => {

    React.useEffect(() => {
        if (!props.playlistEngagementSettings) {
            props.getPlaylistEngagementSettings();
        }
    }, []);

    return (
        props.playlistEngagementSettings ?
            <PlaylistEngagementPage {...props} />
            : <LoadingSpinner size='medium' color='overlay70' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistEngagementSettings: state.playlist.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistEngagementSettings: () => {
            dispatch(getPlaylistEngagementSettingsAction());
        },
        savePlaylistEngagementSettings: (data: PlaylistEngagementSettings) => {
            dispatch(savePlaylistEngagementSettingsAction(data))
        },
        savePlaylistAd: (data: Ad) => {
            dispatch(savePlaylistAdAction(data))
        },
        createPlaylistAd: (data: Ad) => {
            dispatch(createPlaylistAdAction(data))
        },
        deletePlaylistAd: (data: Ad) => {
            dispatch(deletePlaylistAdAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEngagement)