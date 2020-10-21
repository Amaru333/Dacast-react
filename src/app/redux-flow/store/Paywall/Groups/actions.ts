import { ActionTypes, GroupPrice, GroupPromo, GroupPriceData, GroupPromoData } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatPostPromoGroupInput, formatPutPromoGroupInput, formatGetPriceGroupOuput, formatPostPriceGroupInput, formatPutPriceGroupInput, formatPostPromoGroupOutput, formatGetPromoGroupOutput, formatDeletePromoGroupInput, formatDeletePriceGroupInput, formatPostPriceGroupOutput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetGroupPrices {
    type: ActionTypes.GET_GROUP_PRICES;
    payload: GroupPriceData;
}

export interface CreateGroupPrice {
    type: ActionTypes.CREATE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface SaveGroupPrice {
    type: ActionTypes.SAVE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface DeleteGroupPrice {
    type: ActionTypes.DELETE_GROUP_PRICE;
    payload: GroupPrice;
}

export interface GetGroupPromos {
    type: ActionTypes.GET_GROUP_PROMOS;
    payload: GroupPromoData;
}

export interface CreateGroupPromo {
    type: ActionTypes.CREATE_GROUP_PROMO;
    payload: GroupPromo;
}

export interface SaveGroupPromo {
    type: ActionTypes.SAVE_GROUP_PROMO;
    payload: GroupPromo;
}

export interface DeleteGroupPromo {
    type: ActionTypes.DELETE_GROUP_PROMO;
    payload: GroupPromo;
}

export type Action = GetGroupPrices | CreateGroupPrice | SaveGroupPrice | DeleteGroupPrice | GetGroupPromos | CreateGroupPromo | SaveGroupPromo| DeleteGroupPromo

export const getGroupPricesAction = applyViewModel(dacastSdk.getPricePackage, () => 'page=1&per-page=100', formatGetPriceGroupOuput, ActionTypes.GET_GROUP_PRICES, null, 'failed to get prices')

export const createGroupPriceAction = applyViewModel(dacastSdk.postPricePackage, formatPostPriceGroupInput, formatPostPriceGroupOutput, ActionTypes.CREATE_GROUP_PRICE, 'price has been created', 'failed to create price')

export const saveGroupPriceAction = applyViewModel(dacastSdk.putPricePackage, formatPutPriceGroupInput, undefined, ActionTypes.SAVE_GROUP_PRICE, 'price has been saved', 'failed to save price')

export const deleteGroupPriceAction = applyViewModel(dacastSdk.deletePricePackage, formatDeletePriceGroupInput, undefined, ActionTypes.DELETE_GROUP_PRICE, 'price has been deleted', 'failed to delete price')

export const getGroupPromosAction = applyViewModel(dacastSdk.getPromo, () => 'page=1&per-page=100', formatGetPromoGroupOutput, ActionTypes.GET_GROUP_PROMOS, null, 'failed to get promo')

export const createGroupPromoAction = applyViewModel(dacastSdk.postPromo, formatPostPromoGroupInput, formatPostPromoGroupOutput, ActionTypes.CREATE_GROUP_PROMO, 'promo has been created', 'failed to create promo')

export const saveGroupPromoAction = applyViewModel(dacastSdk.putPromo, formatPutPromoGroupInput, undefined, ActionTypes.SAVE_GROUP_PROMO, 'promo has been saved', 'failed to save promo')

export const deleteGroupPromoAction = applyViewModel(dacastSdk.deletePromo, formatDeletePromoGroupInput, undefined, ActionTypes.DELETE_GROUP_PROMO, 'promo has been deleted', 'failed to delete promo')