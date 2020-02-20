import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, livePaywallInitialState, LivePaywallPageInfos  } from "./types";

const reducer: Reducer<LivePaywallPageInfos> = (state = livePaywallInitialState, action: Action) => {
    let presets = null;
    let promos = null;
    switch (action.type) {
        case ActionTypes.GET_LIVE_PAYWALL_INFOS :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SAVE_LIVE_PAYWALL_INFOS :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.CREATE_LIVE_PRICE_PRESET :
            presets = state.presets.slice();
            presets.splice(presets.length, 0, action.payload);
            return {
                ...state,
                presets: presets
            }
        case ActionTypes.SAVE_LIVE_PRICE_PRESET :
            state.presets.slice();
            return {
                ...state,
                presets: state.presets.map((item) => {
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
        case ActionTypes.DELETE_LIVE_PRICE_PRESET :
            return {
                ...state,
                presets: state.presets.filter((item) => {return item.id !== action.payload.id})
            }
        case ActionTypes.CREATE_LIVE_PROMO_PRESET :
            promos = state.promos.slice();
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: promos
            }
        case ActionTypes.SAVE_LIVE_PROMO_PRESET :
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
        case ActionTypes.DELETE_LIVE_PROMO_PRESET :
            return {
                ...state,
                promos: state.promos.filter((item) => {return item.id !== action.payload.id})
            }
        default:
            return state;
    }
};

export { reducer as LivePaywallReducer };