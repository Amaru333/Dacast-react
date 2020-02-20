export enum ActionTypes {
    GET_LIVE_PAYWALL_INFOS = "@@live_paywall/GET_LIVE_PAYWALL_INFOS",
    SAVE_LIVE_PAYWALL_INFOS ="@@live_paywall/SAVE_LIVE_PAYWALL_INFOS",
    CREATE_LIVE_PRICE_PRESET = "@@live_paywall/CREATE_LIVE_PRICE_PRESET",
    SAVE_LIVE_PRICE_PRESET = "@@live_paywall/SAVE_LIVE_PRICE_PRESET",
    DELETE_LIVE_PRICE_PRESET = "@@live_paywall/DELETE_LIVE_PRICE_PRESET",
    CREATE_LIVE_PROMO_PRESET = "@@live_paywall/CREATE_LIVE_PROMO_PRESET",
    SAVE_LIVE_PROMO_PRESET = "@@live_paywall/SAVE_LIVE_PROMO_PRESET",
    DELETE_LIVE_PROMO_PRESET = "@@live_paywall/DELETE_LIVE_PROMO_PRESET",

}

export interface Price {
    amount: number;
    currency: string;
}

export interface Preset {
    id: string;
    name: string;
    type: string;
    price: Price[];
    duration?: {amount: number; type: string};
    recurrence?: string;
    startMethod: string;
    timezone?: string;
    startDate?: Date;
    startTime?: string;

}

export interface Promo {
    id: string;
    name: string;
    alphanumericCode: string;
    discount: number;
    limit: number;
    rateType: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    timezone: string;
    discountApplied: string;
}

export interface LivePaywallPageInfos {
    presets: Preset[];
    promos: Promo[];
    enabled: boolean;
    introVodId: string;
    selectedTheme: string;
}

export const livePaywallInitialState: LivePaywallPageInfos = {
    presets: [],
    promos: [],
    enabled: false,
    introVodId: '',
    selectedTheme: null
}