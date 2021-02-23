import { ActionTypes, GroupPrice, GroupPromo, GroupPriceData, GroupPromoData } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatPostPromoGroupInput, formatPutPromoGroupInput, formatGetPriceGroupOuput, formatPostPriceGroupInput, formatPutPriceGroupInput, formatGetPriceGroupContentsInput, formatGetPriceGroupContentsOuput, formatPostPromoGroupOutput, formatGetPromoGroupOutput, formatDeletePromoGroupInput, formatDeletePriceGroupInput, formatPostPriceGroupOutput } from './viewModel';
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

export interface GetPriceGroupContents {
    type: ActionTypes.GET_PRICE_GROUP_CONTENTS;
    payload: string;
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

export const getGroupPricesAction = applyViewModel(dacastSdk.getPricePackage, () => 'page=1&per-page=100', formatGetPriceGroupOuput, ActionTypes.GET_GROUP_PRICES, null, 'Couldn\'t get price group list')
export const createGroupPriceAction = applyViewModel(dacastSdk.postPricePackage, formatPostPriceGroupInput, formatPostPriceGroupOutput, ActionTypes.CREATE_GROUP_PRICE, 'Price group has been created', 'Couldn\'t create price group')
export const saveGroupPriceAction = applyViewModel(dacastSdk.putPricePackage, formatPutPriceGroupInput, undefined, ActionTypes.SAVE_GROUP_PRICE, 'Price group has been saved', 'Couldn\'t save price group')
export const deleteGroupPriceAction = applyViewModel(dacastSdk.deletePricePackage, formatDeletePriceGroupInput, undefined, ActionTypes.DELETE_GROUP_PRICE, 'Price group has been deleted', 'Couldn\'t delete price group')

export const getGroupPriceContentsAction = applyViewModel(dacastSdk.getPricePackageContents, formatGetPriceGroupContentsInput, formatGetPriceGroupContentsOuput, ActionTypes.GET_PRICE_GROUP_CONTENTS, null, 'Couldn\'t get price group contents')

export const getGroupPromosAction = applyViewModel(dacastSdk.getPromo, () => 'page=1&per-page=100', formatGetPromoGroupOutput, ActionTypes.GET_GROUP_PROMOS, null, 'Couldn\'t get promo group list')
export const createGroupPromoAction = applyViewModel(dacastSdk.postPromo, formatPostPromoGroupInput, formatPostPromoGroupOutput, ActionTypes.CREATE_GROUP_PROMO, 'Promo group has been created', 'Couldn\'t create promo group')
export const saveGroupPromoAction = applyViewModel(dacastSdk.putPromo, formatPutPromoGroupInput, undefined, ActionTypes.SAVE_GROUP_PROMO, 'Promo group has been saved', 'Couldn\'t save promo group')
export const deleteGroupPromoAction = applyViewModel(dacastSdk.deletePromo, formatDeletePromoGroupInput, undefined, ActionTypes.DELETE_GROUP_PROMO, 'Promo group has been deleted', 'Couldn\'t delete promo group')
