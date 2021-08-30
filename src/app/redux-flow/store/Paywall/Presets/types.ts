export enum ActionTypes {
    GET_PRICE_PRESETS_LIST = "@@paywall_presets/GET_PRICE_PRESETS_LIST",
    GET_PROMO_PRESETS_LIST = "@@paywall_presets/GET_PROMO_PRESETS_LIST",
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
    recurrence?: {unit: string, value?: number};
    startMethod: string;
    timezone?: string;
    startDate?: number;
}


export interface Preset {
    id: string;
    name?: string;
    type: string;
    priceType?: string;
    prices?: Price[];
    settings: PriceSettings;
    contentId?: string;
    price?: number;
    currency?: string;
    description?: string;
    isDeleted?: boolean
}

export interface Promo {
    id: string;
    name?: string;
    alphanumericCode?: string;
    discount: number;
    limit: number;
    startDate?: number;
    endDate?: number;
    timezone?: string;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
    isDeleted?: boolean
}

export interface PresetsPageInfos {
    presets:{prices: Preset[]; totalItems: number};
    promos: {promos: Promo[]; totalItems: number};
}

export const presetsInitialState: PresetsPageInfos = {
    presets: null,
    promos: null
}

export interface ContentPaywallDetails {
    paywallEnabled: boolean;
    introVodId: string;
    selectedTheme: string;
}

export type ContentPaywallPageInfos = {
    prices: Preset[];
    promos: Promo[];
} & ContentPaywallDetails



export interface ContentPaywallState {[key: string]: ContentPaywallPageInfos}

export const contentPaywallInitialState: ContentPaywallPageInfos = {
    prices: [],
    promos: [],
    paywallEnabled: false,
    introVodId: '',
    selectedTheme: null
}