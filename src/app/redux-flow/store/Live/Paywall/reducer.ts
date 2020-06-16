import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes  } from "./types";
import { ContentPaywallState } from '../../Paywall/Presets';

const reducer: Reducer<ContentPaywallState> = (state = {}, action: Action) => {
    let prices = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_LIVE_PAYWALL_INFOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...action.payload.data
                }
            }
        case ActionTypes.SAVE_LIVE_PAYWALL_INFOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...action.payload.data
                }
            }
        case ActionTypes.GET_LIVE_PAYWALL_PRICES :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: action.payload.data.prices
                }
            }
        case ActionTypes.CREATE_LIVE_PRICE_PRESET :
            prices = state[action.payload.contentId].prices.slice();
            prices.splice(prices.length, 0, action.payload.data);
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: prices
                }
            }
        case ActionTypes.SAVE_LIVE_PRICE_PRESET :
            state[action.payload.contentId].prices.slice();
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: state[action.payload.contentId].prices.map((item) => {
                        if(item.id !== action.payload.data.id) {
                            return item;
                        }
                        else {
                            return {
                                ...item,
                                ...action.payload.data
                            }
                        }
                    })
                }

            }
        case ActionTypes.DELETE_LIVE_PRICE_PRESET :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: state[action.payload.contentId].prices.filter((item) => {return item.id !== action.payload.data.id})

                }
            }
        case ActionTypes.GET_LIVE_PAYWALL_PROMOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: action.payload.data.promos
                }
            }
        case ActionTypes.CREATE_LIVE_PROMO_PRESET :
            promos = state[action.payload.contentId].promos.slice();
            promos.splice(promos.length, 0, action.payload.data);
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: promos
                }
            }
        case ActionTypes.SAVE_LIVE_PROMO_PRESET :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: state[action.payload.contentId].promos.map((item) => {
                        if(item.id !== action.payload.data.id) {
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
        case ActionTypes.DELETE_LIVE_PROMO_PRESET :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: state[action.payload.contentId].promos.filter((item) => {return item.id !== action.payload.data.id})
                }
            }
        default:
            return state;
    }
};

export { reducer as LivePaywallReducer };
