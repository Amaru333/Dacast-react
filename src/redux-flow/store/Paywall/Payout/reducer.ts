import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PayoutInfos, payoutInitialState,  } from "./types";

const reducer: Reducer<PayoutInfos> = (state = payoutInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PAYOUT_INFOS :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export { reducer as PayoutReducer };
