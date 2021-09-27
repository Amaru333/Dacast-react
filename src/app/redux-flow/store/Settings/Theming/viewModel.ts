import { date } from '@storybook/addon-knobs';
import { GetThemeSettingsOutput, ThemeEndpoint, ThemeId, ThemeSettings } from '../../../../../DacastSdk/settings';
import { defaultTheme, DeliveryMethod, RegionSetting, ThemeOptions, ThemesData } from './types';

export const formatGetThemesOutput = (data: GetThemeSettingsOutput): ThemesData => {
    let standardTheme = {
        ...data.themes.filter(t => t.themeName === 'Standard')[0],
        deliveryMethod: 'compatible' as DeliveryMethod,
        regionSettings: 'standard' as RegionSetting,
        createdDate: data.themes.filter(t => t.themeName === 'Standard')[0].createdDate,
        iconsColor: data.themes.filter(t => t.themeName === 'Standard')[0].playerButtonsColor
    } || defaultTheme

    let formattedData: ThemesData = {
        themes: [
            standardTheme,
            ...data.themes.filter(t => t.themeName !== 'Standard').map((theme: ThemeEndpoint): ThemeOptions => {
            return {
                ...theme,
                deliveryMethod: 'compatible',
                regionSettings: 'standard',
                createdDate: theme.createdDate,
                iconsColor: theme.playerButtonsColor
            }
        })]
    }

    return formattedData
}

export const formatPostThemeInput = (data: ThemeOptions): ThemeSettings => {
    let formattedData: ThemeSettings ={
        themeName: data.themeName,
        isDefault: data.isDefault,
        isCustom: data.isCustom,
        playerControls: data.playerControls,
        bigPlayButton: data.bigPlayButton,
        scrubbingThumbnail: data.scrubbingThumbnail,
        thumbnailPosition: data.thumbnailPosition,
        isViewerCounterEnabled: data.isViewerCounterEnabled,
        viewerCounterLimit: data.viewerCounterLimit,
        downloadButton: data.downloadButton,
        socialSharing: data.socialSharing,
        embedCode: data.embedCode,
        customOverlayColor: data.customOverlayColor,
        brandTextBackgroundColor: data.brandTextBackgroundColor,
        brandTextColor: data.brandTextColor,
        playerButtonsColor: data.iconsColor,
        customMenuColor: data.customMenuColor,
        autoplay: data.autoplay,
        startVideoMuted: data.startVideoMuted,
        looping: data.looping,
        continuousPlay: data.continuousPlay,
        skipVideos: data.skipVideos,
        offlineMessage: data.offlineMessage,
        offlineMessagePosition: data.offlineMessagePosition,
        showFullTimeCode: data.showFullTimeCode,
        createdDate: Math.floor(Date.now() / 1000)
    }

    return formattedData
}

export const formatPostThemeOutput = (endpointResponse: ThemeId, dataReact: ThemeOptions): ThemeOptions => {
    let formattedData: ThemeOptions = {
        ...dataReact, 
        id: endpointResponse.id,
        createdDate: Math.floor(Date.now() / 1000)
    }

    return formattedData
}

export const formatPutThemeInput = (data: ThemeOptions): ThemeEndpoint => {
    let formattedData: ThemeEndpoint ={
        id: data.id,
        themeName: data.themeName,
        isDefault: data.isDefault,
        isCustom: data.isCustom,
        playerControls: data.playerControls,
        bigPlayButton: data.bigPlayButton,
        scrubbingThumbnail: data.scrubbingThumbnail,
        thumbnailPosition: data.thumbnailPosition,
        isViewerCounterEnabled: data.isViewerCounterEnabled,
        viewerCounterLimit: data.viewerCounterLimit,
        downloadButton: data.downloadButton,
        socialSharing: data.socialSharing,
        embedCode: data.embedCode,
        customOverlayColor: data.customOverlayColor,
        brandTextBackgroundColor: data.brandTextBackgroundColor,
        brandTextColor: data.brandTextColor,
        playerButtonsColor: data.iconsColor,
        customMenuColor: data.customMenuColor,
        autoplay: data.autoplay,
        startVideoMuted: data.startVideoMuted,
        looping: data.looping,
        continuousPlay: data.continuousPlay,
        skipVideos: data.skipVideos,
        offlineMessage: data.offlineMessage,
        offlineMessagePosition: data.offlineMessagePosition,
        showFullTimeCode: data.showFullTimeCode,
        createdDate: Math.floor(Date.now() / 1000)
    }

    return formattedData
}

export const formatDeleteThemeInput = (data: ThemeOptions): string => data.id