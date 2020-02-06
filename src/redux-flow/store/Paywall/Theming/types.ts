export enum ActionTypes {
    GET_PAYWALL_THEMES = "@@paywall_theming/GET_PAYWALL_THEMES",
    SAVE_PAYWALL_THEME = "@@paywall_theming/SAVE_PAYWALL_THEME",
    CREATE_PAYWALL_THEME = "@@paywall_theming/CREATE_PAYWALL_THEME",
    DELETE_PAYWALL_THEME = "@@paywall_theming/DELETE_PAYWALL_THEME",
}

export interface PaywallTheme {
    id: string;
    name: string;
    isDefault: boolean;
    splashScreen: {
        buttonColor: string;
        buttonTextColor: string;
    };
    loginScreen: {
        buttonColor: string;
        primaryColor: string;
        headerColor: string;
        hasCompanyLogo: boolean;
    };
}

export interface PaywallThemingData {
    themes: PaywallTheme[];
}

export const paywallThemingInitialState: PaywallThemingData = {
    themes: []
}