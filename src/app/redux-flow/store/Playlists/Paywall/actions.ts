import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes} from './types';
import { PlaylistPaywallServices } from './services';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';

export interface GetPlaylistPaywallInfo {
    type: ActionTypes.GET_PLAYLIST_PAYWALL_INFOS;
    payload: ContentPaywallPageInfos;
}

export interface SavePlaylistPaywallInfos {
    type: ActionTypes.SAVE_PLAYLIST_PAYWALL_INFOS;
    payload: ContentPaywallPageInfos;
}

export interface CreatePlaylistPricePreset {
    type: ActionTypes.CREATE_PLAYLIST_PRICE_PRESET;
    payload: Preset;
}

export interface SavePlaylistPricePreset {
    type: ActionTypes.SAVE_PLAYLIST_PRICE_PRESET;
    payload: Preset;
}

export interface DeletePlaylistPricePreset {
    type: ActionTypes.DELETE_PLAYLIST_PRICE_PRESET;
    payload: Preset;
}

export interface CreatePlaylistPromoPreset {
    type: ActionTypes.CREATE_PLAYLIST_PROMO_PRESET;
    payload: Promo;
}

export interface SavePlaylistPromoPreset {
    type: ActionTypes.SAVE_PLAYLIST_PROMO_PRESET;
    payload: Promo;
}

export interface DeletePlaylistPromoPreset {
    type: ActionTypes.DELETE_PLAYLIST_PROMO_PRESET;
    payload: Promo;
}

export const getPlaylistPaywallInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistPaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistPaywallInfo>) => {
        await PlaylistPaywallServices.getPlaylistPaywallInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PLAYLIST_PAYWALL_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const savePlaylistPaywallInfosAction = (data: ContentPaywallPageInfos): ThunkDispatch<Promise<void>, {}, SavePlaylistPaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPaywallInfos>) => {
        await PlaylistPaywallServices.savePlaylistPaywallInfos(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PAYWALL_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createPlaylistPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, CreatePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePlaylistPricePreset>) => {
        await PlaylistPaywallServices.createPlaylistPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PLAYLIST_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePlaylistPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, SavePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPricePreset>) => {
        await PlaylistPaywallServices.savePlaylistPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePlaylistPricePresetAction = (data: Preset): ThunkDispatch<Promise<void>, {}, DeletePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistPricePreset>) => {
        await PlaylistPaywallServices.deletePlaylistPricePreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PLAYLIST_PRICE_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const createPlaylistPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, CreatePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.createPlaylistPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PLAYLIST_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePlaylistPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, SavePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.savePlaylistPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePlaylistPromoPresetAction = (data: Promo): ThunkDispatch<Promise<void>, {}, DeletePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.deletePlaylistPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PLAYLIST_PROMO_PRESET, payload: response.data})
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetPlaylistPaywallInfo
| CreatePlaylistPricePreset
| SavePlaylistPaywallInfos
| SavePlaylistPricePreset
| DeletePlaylistPricePreset
| CreatePlaylistPromoPreset
| SavePlaylistPromoPreset
| DeletePlaylistPromoPreset