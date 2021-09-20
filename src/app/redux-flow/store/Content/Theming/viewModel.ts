import { GetContentThemeOutput, PostContentCustomThemeInput, PutContentThemeInput } from "../../../../../DacastSdk/common"
import { ThemeEndpoint, ThemeId } from "../../../../../DacastSdk/settings"
import { ContentType } from "../../Common/types"
import { ContentTheme, defaultTheme, DeliveryMethod, RegionSetting, ThemeOptions } from "../../Settings/Theming"

export const formatGetContentThemesInput = (data: string): string => data

export const formatGetContentThemesOutput = (contentType: ContentType) => (endpointResponse: GetContentThemeOutput, dataReact: string): ContentTheme & {contentType: ContentType} => {
    let standardTheme = {
        ...endpointResponse.themes.filter(t => t.themeName === 'Standard')[0],
        deliveryMethod: 'compatible' as DeliveryMethod,
        regionSettings: 'standard' as RegionSetting,
        createdDate: endpointResponse.themes.filter(t => t.themeName === 'Standard')[0].createdDate
    } || defaultTheme
    
    let formattedData: ContentTheme & {contentType: ContentType} = {
        contentId: dataReact,
        contentThemeId: endpointResponse.contentThemeID,
        themes: [
            standardTheme,
            ...endpointResponse.themes.filter(t => t.themeName !== 'Standard').map((theme: ThemeEndpoint): ThemeOptions => {
                return {
                    ...theme,
                    deliveryMethod: 'compatible',
                    regionSettings: 'standard',
                    createdDate: theme.createdDate
                }
            })
        ],
        contentType: contentType
    }

    return formattedData
}

export const formatPostContentCustomThemeInput = (data: {contentId: string, theme: ThemeOptions, contentType: ContentType}): PostContentCustomThemeInput => {
    let formattedData: PostContentCustomThemeInput = {
        contentId: data.contentId,
        payload: {
            themeName: data.theme.themeName,
            isDefault: data.theme.isDefault,
            isCustom: data.theme.isCustom,
            playerControls: data.theme.playerControls,
            bigPlayButton: data.theme.bigPlayButton,
            scrubbingThumbnail: data.theme.scrubbingThumbnail,
            thumbnailPosition: data.theme.thumbnailPosition,
            isViewerCounterEnabled: data.theme.isViewerCounterEnabled,
            viewerCounterLimit: data.theme.viewerCounterLimit,
            downloadButton: data.theme.downloadButton,
            socialSharing: data.theme.socialSharing,
            embedCode: data.theme.embedCode,
            iconsColor:data.theme.iconsColor,
            customOverlayColor: data.theme.customOverlayColor,
            customMenuColor: data.theme.customMenuColor,
            brandTextColor: data.theme.brandTextColor,
            brandTextBackgroundColor: data.theme.brandTextBackgroundColor,
            autoplay: data.theme.autoplay,
            startVideoMuted: data.theme.startVideoMuted,
            looping: data.theme.looping,
            continuousPlay: data.theme.continuousPlay,
            skipVideos: data.theme.skipVideos,
            offlineMessage: data.theme.offlineMessage,
            offlineMessagePosition: data.theme.offlineMessagePosition,
            showFullTimeCode: data.theme.showFullTimeCode,
            createdDate: data.theme.createdDate || null,
        }
    }

    return formattedData
}

export const formatPostContentCustomThemeOutput = (contentType: ContentType) => (endpointResponse: ThemeId, dataReact: {contentId: string, theme: ThemeOptions}): {contentId: string, theme: ThemeOptions, contentType: ContentType} => {
    let formattedData: {contentId: string, theme: ThemeOptions, contentType: ContentType} = {
        contentId: dataReact.contentId, 
        theme: {
            ...dataReact.theme,
            id: endpointResponse.id
        },
        contentType: contentType
    }

    return formattedData
}

export const formatPutContentThemeInput = (data: {contentId: string, theme: ThemeOptions, contentType: ContentType}): PutContentThemeInput => {
    let formattedData: PutContentThemeInput = {
        contentId: data.contentId,
        payload: {...data.theme, createdDate: data.theme.createdDate || null},
        actionWord: !data.theme.isCustom ? '/set' : ''
    }

    return formattedData
}

export const formatPutContentThemeOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: {contentId: string, theme: ThemeOptions}): {contentId: string, theme: ThemeOptions, contentType: ContentType} => {
    let formattedData: {contentId: string, theme: ThemeOptions, contentType: ContentType} = {
        contentId: dataReact.contentId, 
        theme: dataReact.theme,
        contentType: contentType
    }

    return formattedData
}