import { ThemesData, ContentTheme, ThemeOptions } from '../../redux-flow/store/Settings/Theming';

export const handleCustomTheme = (theme: ContentTheme, themeList: ThemesData, setCustomThemeList: Function) => {
    if (theme && themeList) {
        let customTheme: ThemeOptions = {

            id: "custom",
            themeName: 'Custom Theme',
            isDefault: theme.selectedTheme.isDefault,
            createdDate: theme.selectedTheme.createdDate,
            themeType: theme.selectedTheme.themeType,
            playerControls: theme.selectedTheme.playerControls,
            bigPlayButton: theme.selectedTheme.bigPlayButton,
            scrubbingThumbnail: theme.selectedTheme.scrubbingThumbnail,
            thumbnailPosition: theme.selectedTheme.thumbnailPosition,
            isViewerCounterEnabled: theme.selectedTheme.isViewerCounterEnabled,
            viewerCounterLimit: theme.selectedTheme.viewerCounterLimit,
            downloadButton: theme.selectedTheme.downloadButton,
            socialSharing: theme.selectedTheme.socialSharing,
            embedCode: theme.selectedTheme.embedCode,
            customMenuColor: theme.selectedTheme.customMenuColor,
            customOverlayColor: theme.selectedTheme.customOverlayColor,
            autoplay: theme.selectedTheme.autoplay,
            startVideoMuted: theme.selectedTheme.startVideoMuted,
            looping: theme.selectedTheme.looping,
            continuousPlay: theme.selectedTheme.continuousPlay,
            skipVideos: theme.selectedTheme.skipVideos,
            offlineMessage: theme.selectedTheme.offlineMessage,
            offlineMessagePosition: theme.selectedTheme.offlineMessagePosition,
            deliveryMethod: theme.selectedTheme.deliveryMethod,
            regionSettings: theme.selectedTheme.regionSettings
        };

        let customThemeList = themeList.themes
        customThemeList.push(customTheme)
        setCustomThemeList({themes: customThemeList})
    }
}