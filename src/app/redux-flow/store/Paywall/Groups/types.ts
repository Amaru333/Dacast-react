export enum ActionTypes {
    GET_GROUPS_INFOS = "@@paywall_groups/GET_GROUPS_INFOS",
    CREATE_GROUP_PRICE = "@@paywall_groups/CREATE_GROUP_PRICE",
    SAVE_GROUP_PRICE = "@@paywall_groups/SAVE_GROUP_PRICE",
    DELETE_GROUP_PRICE = "@@paywall_groups/DELETE_GROUP_PRICE",
    CREATE_GROUP_PROMO = "@@paywall_groups/CREATE_GROUP_PROMO",
    SAVE_GROUP_PROMO = "@@paywall_groups/SAVE_GROUP_PROMO",
    DELETE_GROUP_PROMO = "@@paywall_groups/DELETE_GROUP_PROMO",

}

export interface Price {
    amount: number;
    currency: string;
}

export interface GroupPrice {
    id: string;
    name: string;
    type: string;
    price: Price[];
    duration?: {amount: number | string; type: string};
    recurrence?: string;
    startMethod: string;
    timezone?: string;
    startDate?: Date;
    startTime?: string;

}

export interface GroupPromo {
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

export interface GroupsPageInfos {
    prices: GroupPrice[];
    promos: GroupPromo[];
}

export const groupsInitialState: GroupsPageInfos = {
    prices: [],
    promos: []
}