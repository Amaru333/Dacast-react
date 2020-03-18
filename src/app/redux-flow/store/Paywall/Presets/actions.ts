import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PresetsPageInfos, Preset, Promo } from './types';
import { PresetsServices } from './services';

export interface GetPresetsInfo {
    type: ActionTypes.GET_PRESETS_INFOS;
    payload: PresetsPageInfos;
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

export const getPresetsInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPresetsInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPresetsInfo>) => {
        await PresetsServices.getPresetsInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PRESETS_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, CreatePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePricePreset>) => {
        await PresetsServices.createPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, SavePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePricePreset>) => {
        await PresetsServices.savePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, DeletePricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePricePreset>) => {
        await PresetsServices.deletePricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const createPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, CreatePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePromoPreset>) => {
        await PresetsServices.createPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, SavePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePromoPreset>) => {
        await PresetsServices.savePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, DeletePromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePromoPreset>) => {
        await PresetsServices.deletePromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetPresetsInfo
| CreatePricePreset
| SavePricePreset
| DeletePricePreset
| CreatePromoPreset
| SavePromoPreset
| DeletePromoPreset