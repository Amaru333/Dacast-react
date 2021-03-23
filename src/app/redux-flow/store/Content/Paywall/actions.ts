import { ActionTypes } from './types';
import { ContentPaywallDetails, ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets/types';
import { applyViewModel } from '../../../../utils/utils';
import { ContentType } from "../../Common/types";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatDeleteContentPriceInput, formatDeleteContentPriceOutput, formatDeleteContentPromoInput, formatGetContentPaywallInfoInput, formatGetContentPaywallInfoOutput, formatGetContentPricesInput, formatGetContentPricesOutput, formatGetContentPromosInput, formatGetContentPromosOutput, formatPostContentPriceInput, formatPostContentPriceOutput, formatPostContentPromoInput, formatPostContentPromoOutput, formatPutContentPaywallInfoInput, formatPutContentPaywallInfoOutput, formatPutContentPriceInput, formatPutContentPromoInput } from "./viewModel";

export interface GetContentPaywallInfo {
    type: ActionTypes.GET_CONTENT_PAYWALL_INFOS;
    payload: {data: ContentPaywallDetails, contentId: string, contentType: ContentType};
}

export interface SaveContentPaywallInfos {
    type: ActionTypes.SAVE_CONTENT_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string, contentType: ContentType};
}

export interface GetContentPaywallPrices {
    type: ActionTypes.GET_CONTENT_PAYWALL_PRICES;
    payload: {data: Preset[], contentId: string, contentType: ContentType};
}


export interface CreateContentPricePreset {
    type: ActionTypes.CREATE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: ContentType};
}

export interface SaveContentPricePreset {
    type: ActionTypes.SAVE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: ContentType};
}

export interface DeleteContentPricePreset {
    type: ActionTypes.DELETE_CONTENT_PRICE_PRESET;
    payload: {data: Preset, contentId: string, contentType: ContentType};
}

export interface GetContentPaywallPromos {
    type: ActionTypes.GET_CONTENT_PAYWALL_PROMOS;
    payload: {data: Promo[], contentId: string, contentType: ContentType};
}

export interface CreateContentPromoPreset {
    type: ActionTypes.CREATE_CONTENT_PROMO_PRESET;
    payload: {promo: Promo, contentId: string, contentType: ContentType};
}

export interface SaveContentPromoPreset {
    type: ActionTypes.SAVE_CONTENT_PROMO_PRESET;
    payload: {promo: Promo, contentId: string, contentType: ContentType};
}

export interface DeleteContentPromoPreset {
    type: ActionTypes.DELETE_CONTENT_PROMO_PRESET;
    payload: {promo: Promo, contentId: string, contentType: ContentType};
}

export type Action = GetContentPaywallInfo | GetContentPaywallPrices | CreateContentPricePreset | SaveContentPaywallInfos | SaveContentPricePreset | DeleteContentPricePreset | GetContentPaywallPromos | CreateContentPromoPreset | SaveContentPromoPreset | DeleteContentPromoPreset

export const getContentPaywallInfosAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodPaywallInfo, formatGetContentPaywallInfoInput, formatGetContentPaywallInfoOutput(contentType), ActionTypes.GET_CONTENT_PAYWALL_INFOS, null, 'Couldn\'t vod paywall info')
        case 'live':
            return applyViewModel(dacastSdk.getChannelPaywallInfo, formatGetContentPaywallInfoInput, formatGetContentPaywallInfoOutput(contentType), ActionTypes.GET_CONTENT_PAYWALL_INFOS, null, 'Couldn\'t live paywall info')
        case 'playlist':
            return applyViewModel(dacastSdk.getPlaylistPaywallInfo, formatGetContentPaywallInfoInput, formatGetContentPaywallInfoOutput(contentType), ActionTypes.GET_CONTENT_PAYWALL_INFOS, null, 'Couldn\'t playlist paywall info')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const saveContentPaywallInfosAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodPaywallInfo, formatPutContentPaywallInfoInput, formatPutContentPaywallInfoOutput(contentType), ActionTypes.SAVE_CONTENT_PAYWALL_INFOS, 'Changes saved', 'Couldn\'t save changes')
        case 'live':
            return applyViewModel(dacastSdk.putChannelPaywallInfo, formatPutContentPaywallInfoInput, formatPutContentPaywallInfoOutput(contentType), ActionTypes.SAVE_CONTENT_PAYWALL_INFOS, 'Changes saved', 'Couldn\'t save changes')
        case 'playlist':
            return applyViewModel(dacastSdk.putPlaylistPaywallInfo, formatPutContentPaywallInfoInput, formatPutContentPaywallInfoOutput(contentType), ActionTypes.SAVE_CONTENT_PAYWALL_INFOS, 'Changes saved', 'Couldn\'t save changes')
        default:
            throw new Error('Error applying put lock content view model')
    }
}

export const getContentPaywallPricesAction = applyViewModel(dacastSdk.getContentPrices, formatGetContentPricesInput, formatGetContentPricesOutput, ActionTypes.GET_CONTENT_PAYWALL_PRICES, null, 'Couldn\'t get content prices')
export const createContentPricePresetAction = applyViewModel(dacastSdk.postContentPrice, formatPostContentPriceInput, formatPostContentPriceOutput, ActionTypes.CREATE_CONTENT_PRICE_PRESET, 'Price created', 'Couldn\'t create price')
export const saveContentPricePresetAction = applyViewModel(dacastSdk.putContentPrice, formatPutContentPriceInput, undefined, ActionTypes.SAVE_CONTENT_PAYWALL_INFOS, 'Price saved', 'Couldn\'t save price')
export const deleteContentPricePresetAction = applyViewModel(dacastSdk.deleteContentPrice, formatDeleteContentPriceInput, formatDeleteContentPriceOutput, ActionTypes.DELETE_CONTENT_PRICE_PRESET, 'Price deleted', 'Couldn\'t delete price')

export const getContentPaywallPromosAction = applyViewModel(dacastSdk.getPromo, formatGetContentPromosInput, formatGetContentPromosOutput, ActionTypes.GET_CONTENT_PAYWALL_PROMOS, null, 'Couldn\'t get promos')
export const createContentPromoPresetAction = applyViewModel(dacastSdk.postPromo, formatPostContentPromoInput, formatPostContentPromoOutput, ActionTypes.CREATE_CONTENT_PROMO_PRESET, 'Promo created', 'Couldn\'t create promo')
export const saveContentPromoPresetAction = applyViewModel(dacastSdk.putPromo, formatPutContentPromoInput, undefined, ActionTypes.SAVE_CONTENT_PROMO_PRESET, 'Promo saved', 'Couldn\'t save promo')
export const deleteContentPromoPresetAction = applyViewModel(dacastSdk.deletePromo, formatDeleteContentPromoInput, undefined, ActionTypes.DELETE_CONTENT_PROMO_PRESET, 'Promo deleted', 'Couldn\'t delete promo')