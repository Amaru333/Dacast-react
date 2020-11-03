import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, invoicesInitialState, SearchInvoicesResult  } from "./types";

const reducer: Reducer<SearchInvoicesResult> = (state = invoicesInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_INVOICES :
            return action.payload
        default: 
            return state;
    }
};

export { reducer as InvoicesReducer };