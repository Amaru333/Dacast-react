export enum ActionTypes {
    GET_PRESETS_LIST = "@@paywall_presets/GET_PRESETS_LIST",
    CREATE_PRICE_PRESET = "@@paywall_presets/CREATE_PRICE_PRESET",
    SAVE_PRICE_PRESET = "@@paywall_presets/SAVE_PRICE_PRESET",
    DELETE_PRICE_PRESET = "@@paywall_presets/DELETE_PRICE_PRESET",
    CREATE_PROMO_PRESET = "@@paywall_presets/CREATE_PROMO_PRESET",
    SAVE_PROMO_PRESET = "@@paywall_presets/SAVE_PROMO_PRESET",
    DELETE_PROMO_PRESET = "@@paywall_presets/DELETE_PROMO_PRESET",

}

export interface Price {
    value: number;
    currency: string;
    description?: string;
}

export interface PriceSettings {
    duration?: {value: number; unit: string};
    recurrence?: {recurrence: string};
    startMethod: string;
    timezone?: string;
    startDate?: Date;
    startTime?: string;
}


export interface Preset {
    id: string;
    name: string;
    type: string;
    prices: Price[];
    settings: PriceSettings;
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

export interface PresetsPageInfos {
    presets:{prices: Preset[]; totalItems: number};
    promos: Promo[];
}

export const presetsInitialState: PresetsPageInfos = {
    presets: null,
    promos: []
}