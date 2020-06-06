import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, GroupsPageInfos, groupsInitialState  } from "./types";

const reducer: Reducer<GroupsPageInfos> = (state = groupsInitialState, action: Action) => {
    let prices = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_GROUP_PRICES :
            return {
                ...state,
                prices: action.payload.data
            }
        case ActionTypes.CREATE_GROUP_PRICE :
            prices = state.prices.prices.slice();
            prices.splice(prices.length, 0, action.payload);
            return {
                ...state,
                prices: {
                    prices: prices,
                    total: state.prices.total + 1
                }
            }
        case ActionTypes.SAVE_GROUP_PRICE :
            return {
                ...state,
                prices:{ 
                    ...state.prices,
                    prices: state.prices.prices.map((item) => {
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
        case ActionTypes.DELETE_GROUP_PRICE :
            return {
                ...state,
                prices: {
                    total: state.prices.total - 1,
                    prices: state.prices.prices.filter((item) => {return item.id !== action.payload.id})}
            }
        case ActionTypes.GET_GROUP_PROMOS :
            return {
                ...state,
                promos: action.payload.data
            }
        case ActionTypes.CREATE_GROUP_PROMO :
            promos = state.promos.promos.slice();
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: {
                    promos: promos,
                    total: state.promos.total + 1
                }
            }
        case ActionTypes.SAVE_GROUP_PROMO :
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
        case ActionTypes.DELETE_GROUP_PROMO :
            return {
                ...state,
                promos: { 
                    promos: state.promos.promos.filter((item) => {return item.id !== action.payload.id}),
                    total: state.promos.total - 1
                }
            }
        default:
            return state;
    }
};

export { reducer as GroupsReducer };
