import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, Invoice, invoicesInitialState  } from "./types";

const reducer: Reducer<Invoice[]> = (state = invoicesInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_INVOICES :
            return action.payload
        default: 
            return state;
    }
};

export { reducer as InvoicesReducer };