import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes} from './types';
import { PlaylistPaywallServices } from './services';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';

export interface GetPlaylistPaywallInfo {
    type: ActionTypes.GET_PLAYLIST_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface GetPlaylistPaywallPrices {
    type: ActionTypes.GET_PLAYLIST_PAYWALL_PRICES;
    payload: {data: {prices: Preset[];}, contentId: string;};
}

export interface SavePlaylistPaywallInfos {
    type: ActionTypes.SAVE_PLAYLIST_PAYWALL_INFOS;
    payload: {data: ContentPaywallPageInfos, contentId: string};
}

export interface CreatePlaylistPricePreset {
    type: ActionTypes.CREATE_PLAYLIST_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface SavePlaylistPricePreset {
    type: ActionTypes.SAVE_PLAYLIST_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface DeletePlaylistPricePreset {
    type: ActionTypes.DELETE_PLAYLIST_PRICE_PRESET;
    payload: {data: Preset, contentId: string};
}

export interface GetPlaylistPaywallPromos {
    type: ActionTypes.GET_PLAYLIST_PAYWALL_PROMOS;
    payload: {data: {promos: Promo[];}, contentId: string};
}

export interface CreatePlaylistPromoPreset {
    type: ActionTypes.CREATE_PLAYLIST_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface SavePlaylistPromoPreset {
    type: ActionTypes.SAVE_PLAYLIST_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export interface DeletePlaylistPromoPreset {
    type: ActionTypes.DELETE_PLAYLIST_PROMO_PRESET;
    payload: {data: Promo, contentId: string};
}

export const getPlaylistPaywallInfosAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistPaywallInfo> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistPaywallInfo>) => {
        await PlaylistPaywallServices.getPlaylistPaywallInfos(playlistId)
            .then( response => {
                dispatch({type: ActionTypes.GET_PLAYLIST_PAYWALL_INFOS, payload: {data: response.data.data, contentId: playlistId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const getPlaylistPaywallPricesAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistPaywallPrices> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistPaywallPrices>) => {
        await PlaylistPaywallServices.getPlaylistPaywallPrices(playlistId)
            .then( response => {
                dispatch({type: ActionTypes.GET_PLAYLIST_PAYWALL_PRICES, payload: {data: response.data.data, contentId: playlistId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const savePlaylistPaywallInfosAction = (data: ContentPaywallPageInfos, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistPaywallInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPaywallInfos>) => {
        await PlaylistPaywallServices.savePlaylistPaywallInfos(data, playlistId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PAYWALL_INFOS, payload: {data: data, contentId: playlistId}});
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createPlaylistPricePresetAction = (data: Preset, playlistId: string): ThunkDispatch<Promise<void>, {}, CreatePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePlaylistPricePreset>) => {
        await PlaylistPaywallServices.createPlaylistPricePreset(data, playlistId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PLAYLIST_PRICE_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: playlistId}})
                dispatch(showToastNotification("Price have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePlaylistPricePresetAction = (data: Preset, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPricePreset>) => {
        await PlaylistPaywallServices.savePlaylistPricePreset(data, playlistId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PRICE_PRESET, payload: {data: data, contentId: playlistId}})
                dispatch(showToastNotification("Price have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePlaylistPricePresetAction = (data: Preset, playlistId: string): ThunkDispatch<Promise<void>, {}, DeletePlaylistPricePreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistPricePreset>) => {
        await PlaylistPaywallServices.deletePlaylistPricePreset(data, playlistId)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PLAYLIST_PRICE_PRESET, payload: {data: data, contentId: playlistId}})
                dispatch(showToastNotification("Price have been deleted", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const getPlaylistPaywallPromosAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistPaywallPromos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistPaywallPromos>) => {
        await PlaylistPaywallServices.getPlaylistPaywallPromos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PLAYLIST_PAYWALL_PROMOS, payload: {data: response.data.data, contentId: playlistId}});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const createPlaylistPromoPresetAction = (data: Promo, playlistId: string): ThunkDispatch<Promise<void>, {}, CreatePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CreatePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.createPlaylistPromoPreset(data, playlistId)
            .then( response => {
                dispatch({type: ActionTypes.CREATE_PLAYLIST_PROMO_PRESET, payload: {data: {...data, id: response.data.data.id}, contentId: playlistId}})
                dispatch(showToastNotification("Promo have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const savePlaylistPromoPresetAction = (data: Promo, playlistId: string): ThunkDispatch<Promise<void>, {}, SavePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, SavePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.savePlaylistPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_PLAYLIST_PROMO_PRESET, payload: {data: data, contentId: playlistId}})
                dispatch(showToastNotification("Promo have been saved", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}

export const deletePlaylistPromoPresetAction = (data: Promo, playlistId: string): ThunkDispatch<Promise<void>, {}, DeletePlaylistPromoPreset> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistPromoPreset>) => {
        await PlaylistPaywallServices.deletePlaylistPromoPreset(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PLAYLIST_PROMO_PRESET, payload: {data: data, contentId: playlistId}})
                dispatch(showToastNotification("Promo have been deleted", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong...", "fixed", "error"));
            })
    }
}


export type Action = GetPlaylistPaywallInfo
| GetPlaylistPaywallPrices
| CreatePlaylistPricePreset
| SavePlaylistPaywallInfos
| SavePlaylistPricePreset
| DeletePlaylistPricePreset
| GetPlaylistPaywallPromos
| CreatePlaylistPromoPreset
| SavePlaylistPromoPreset
| DeletePlaylistPromoPreset