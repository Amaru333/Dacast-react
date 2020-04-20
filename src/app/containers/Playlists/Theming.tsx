import React from 'react';
import { PlaylistThemingPage } from '../../pages/Playlist/Theming/Theming';
import { ThemesData, ContentTheme } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getPlaylistThemeAction, savePlaylistThemeAction } from '../../redux-flow/store/Playlists/Theming/actions';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { handleCustomTheme } from '../../shared/Theming/handleCustomTheme';

export interface PlaylistThemingComponentProps {
    theme: ContentTheme;
    themeList: ThemesData;
    getPlaylistTheme: Function;
    savePlaylistTheme: Function;
    getThemingList: Function;
    setCustomThemeList: Function;
}

export const PlaylistTheming = (props: PlaylistThemingComponentProps) => {

    
    React.useEffect(() => {
        if(!props.theme) {
            props.getPlaylistTheme();
        }
        if(!props.themeList) {
            props.getThemingList();
        }
    }, [])
    
    const [customThemeList, setCustomThemeList] = React.useState<ThemesData>(null)
    
    React.useEffect(() => {
         handleCustomTheme(props.theme, props.themeList, setCustomThemeList) 
    }, [props.themeList, props.theme])

    return (
        props.theme && customThemeList ?
            <PlaylistThemingPage setCustomThemeList={setCustomThemeList} themeList={customThemeList} {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.playlist.theming,
        themeList: state.settings.theming
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
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTheming);