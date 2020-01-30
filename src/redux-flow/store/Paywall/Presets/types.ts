export enum ActionTypes {
    GET_PRESETS_INFOS = "@@paywall_presets/GET_PRESETS_INFOS",
}

export interface Price {
    amount: number;
    currency: string;
}

export interface Preset {
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