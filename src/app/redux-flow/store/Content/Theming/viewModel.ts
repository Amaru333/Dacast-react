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
        payload: data.theme
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
        payload: data.theme,
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