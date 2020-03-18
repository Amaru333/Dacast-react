export enum ActionTypes {
    GET_PAYWALL_SETTINGS_INFOS = "@@paywall_settings/GET_PAYWALL_SETTINGS_INFOS",
    SAVE_PAYWALL_SETTINGS_INFOS = "@@paywall_settings/SAVE_PAYWALL_SETTINGS_INFOS"
}

export interface PaywallSettingsInfos {
    creditCardPurchases: boolean;
    paypalPurchases: boolean;
    paypalTC: boolean;
    customUrl: string;
}

export const paywallSettingsInitialState: PaywallSettingsInfos = {
    creditCardPurchases: false,
    paypalPurchases: false,
    paypalTC: false,
    customUrl: null
}