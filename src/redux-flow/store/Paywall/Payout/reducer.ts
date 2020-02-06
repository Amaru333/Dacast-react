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
        case ActionTypes.ADD_PAYMENT_METHOD_REQUEST :
            return {
                ...state,
                paymentMethodRequests: {...state.paymentMethodRequests, ...action.payload}
            }
        case ActionTypes.DELETE_PAYMENT_METHOD_REQUEST :
            return {
                ...state,
                paymentMethodRequests: Object.keys(state.paymentMethodRequests).reduce((reduced, paymentRequest) => {return action.payload !== paymentRequest ? {...reduced, [paymentRequest]: state.paymentMethodRequests[paymentRequest]} : {...reduced}}, {})
            }
        case ActionTypes.ADD_WITHDRAWAL_REQUEST :
            let withdrawalRequests = [];
            withdrawalRequests = [{...action.payload}]
            return {
                ...state,
                withdrawalRequests: withdrawalRequests
            }
        default:
            return state;
    }
};

export { reducer as PayoutReducer };
