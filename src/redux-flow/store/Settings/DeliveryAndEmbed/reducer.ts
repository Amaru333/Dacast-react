import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, DeliveryAndEmbedOptionType } from "./types";

const reducer: Reducer<DeliveryAndEmbedOptionType> = (state = {}, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_DELIVERY_AND_EMBED_OPTIONS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_DELIVERY_AND_EMBED_OPTIONS:
            console.log(state)
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

// Named export
export { reducer as DeliveryAndEmbedReducer };

