import React from 'react';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PlaylistListState } from '../../redux-flow/store/Playlists/List/types';
import { getPlaylistListAction, Action } from '../../redux-flow/store/Playlists/List/actions';
import { PlaylistListPage } from '../../pages/Playlist/List/PlaylistList';
import { getThemingListAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PlaylistListContainerProps {
    playlistList: PlaylistListState;
    getPlaylistList: Function;
    themeList: ThemesData;
    getThemingList: Function;
}

const PlaylistList = (props: PlaylistListContainerProps) => {

   

    React.useEffect(() => {
        if (!props.playlistList) {
            props.getPlaylistList();
        }
        if(!props.themeList) {
            props.getThemingList();
        }
    }, [])

    console.log(props);
    if (!props.playlistList || !props.themeList) {
        return (
            <SpinnerContainer><LoadingSpinner size="medium" color="violet" /></SpinnerContainer>
        )
    } else {
        return (
            <>
                <PlaylistListPage history={props.history} themesList={props.themeList.themes} playlistItems={props.playlistList.items}  />
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
        getPlaylistList: () => {
            dispatch(getPlaylistListAction());
        },
        getThemingList: () => {
            dispatch(getThemingListAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);