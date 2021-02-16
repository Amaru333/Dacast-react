import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, GroupsPageInfos, groupsInitialState  } from "./types";

const reducer: Reducer<GroupsPageInfos> = (state = groupsInitialState, action: Action) => {
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_GROUP_PRICES :
            return {
                ...state,
                prices: action.payload
            }
        case ActionTypes.CREATE_GROUP_PRICE :
            return state
        case ActionTypes.SAVE_GROUP_PRICE :
            return {
                ...state,
                prices:{ 
                    ...state.prices,
                    packages: state.prices.packages.map((item) => {
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
                    packages: state.prices.packages.filter((item) => {return item.id !== action.payload.id})}
            }
        case ActionTypes.GET_GROUP_PROMOS :
            return {
                ...state,
                promos: action.payload
            }
        case ActionTypes.CREATE_GROUP_PROMO :
            promos = state.promos.promos.slice();
            promos.splice(promos.length, 0, { ...action.payload, timezone: null});
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
                                ...action.payload,
                                timezone: null
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
