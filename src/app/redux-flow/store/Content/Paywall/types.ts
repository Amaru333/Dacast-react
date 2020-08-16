import { ContentPaywallPageInfos } from '../../Paywall/Presets/types';

export enum ActionTypes {
    GET_CONTENT_PAYWALL_INFOS = "@@content_paywall/GET_CONTENT_PAYWALL_INFOS",
    SAVE_CONTENT_PAYWALL_INFOS ="@@content_paywall/SAVE_CONTENT_PAYWALL_INFOS",
    GET_CONTENT_PAYWALL_PRICES = "@@content_paywall/GET_CONTENT_PAYWALL_PRICES",
    CREATE_CONTENT_PRICE_PRESET = "@@content_paywall/CREATE_CONTENT_PRICE_PRESET",
    SAVE_CONTENT_PRICE_PRESET = "@@content_paywall/SAVE_CONTENT_PRICE_PRESET",
    DELETE_CONTENT_PRICE_PRESET = "@@content_paywall/DELETE_CONTENT_PRICE_PRESET",
    CREATE_CONTENT_PROMO_PRESET = "@@content_paywall/CREATE_CONTENT_PROMO_PRESET",
    SAVE_CONTENT_PROMO_PRESET = "@@content_paywall/SAVE_CONTENT_PROMO_PRESET",
    DELETE_CONTENT_PROMO_PRESET = "@@content_paywall/DELETE_CONTENT_PROMO_PRESET",
    GET_CONTENT_PAYWALL_PROMOS = "@@content_paywall/GET_CONTENT_PAYWALL_PROMOS"

}

export interface ContentPaywallState {
    [key: string]: { [key: string]: ContentPaywallPageInfos}
}