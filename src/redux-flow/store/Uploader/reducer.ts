import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, uploaderInitialState, UploaderState } from "./types";

const reducer: Reducer<UploaderState> = (state = uploaderInitialState, action: Action) => {
    switch (action.type) {
        // Your Case here
        default:
            return state;
    }
};

// Named export
export { reducer as UploaderReducer };

