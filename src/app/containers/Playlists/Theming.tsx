import React from 'react';
import { ThemeOptions, ContentThemeState } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getPlaylistThemeAction, savePlaylistThemeAction } from '../../redux-flow/store/Playlists/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';

export interface PlaylistThemingComponentProps {
    themeState: ContentThemeState;
    getPlaylistTheme: Function;
    savePlaylistTheme: Function;
}

const PlaylistTheming = (props: PlaylistThemingComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if (!props.themeState[playlistId]) {
            props.getPlaylistTheme(playlistId);
        }
    }, [])

    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.themeState[playlistId] ?
                <div className='flex flex-column'>
                    <ThemingControlsCard
                        theme={props.themeState[playlistId]}
                        saveTheme={props.savePlaylistTheme}
                        contentType='playlist'
                        actionType='Save'
                        contentId={playlistId}
                    />
                </div>
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.playlist.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistTheme: (playlistId: string) => {
            dispatch(getPlaylistThemeAction(playlistId));
        },
        savePlaylistTheme: (theme: ThemeOptions, playlistId: string) => {
            dispatch(savePlaylistThemeAction(theme, playlistId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTheming);