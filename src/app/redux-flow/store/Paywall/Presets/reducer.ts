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
                presets: {
                    totalItems: action.payload.data.totalItems,
                    prices: action.payload.data.presets.map((preset: any) => {
                        return {
                            id: preset.id,
                            name: preset.name,
                            prices: preset.preset.prices,
                            settings: {
                                ...preset.preset.settings,
                                startMethod: preset.preset.settings.startDate ? 'Schedule' : 'Upon Purchase',
                                recurrence: preset.preset.settings.recurrence ? {
                                    recurrence: preset.preset.settings.recurrence.recurrence === 'week' ? 'Weekly'
                                    : preset.preset.settings.recurrence.value > 4 ? 'Biannual'
                                    : preset.preset.settings.recurrence.value < 1 ? 'Quaterly'
                                    : 'Monthly'
                                } 
                                : null
                            },
                            type: preset.preset.settings.recurrence ? 'Subscription' : 'Pay Per View'

                        }
                    })
                }
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
                    prices: state.presets.prices.filter((item) => {return item.id !== action.payload.id})
                }
            }
        case ActionTypes.GET_PROMO_PRESETS_LIST :
            return {
                ...state,
                promos: {
                    totalItems: action.payload.data.totalItems,
                    promos: action.payload.data.promos.map((promo) => {
                        return {
                            ...promo,
                            rateType: promo.discountApplied ? 'Subscription' : 'Pay Per View'
                        }
                    })
                }
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
                    promos: state.promos.promos.filter((item) => {return item.id !== action.payload.id})
                }
            }
        default:
            return state;
    }
};

export { reducer as PresetsReducer };
