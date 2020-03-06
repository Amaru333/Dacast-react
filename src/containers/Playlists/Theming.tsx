import React from 'react';
import { PlaylistThemingPage } from '../../pages/Playlist/Theming/Theming';
import { PlaylistTheme } from '../../redux-flow/store/Playlists/Theming/types';
import { ThemesData, ThemeOptions } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getPlaylistThemeAction, savePlaylistThemeAction } from '../../redux-flow/store/Playlists/Theming/actions';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PlaylistThemingComponentProps {
    theme: PlaylistTheme;
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
        if (props.theme && props.themeList) {
            let customTheme: ThemeOptions = {

                id: "custom",
                themeName: 'Custom Theme',
                isDefault: props.theme.selectedTheme.isDefault,
                createdDate: props.theme.selectedTheme.createdDate,
                themeType: props.theme.selectedTheme.themeType,
                bigPlayButton: props.theme.selectedTheme.bigPlayButton,
                playPause: props.theme.selectedTheme.playPause,
                scrubber: props.theme.selectedTheme.scrubber,
                scrubbingThumbnail: props.theme.selectedTheme.scrubbingThumbnail,
                timeCode: props.theme.selectedTheme.timeCode,
                speedControls: props.theme.selectedTheme.speedControls,
                qualityOptions: props.theme.selectedTheme.qualityOptions,
                volume: props.theme.selectedTheme.volume,
                fullscreen: props.theme.selectedTheme.fullscreen,
                thumbnailPosition: props.theme.selectedTheme.thumbnailPosition,
                isViewerCounterEnabled: props.theme.selectedTheme.isViewerCounterEnabled,
                viewerCounterLimit: props.theme.selectedTheme.viewerCounterLimit,
                downloadButton: props.theme.selectedTheme.downloadButton,
                socialSharing: props.theme.selectedTheme.socialSharing,
                embedCode: props.theme.selectedTheme.embedCode,
                playerTransparency: props.theme.selectedTheme.playerTransparency,
                customMenuColor: props.theme.selectedTheme.customMenuColor,
                customOverlayColor: props.theme.selectedTheme.customOverlayColor,
                autoplay: props.theme.selectedTheme.autoplay,
                startVideoMuted: props.theme.selectedTheme.startVideoMuted,
                looping: props.theme.selectedTheme.looping,
                continuousPlay: props.theme.selectedTheme.continuousPlay,
                skipVideos: props.theme.selectedTheme.skipVideos,
                offlineMessage: props.theme.selectedTheme.offlineMessage,
                deliveryMethod: props.theme.selectedTheme.deliveryMethod,
                regionSettings: props.theme.selectedTheme.regionSettings
            };

            let customThemeList = props.themeList.themes
            customThemeList.push(customTheme)
            setCustomThemeList({themes: customThemeList})
        }  
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
        savePlaylistTheme: (theme: PlaylistTheme) => {
            dispatch(savePlaylistThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTheming);