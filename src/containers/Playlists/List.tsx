import React from 'react';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PlaylistListState } from '../../redux-flow/store/Playlists/List/types';
import { getPlaylistListAction, Action } from '../../redux-flow/store/Playlists/List/actions';
import { PlaylistListPage } from '../../pages/Playlist/List/PlaylistList';

export interface PlaylistListContainerProps {
    playlistList: PlaylistListState;
    getPlaylistList: Function;
}

const PlaylistList = (props: PlaylistListContainerProps) => {

   

    React.useEffect(() => {
        if (!props.playlistList) {
            props.getPlaylistList();
        }
    }, [])

    if (!props.playlistList) {
        return (
            <LoadingSpinner size="medium" color="violet" />
        )
    } else {
        return (
            <>
                <PlaylistListPage history={props.history} playlistItems={props.playlistList.items}  />
            </>
        )
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistList: state.playlist.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistList: () => {
            dispatch(getPlaylistListAction());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);