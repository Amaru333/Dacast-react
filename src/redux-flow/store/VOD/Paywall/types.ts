export enum ActionTypes {
    GET_VOD_PAYWALL_INFOS = "@@vod_paywall/GET_VOD_PAYWALL_INFOS",
    CREATE_VOD_PRICE_PRESET = "@@vod_paywall/CREATE_VOD_PRICE_PRESET",
    SAVE_VOD_PRICE_PRESET = "@@vod_paywall/SAVE_VOD_PRICE_PRESET",
    DELETE_VOD_PRICE_PRESET = "@@vod_paywall/DELETE_VOD_PRICE_PRESET",
    CREATE_VOD_PROMO_PRESET = "@@vod_paywall/CREATE_VOD_PROMO_PRESET",
    SAVE_VOD_PROMO_PRESET = "@@vod_paywall/SAVE_VOD_PROMO_PRESET",
    DELETE_VOD_PROMO_PRESET = "@@vod_paywall/DELETE_VOD_PROMO_PRESET",

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

export interface VodPaywallPageInfos {
    presets: Preset[];
    promos: Promo[];
    enabled: boolean;
    introVodId: string;
}

export const presetsInitialState: VodPaywallPageInfos = {
    presets: [],
    promos: [],
    enabled: false,
    introVodId: ''
}