import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PresetsPageInfos, presetsInitialState  } from "./types";

const reducer: Reducer<PresetsPageInfos> = (state = presetsInitialState, action: Action) => {
    let presets = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_PRICE_PRESETS_LIST :
            return {
                ...state,
                presets: action.payload
            }
        case ActionTypes.CREATE_PRICE_PRESET :
            presets = state.presets.prices.slice();
            presets.splice(presets.length, 0, action.payload);
            return {
                ...state,
                presets: {
                    prices: presets,
                    totalItems: state.presets.totalItems + 1
                }
            }
        case ActionTypes.SAVE_PRICE_PRESET :
            return {
                ...state,
                presets: {
                    ...state.presets,
                    prices: state.presets.prices.map((item) => {
                        if(item.id !== action.payload.id) {
                            return item;
                        }
                        else {
                            return {
                                ...item,
                                ...action.payload
                            }
                        }
                    })
                }
            }
        case ActionTypes.DELETE_PRICE_PRESET :
            return {
                ...state,
                presets: {
                    ...state.presets,
                    prices: state.presets.prices.map((item) => {
                        if(item.id === action.payload.id) {
                            return {
                                ...item,
                                isDeleted: true
                            }
                        }
                        return item
                    })
                }
            }
        case ActionTypes.GET_PROMO_PRESETS_LIST :
            return {
                ...state,
                promos: action.payload
            }
        case ActionTypes.CREATE_PROMO_PRESET :
            promos = state.promos.promos.slice();
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: {
                    promos: promos,
                    totalItems: state.promos.totalItems + 1
                }
            }
        case ActionTypes.SAVE_PROMO_PRESET :
            return {
                ...state,
                promos: {
                    ...state.promos,
                    promos: state.promos.promos.map((item) => {
                        if(item.id !== action.payload.id) {
                            return item;
                        }
                        else {
                            return {
                                ...item,
                                ...action.payload
                            }
                        }
                    })
                }
            }
        case ActionTypes.DELETE_PROMO_PRESET :
            return {
                ...state,
                promos: {
                    ...state.promos,
                    promos: state.promos.promos.map((item) => {
                        if(item.id === action.payload.id) {
                            return {
                                ...item,
                                isDeleted: true
                            }
                        }
                        return item
                    })
                }
            }
        default:
            return state;
    }
};

export { reducer as PresetsReducer };
