import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes  } from "./types";
import { contentPaywallInitialState, ContentPaywallPageInfos } from '../../Paywall/Presets/types'

const reducer: Reducer<ContentPaywallPageInfos> = (state = contentPaywallInitialState, action: Action) => {
    let prices = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_VOD_PAYWALL_INFOS :
            return {
                ...state,
                ...action.payload.data
            }
        case ActionTypes.SAVE_VOD_PAYWALL_INFOS :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.GET_VOD_PAYWALL_PRICES :
            return {
                ...state,
                prices: action.payload.data.prices
            }
        case ActionTypes.CREATE_VOD_PRICE_PRESET :
            prices = state.prices.slice();
            prices.splice(prices.length, 0, action.payload);
            return {
                ...state,
                prices: prices
            }
        case ActionTypes.SAVE_VOD_PRICE_PRESET :
            state.prices.slice();
            return {
                ...state,
                prices: state.prices.map((item) => {
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
        case ActionTypes.DELETE_VOD_PRICE_PRESET :
            return {
                ...state,
                prices: state.prices.filter((item) => {return item.id !== action.payload.id})
            }
        case ActionTypes.GET_VOD_PAYWALL_PROMOS :
            return {
                ...state,
                promos: action.payload.data.promos
            }
        case ActionTypes.CREATE_VOD_PROMO_PRESET :
            promos = state.promos.slice();
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: promos
            }
        case ActionTypes.SAVE_VOD_PROMO_PRESET :
            return {
                ...state,
                promos: state.promos.map((item) => {
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
        case ActionTypes.DELETE_VOD_PROMO_PRESET :
            return {
                ...state,
                promos: state.promos.filter((item) => {return item.id !== action.payload.id})
            }
        default:
            return state;
    }
};

export { reducer as VodPaywallReducer };
