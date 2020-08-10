import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SearchResult } from '../../redux-flow/store/Playlists/List/types';
import { getPlaylistListAction, Action, deletePlaylistAction } from '../../redux-flow/store/Playlists/List/actions';
import { getThemingListAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';

export interface PlaylistListComponentProps {
    playlistList: SearchResult;
    themeList: ThemesData;
    getPlaylistList: (qs: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    deletePlaylist: (playlistId: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const PlaylistList = (props: PlaylistListComponentProps) => {

    React.useEffect(() => {
        props.getPlaylistList(null)
    }, [])

    return props.playlistList ?
        <ContentListPage
            contentType="playlists"
            items={props.playlistList}
            themesList={props.themeList}
            getContentList={props.getPlaylistList}
            deleteContentList={props.deletePlaylist}
            getThemesList={props.getThemesList}
            showToast={props.showToast}

        />
        : <SpinnerContainer><LoadingSpinner size="medium" color="violet" /></SpinnerContainer>

}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistList: state.playlist.list,
        themeList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistList: async (qs: string) => {
            await dispatch(getPlaylistListAction(qs));
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction());
        },
        deletePlaylist: async (playlistId: string) => {
            await dispatch(deletePlaylistAction(playlistId));
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);