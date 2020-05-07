import React from 'react';
import { ContentTheme } from '../../redux-flow/store/Settings/Theming/types';
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
    theme: ContentTheme;
    getPlaylistTheme: Function;
    savePlaylistTheme: Function;
}

const PlaylistTheming = (props: PlaylistThemingComponentProps) => {

    let { playlistId } = useParams() 

    React.useEffect(() => {
        if(!props.theme) {
            props.getPlaylistTheme();
        }
    }, [])

    return (
        props.theme ?
            <div className='flex flex-column'>
                <PlaylistsTabs playlistId={playlistId} />
                <ThemingControlsCard
                    theme={props.theme} 
                    saveTheme={props.savePlaylistTheme}
                    contentType='playlist'
                    actionType='Save'
                />            
            </div>  
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.playlist.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistTheme: () => {
            dispatch(getPlaylistThemeAction());
        },
        savePlaylistTheme: (theme: ContentTheme) => {
            dispatch(savePlaylistThemeAction(theme));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTheming);