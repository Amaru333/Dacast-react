import { GetContentThemeOutput } from "../../../../../DacastSdk/common"
import { ThemeEndpoint } from "../../../../../DacastSdk/settings"
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