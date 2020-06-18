import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes  } from "./types";
import { ContentPaywallState } from '../../Paywall/Presets/types'

const reducer: Reducer<ContentPaywallState> = (state = {}, action: Action) => {
    let prices = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_VOD_PAYWALL_INFOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...action.payload.data
                }
            }
        case ActionTypes.SAVE_VOD_PAYWALL_INFOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    ...action.payload.data
                }
            }
        case ActionTypes.GET_VOD_PAYWALL_PRICES :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: action.payload.data.prices.map((price) => {
                        return {
                            ...price,
                            prices: price.prices,
                            settings: {
                                ...price.settings,
                                startMethod: price.settings.startDate ? 'Schedule' : 'Upon Purchase',
                                recurrence: price.settings.recurrence ? {
                                    recurrence: price.settings.recurrence.recurrence === 'week' ? 'Weekly'
                                    : price.settings.recurrence.value > 4 ? 'Biannual'
                                    : price.settings.recurrence.value < 1 ? 'Quaterly'
                                    : 'Monthly'
                                } 
                                : null
                            },
                            type: price.settings.recurrence ? 'Subscription' : 'Pay Per View'
                        }
                    })
                }
            }
        case ActionTypes.CREATE_VOD_PRICE_PRESET :
            prices = state[action.payload.contentId].prices.slice();
            prices.splice(prices.length, 0, action.payload.data);
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: prices
                }
            }
        case ActionTypes.SAVE_VOD_PRICE_PRESET :
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
        case ActionTypes.DELETE_VOD_PRICE_PRESET :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    prices: state[action.payload.contentId].prices.filter((item) => {return item.id !== action.payload.data.id})
                }
            }
        case ActionTypes.GET_VOD_PAYWALL_PROMOS :
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: action.payload.data.promos
                }
            }
        case ActionTypes.CREATE_VOD_PROMO_PRESET :
            promos = state[action.payload.contentId].promos.slice();
            promos.splice(promos.length, 0, action.payload.data);
            return {
                ...state,
                [action.payload.contentId]: {
                    ...state[action.payload.contentId],
                    promos: promos
                }
            }
        case ActionTypes.SAVE_VOD_PROMO_PRESET :
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
        case ActionTypes.DELETE_VOD_PROMO_PRESET :
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

export { reducer as VodPaywallReducer };
