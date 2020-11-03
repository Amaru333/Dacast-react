import { ActionTypes, Preset, Promo } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPromoPresetOutput, formatPostPromoPresetInput, formatPutPromoPresetInput, formatGetPricePresetOuput, formatPutPricePresetInput, formatPostPricePresetInput, formatGetPricePresetInput, formatPostPricePresetOutput, formatDeletePricePresetInput, formatGetPromoPresetInput, formatPostPromoPresetOutput, formatDeletePromoPresetInput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

export interface GetPricePresetsList {
    type: ActionTypes.GET_PRICE_PRESETS_LIST;
    payload: {
        prices: Preset[]; 
        totalItems: number;
    };
}

export interface CreatePricePreset {
    type: ActionTypes.CREATE_PRICE_PRESET;
    payload: Preset;
}

export interface SavePricePreset {
    type: ActionTypes.SAVE_PRICE_PRESET;
    payload: Preset;
}

export interface DeletePricePreset {
    type: ActionTypes.DELETE_PRICE_PRESET;
    payload: Preset;
}

export interface GetPromoPresetsList {
    type: ActionTypes.GET_PROMO_PRESETS_LIST;
    payload: {
        promos: Promo[]; 
        totalItems: number;
    };
}

export interface CreatePromoPreset {
    type: ActionTypes.CREATE_PROMO_PRESET;
    payload: Promo;
}

export interface SavePromoPreset {
    type: ActionTypes.SAVE_PROMO_PRESET;
    payload: Promo;
}

export interface DeletePromoPreset {
    type: ActionTypes.DELETE_PROMO_PRESET;
    payload: Promo;
}

export type Action = GetPricePresetsList | CreatePricePreset | SavePricePreset | DeletePricePreset | GetPromoPresetsList | CreatePromoPreset | SavePromoPreset | DeletePromoPreset

export const getPricePresetsInfosAction = applyViewModel(dacastSdk.getPricePreset, formatGetPricePresetInput, formatGetPricePresetOuput, ActionTypes.GET_PRICE_PRESETS_LIST, null, 'Couldn\'t get price presets list')
export const createPricePresetAction = applyViewModel(dacastSdk.postPricePreset, formatPostPricePresetInput, formatPostPricePresetOutput, ActionTypes.CREATE_PRICE_PRESET, 'Price preset has been created', 'Couldn\'t create price preset')
export const savePricePresetAction = applyViewModel(dacastSdk.putPricePreset, formatPutPricePresetInput, null, ActionTypes.SAVE_PRICE_PRESET, 'Price preset has been saved', 'Couldn\'t save price preset')
export const deletePricePresetAction = applyViewModel(dacastSdk.deletePricePreset, formatDeletePricePresetInput, null, ActionTypes.DELETE_PRICE_PRESET, 'Price preset has been deleted', 'Couldn\'t delete price preset')

export const getPromoPresetsInfosAction = applyViewModel(dacastSdk.getPromoPreset, formatGetPromoPresetInput, formatGetPromoPresetOutput, ActionTypes.GET_PROMO_PRESETS_LIST, null, 'Couldn\'t get promo presets list')
export const createPromoPresetAction = applyViewModel(dacastSdk.postPromoPreset, formatPostPromoPresetInput, formatPostPromoPresetOutput, ActionTypes.CREATE_PROMO_PRESET, 'Promo preset has been created', 'Couldn\'t create promo preset')
export const savePromoPresetAction = applyViewModel(dacastSdk.putPromoPreset, formatPutPromoPresetInput, null, ActionTypes.SAVE_PROMO_PRESET, 'Promo preset has been saved', 'Couldn\'t save promo preset')
export const deletePromoPresetAction = applyViewModel(dacastSdk.deletePromoPreset, formatDeletePromoPresetInput, null, ActionTypes.SAVE_PROMO_PRESET, 'Promo preset has been deleted', 'Couldn\'t delete promo preset')