import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, ContentPaywallState  } from "./types";
import { userToken } from '../../../../utils/token';
import { capitalizeFirstLetter } from '../../../../../utils/utils';

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
                data = action.payload.data
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
                    prices: action.payload.data.prices.map((price) => {
                        return {
                            ...price,
                            prices: price.prices,
                            settings: {
                                ...price.settings,
                                duration: price.settings.duration ? {
                                    value: price.settings.duration.value,
                                    unit: capitalizeFirstLetter(price.settings.duration.unit) + 's'
                                } 
                                : null,
                                startMethod: price.settings.startDate > Math.round(Date.now() / 1000) ? 'Schedule' : 'Upon Purchase',
                                recurrence: price.settings.recurrence ? {
                                    unit: price.settings.recurrence.unit === 'week' ? 'Weekly'
                                    : price.settings.recurrence.value > 4 ? 'Biannual'
                                    : price.settings.recurrence.value > 1 ? 'Quarterly'
                                    : 'Monthly'
                                } 
                                : null
                            },
                            priceType: price.settings.recurrence ? 'Subscription' : 'Pay Per View'
                        }
                    })
                }
            } else {
                data = {
                    promos: [],
                    paywallEnabled: false,
                    introVodId: '',
                    selectedTheme: null,
                    prices: action.payload.data.prices.map((price) => {
                        return {
                            ...price,
                            prices: price.prices,
                            settings: {
                                ...price.settings,
                                duration: price.settings.duration ? {
                                    value: price.settings.duration.value,
                                    unit: capitalizeFirstLetter(price.settings.duration.unit) + 's'
                                } 
                                : null,
                                startMethod: price.settings.startDate > Math.round(Date.now() / 1000) ? 'Schedule' : 'Upon Purchase',
                                recurrence: price.settings.recurrence ? {
                                    unit: price.settings.recurrence.unit === 'week' ? 'Weekly'
                                    : price.settings.recurrence.value > 4 ? 'Biannual'
                                    : price.settings.recurrence.value > 1 ? 'Quarterly'
                                    : 'Monthly'
                                } 
                                : null
                            },
                            priceType: price.settings.recurrence ? 'Subscription' : 'Pay Per View'
                        }
                    })
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
            }
        case ActionTypes.DELETE_CONTENT_PRICE_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        prices: state[action.payload.contentType][action.payload.contentId].prices.filter((item) => {return item.id !== action.payload.data.id})
    
                    }
                }
            }
        case ActionTypes.GET_CONTENT_PAYWALL_PROMOS :
            const userId = userToken.getUserInfoItem('custom:dacast_user_id')
            if (state[action.payload.contentType]) {
                data = {
                    ...state[action.payload.contentType][action.payload.contentId],
                    promos: action.payload.data.promos.filter(f => f.assignedContentIds.indexOf(`${userId}-${action.payload.contentType}-${action.payload.contentId}`) !== -1).map((promo) => {
                        return {
                            ...promo
                        }
                    })
                }
            } else {
                data = {
                    prices: [],
                    paywallEnabled: false,
                    introVodId: '',
                    selectedTheme: null,
                    promos: action.payload.data.promos.filter(f => f.assignedContentIds.indexOf(`${userId}-${action.payload.contentType}-${action.payload.contentId}`) !== -1).map((promo) => {
                        return {
                            ...promo
                        }
                    })
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
            promos.splice(promos.length, 0, action.payload.data);
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
            }
        case ActionTypes.DELETE_CONTENT_PROMO_PRESET :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId]: {
                        ...state[action.payload.contentType][action.payload.contentId],
                        promos: state[action.payload.contentType][action.payload.contentId].promos.filter((item) => {return item.id !== action.payload.data.id})
                    }
                }
            }
        default:
            return state;
    }
};

export { reducer as ContentPaywallReducer };
