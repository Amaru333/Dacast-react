import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PresetsPageInfos, presetsInitialState  } from "./types";

const reducer: Reducer<PresetsPageInfos> = (state = presetsInitialState, action: Action) => {
    let presets = state.presets.slice();
    let promos = state.promos.slice();
    switch (action.type) {
        case ActionTypes.GET_PRESETS_INFOS :
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.CREATE_PRICE_PRESET :
            presets.splice(presets.length, 0, action.payload);
            return {
                ...state,
                presets: presets
            }
        case ActionTypes.SAVE_PRICE_PRESET :
            return {
                ...state,
                presets: presets.map((item) => {
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
        case ActionTypes.DELETE_PRICE_PRESET :
            return {
                ...state,
                presets: state.presets.filter((item) => {return item.id !== action.payload.id})
            }
        case ActionTypes.CREATE_PROMO_PRESET :
            promos.splice(promos.length, 0, action.payload);
            return {
                ...state,
                promos: promos
            }
        case ActionTypes.SAVE_PROMO_PRESET :
            return {
                ...state,
                promos: promos.map((item) => {
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
        case ActionTypes.DELETE_PROMO_PRESET :
            return {
                ...state,
                promos: state.promos.filter((item) => {return item.id !== action.payload.id})
            }
        default:
            return state;
    }
};

export { reducer as PresetsReducer };
