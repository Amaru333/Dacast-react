import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, GroupsPageInfos, groupsInitialState  } from "./types";

const reducer: Reducer<GroupsPageInfos> = (state = groupsInitialState, action: Action) => {
    let prices = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_GROUPS_INFOS :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.CREATE_GROUP_PRICE :
            prices = state.prices.slice();
            prices.splice(prices.length, 0, action.payload);
            return {
                ...state,
                prices: prices
            }
        case ActionTypes.SAVE_GROUP_PRICE :
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
        case ActionTypes.DELETE_GROUP_PRICE :
            return {
                ...state,
                prices: state.prices.filter((item) => {return item.id !== action.payload.id})
            }
        case ActionTypes.CREATE_GROUP_PROMO :
            promos = state.promos.slice();
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: promos
            }
        case ActionTypes.SAVE_GROUP_PROMO :
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
        case ActionTypes.DELETE_GROUP_PROMO :
            return {
                ...state,
                promos: state.promos.filter((item) => {return item.id !== action.payload.id})
            }
        default:
            return state;
    }
};

export { reducer as GroupsReducer };
