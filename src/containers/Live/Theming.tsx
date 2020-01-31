import React from 'react';
import { LiveThemingPage } from '../../pages/Live/Theming/Theming';
import { ThemeOptions, ThemesData } from '../../redux-flow/store/Settings/Theming';

export const LiveTheming = () => {

    React.useEffect(() => {
        if(!props.theme ||  (!props.theme && !props.themeList)) {
            props.getVodTheme();
            props.getThemingList();
        }
    }, [])
    
    const [customThemeList, setCustomThemeList] = React.useState<ThemesData>(null)
    
    React.useEffect(() => {
        if (props.themeList) {
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
    }, [props.themeList])
    
    return (
        <LiveThemingPage />
    )
    
}