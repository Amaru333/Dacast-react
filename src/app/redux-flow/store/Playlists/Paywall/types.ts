export enum ActionTypes {
    GET_PLAYLIST_PAYWALL_INFOS = "@@playlist_paywall/GET_PLAYLIST_PAYWALL_INFOS",
    SAVE_PLAYLIST_PAYWALL_INFOS ="@@playlist_paywall/SAVE_PLAYLIST_PAYWALL_INFOS",
    CREATE_PLAYLIST_PRICE_PRESET = "@@playlist_paywall/CREATE_PLAYLIST_PRICE_PRESET",
    SAVE_PLAYLIST_PRICE_PRESET = "@@playlist_paywall/SAVE_PLAYLIST_PRICE_PRESET",
    DELETE_PLAYLIST_PRICE_PRESET = "@@playlist_paywall/DELETE_PLAYLIST_PRICE_PRESET",
    CREATE_PLAYLIST_PROMO_PRESET = "@@playlist_paywall/CREATE_PLAYLIST_PROMO_PRESET",
    SAVE_PLAYLIST_PROMO_PRESET = "@@playlist_paywall/SAVE_PLAYLIST_PROMO_PRESET",
    DELETE_PLAYLIST_PROMO_PRESET = "@@playlist_paywall/DELETE_PLAYLIST_PROMO_PRESET",

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

export interface PlaylistPaywallPageInfos {
    presets: Preset[];
    promos: Promo[];
    enabled: boolean;
    introVodId: string;
    selectedTheme: string;
}

export const playlistPaywallInitialState: PlaylistPaywallPageInfos = {
    presets: [],
    promos: [],
    enabled: false,
    introVodId: '',
    selectedTheme: null
}