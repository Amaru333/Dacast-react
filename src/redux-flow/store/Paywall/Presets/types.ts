export enum ActionTypes {
    GET_PRESETS_INFOS = "@@paywall_presets/GET_PRESETS_INFOS",
    CREATE_PRICE_PRESET = "@@paywall_presets/CREATE_PRICE_PRESET",
    SAVE_PRICE_PRESET = "@@paywall_presets/SAVE_PRICE_PRESET",
    DELETE_PRICE_PRESET = "@@paywall_presets/DELETE_PRICE_PRESET",
    CREATE_PROMO_PRESET = "@@paywall_presets/CREATE_PROMO_PRESET",
    SAVE_PROMO_PRESET = "@@paywall_presets/SAVE_PROMO_PRESET",
    DELETE_PROMO_PRESET = "@@paywall_presets/DELETE_PROMO_PRESET",

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

export interface PresetsPageInfos {
    presets: Preset[];
    promos: Promo[];
}

export const presetsInitialState: PresetsPageInfos = {
    presets: [],
    promos: []
}