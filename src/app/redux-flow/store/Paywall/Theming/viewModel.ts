import { PaywallTheme } from './types';
import { GetPaywallThemesOutput, PaywallThemeDetails, PaywallThemeId } from '../../../../../DacastSdk/paywall';

export const formatGetPaywallThemesOutput = (data: GetPaywallThemesOutput): PaywallTheme[] => {
    let standardTheme: PaywallTheme = {
        id: '-1',
        name: 'Standard Theme',
        isDefault: !data.themes.some(theme => theme.isDefault),
        splashScreen: {
            buttonColor: '#2899F6',
            buttonTextColor: '#FFFFFF'
        },
        loginScreen: {
            buttonColor: '#2899F6',
            primaryColor: '#2899F6',
            headerColor: '#2899F6',
            hasCompanyLogo: true
        }
    }
    let formattedData = [standardTheme, ...data.themes]

    return formattedData
}

export const formatPostPaywallThemeInput = (data: PaywallTheme): PaywallThemeDetails => {
    let formattedData: PaywallThemeDetails = {
        name: data.name,
        isDefault: data.isDefault,
        splashScreen: data.splashScreen,
        loginScreen: data.loginScreen
    }

    return formattedData
}

export const formatPostPaywallThemeOutput = (endpointResponse: PaywallThemeId, dataReact: PaywallTheme): PaywallTheme => {
    let formattedData: PaywallTheme = {
        ...dataReact,
        id: endpointResponse.id
    }

    return formattedData
}