import React from 'react';
import { LiveThemingPage } from '../../pages/Live/Theming/Theming';
import { ThemeOptions, ThemesData, Action, getThemingListAction } from '../../redux-flow/store/Settings/Theming';
import { LiveTheme } from '../../redux-flow/store/Live/Theming/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { getLiveThemeAction, saveLiveThemeAction } from '../../redux-flow/store/Live/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface LiveThemingComponentProps {
    theme: LiveTheme;
    themeList: ThemesData;
    getLiveTheme: Function;
    saveLiveTheme: Function;
    getThemingList: Function;
    setCustomThemeList: Function;
}

export const LiveTheming = (props: LiveThemingComponentProps) => {

    React.useEffect(() => {
        if(!props.theme) {
            props.getLiveTheme();            
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
                hasCustomColor: props.theme.selectedTheme.hasCustomColor,
                customColor: props.theme.selectedTheme.customColor,
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
            <LiveThemingPage setCustomThemeList={setCustomThemeList} themeList={customThemeList} {...props} />
            : <LoadingSpinner color='dark-violet' size='large' />
    )
    
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.live.theming,
        themeList: state.settings.theming
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveTheme: () => {
            dispatch(getLiveThemeAction());
        },
        saveLiveTheme: (theme: LiveTheme) => {
            dispatch(saveLiveThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTheming);