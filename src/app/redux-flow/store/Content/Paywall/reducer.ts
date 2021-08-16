import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, ContentPaywallState  } from "./types";

const reducer: Reducer<ContentPaywallState> = (state = {}, action: Action) => {
    let prices = null;
    let promos = null;
    let data = null;
    switch (action.type) {
        case ActionTypes.GET_CONTENT_PAYWALL_INFOS :
            if (state[action.payload.contentType]) {
                data = {
                    ...state[action.payload.contentType][action.payload.contentId],
                    ...action.payload.data
                }
            } else {
                data = {
                    ...action.payload.data,
                    promos: [],
                    prices: []
                }
            }
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: data
                }
                
            }
        case ActionTypes.SAVE_CONTENT_PAYWALL_INFOS :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        ...action.payload.data
                    }
                }
            }
        case ActionTypes.GET_CONTENT_PAYWALL_PRICES :
            if (state[action.payload.contentType]) {
                data = {
                    ...state[action.payload.contentType][action.payload.contentId],
                    prices: action.payload.data
                }
            } else {
                data = {
                    promos: [],
                    paywallEnabled: false,
                    introVodId: '',
                    selectedTheme: null,
                    prices: action.payload.data
                }
            }
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: data
                }        
            }
        case ActionTypes.CREATE_CONTENT_PRICE_PRESET :
            prices = state[action.payload.contentType][action.payload.contentId].prices.slice();
            prices.splice(prices.length, 0, action.payload.data);
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        prices: prices
                    }
                }
            }
        case ActionTypes.SAVE_CONTENT_PRICE_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        prices: state[action.payload.contentType][action.payload.contentId].prices.map((item) => {
                            if(item.id === action.payload.data.id) {
                                return {
                                    ...item,
                                    ...action.payload.data
                                }
                            }
                            return item
                        })
                    }
                }
            }
        case ActionTypes.DELETE_CONTENT_PRICE_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        prices: state[action.payload.contentType][action.payload.contentId].prices.map((item) => {
                            if(item.id === action.payload.data.id) {
                                return {
                                    ...item,
                                    isDeleted: true
                                }
                            }
                            return item
                        })
                    }
                }
            }
        case ActionTypes.GET_CONTENT_PAYWALL_PROMOS :
            if (state[action.payload.contentType]) {
                data = {
                    ...state[action.payload.contentType][action.payload.contentId],
                    promos: action.payload.data
                }
            } else {
                data = {
                    prices: [],
                    paywallEnabled: false,
                    introVodId: '',
                    selectedTheme: null,
                    promos: action.payload.data
                }
            }
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: data
                }
            }
        case ActionTypes.CREATE_CONTENT_PROMO_PRESET :
            promos = state[action.payload.contentType][action.payload.contentId].promos.slice();
            promos.splice(promos.length, 0, action.payload.promo);
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        promos: promos
                    }
                }
            }
        case ActionTypes.SAVE_CONTENT_PROMO_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        promos: state[action.payload.contentType][action.payload.contentId].promos.map((item) => {
                            if(item.id === action.payload.promo.id) {
                                return {
                                    ...item,
                                    ...action.payload.promo
                                }
                            }
                            return item
                        })
                    } 
                }
            }
        case ActionTypes.DELETE_CONTENT_PROMO_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        promos: state[action.payload.contentType][action.payload.contentId].promos.map((item) => {
                            if(item.id === action.payload.promo.id) {
                                return {
                                    ...item,
                                    isDeleted: true
                                }
                            }
                            return item
                        })
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as ContentPaywallReducer };
