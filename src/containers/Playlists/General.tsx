import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getPlaylistDetailsAction, changePlaylistThumbnailAction, editPlaylistDetailsAction, changePlaylistSplashscreenAction, changeLivePosterAction, changePlaylistPosterAction, deletePlaylistThumbnailAction, deletePlaylistSplashscreenAction, deletePlaylistPosterAction } from '../../redux-flow/store/Playlists/General/actions';
import { connect } from 'react-redux';
import { PlaylistDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from '../../redux-flow/store/Playlists/General/types';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PlaylistGeneralPage } from '../../pages/Playlist/General/General';


interface GeneralProps {
    playlistDetails: PlaylistDetails;
    editPlaylistDetails: Function;
    getPlaylistDetails: Function;
    changePlaylistThumbnail: Function;
    deletePlaylistThumbnail: Function;
    changePlaylistSplashscreen: Function;
    deletePlaylistSplashscreen: Function;
    changePlaylistPoster: Function;
    deletePlaylistPoster: Function;
}

const GeneralPlaylist = (props: GeneralProps) => {

    React.useEffect(() => {
        if (!props.playlistDetails) {
            props.getPlaylistDetails();
        }
    }, [])

    return (
        props.playlistDetails ?
            (
                <PlaylistGeneralPage {...props} />
            )
            : <LoadingSpinner color='dark-violet' size='large' />
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistDetails: state.playlist.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistDetails: () => {
            dispatch(getPlaylistDetailsAction());
        },
        editPlaylistDetails: (data: PlaylistDetails) => {
            dispatch(editPlaylistDetailsAction(data));
        },
        changePlaylistThumbnail: (data: ThumbnailUpload) => {
            dispatch(changePlaylistThumbnailAction(data))
        },
        deletePlaylistThumbnail: () => {
            dispatch(deletePlaylistThumbnailAction())
        },
        changePlaylistSplashscreen: (data: SplashscreenUpload) => {
            dispatch(changePlaylistSplashscreenAction(data))
        },
        deletePlaylistSplashscreen: () => {
            dispatch(deletePlaylistSplashscreenAction())
        },
        changePlaylistPoster: (data: PosterUpload) => {
            dispatch(changePlaylistPosterAction(data))
        },
        deletePlaylistPoster: () => {
            dispatch(deletePlaylistPosterAction())
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPlaylist);