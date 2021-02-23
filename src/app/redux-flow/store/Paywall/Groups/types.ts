import { FolderAsset } from "../../Folders/types";

export enum ActionTypes {
    GET_GROUP_PRICES = "@@paywall_groups/GET_GROUP_PRICES",
    GET_GROUP_PROMOS = "@@paywall_groups/GET_GROUP_PROMOS",
    CREATE_GROUP_PRICE = "@@paywall_groups/CREATE_GROUP_PRICE",
    SAVE_GROUP_PRICE = "@@paywall_groups/SAVE_GROUP_PRICE",
    DELETE_GROUP_PRICE = "@@paywall_groups/DELETE_GROUP_PRICE",
    GET_PRICE_GROUP_CONTENTS = "@@paywall_groups/GET_PRICE_GROUP_CONTENTS",
    CREATE_GROUP_PROMO = "@@paywall_groups/CREATE_GROUP_PROMO",
    SAVE_GROUP_PROMO = "@@paywall_groups/SAVE_GROUP_PROMO",
    DELETE_GROUP_PROMO = "@@paywall_groups/DELETE_GROUP_PROMO",

}

export interface Price {
    value: number;
    currency: string;
    description?: string;
}

export interface PriceSettings {
    duration?: {value: number; unit: string};
    recurrence?: {unit: string; value?: number};
    startMethod: string;
    timezone?: string;
    startDate?: number;
    type: string;
}

export interface GroupPriceInfo {
    price: Price;
    settings: PriceSettings;
}

export interface GroupPrice {
    id: string;
    name: string;
    prices: GroupPriceInfo[];
    pages: number;
    contents: string[];
    groupSettings?: PriceSettings;
}

export interface GroupPriceContents {
    contents: string[];
}

export interface GroupPriceCreation {
    id: string;
    type: string;
    name: string;
    prices: Price[];
    settings: PriceSettings;
    contents: FolderAsset[];
}

export interface GroupPromo {
    id: string;
    alphanumericCode: string;
    discount: number;
    limit: number;
    startDate: number;
    endDate: number;
    timezone: string;
    discountApplied: string;
    assignedContentIds: string[];
    assignedGroupIds: string[];
}

export interface GroupPriceData {
    packages: GroupPrice[];
    total: number;
}

export interface GroupPromoData {
    promos: GroupPromo[];
    total: number;
}

export interface GroupsPageInfos {
    prices: GroupPriceData;
    promos: GroupPromoData;
}

export const groupsInitialState: GroupsPageInfos = {
    prices: null,
    promos: null
}
