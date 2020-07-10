import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SearchResult } from '../../redux-flow/store/Playlists/List/types';
import { getPlaylistListAction, Action, deletePlaylistAction } from '../../redux-flow/store/Playlists/List/actions';
import { PlaylistListPage } from '../../pages/Playlist/List/PlaylistList';
import { getThemingListAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

export interface PlaylistListComponentProps {
    playlistList: SearchResult;
    getPlaylistList: Function;
    themeList: ThemesData;
    getThemingList: Function;
    deletePlaylist: Function;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const PlaylistList = (props: PlaylistListComponentProps) => {

   

    React.useEffect(() => {
        if (!props.playlistList) {
            props.getPlaylistList();
        }
    }, [])

    if (!props.playlistList) {
        return (
            <SpinnerContainer><LoadingSpinner size="medium" color="violet" /></SpinnerContainer>
        )
    } else {
        return (
            <>
                <PlaylistListPage {...props}  />
            </>
        )
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistList: state.playlist.list,
        themeList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistList: (qs: string) => {
            dispatch(getPlaylistListAction(qs));
        },
        getThemingList: () => {
            dispatch(getThemingListAction());
        },
        deletePlaylist: (playlistId: string, title: string) => {
            dispatch(deletePlaylistAction(playlistId, title));
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);