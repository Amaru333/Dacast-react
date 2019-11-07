import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, deliveryAndEmbedInitialState, DeliveryAndEmbedState } from "./types";

const reducer: Reducer<DeliveryAndEmbedState> = (state = deliveryAndEmbedInitialState, action: Action) => {
    switch (action.type) {
        // Your Case here
        default:
            return state;
    }
};

// Named export
export { reducer as DeliveryAndEmbedReducer };

