import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PayoutInfos, payoutInitialState,  } from "./types";

const reducer: Reducer<PayoutInfos> = (state = payoutInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PAYMENT_METHODS :
            return {
                ...state,
                paymentMethods: action.payload.data.paymentMethods
            }
        case ActionTypes.GET_WITHDRAWAL_REQUESTS :
            return {
                ...state,
                withdrawalRequests: action.payload.data.widthdrawals
            }
        case ActionTypes.ADD_PAYMENT_METHOD_REQUEST :
            return {
                ...state,
                paymentMethods: action.payload
            }
        case ActionTypes.DELETE_PAYMENT_METHOD_REQUEST :
            return {
                ...state,
                paymentMethods: Object.keys(state.paymentMethods).reduce((reduced, paymentRequest) => {return action.payload !== paymentRequest ? {...reduced, [paymentRequest]: state.paymentMethods[paymentRequest]} : {...reduced}}, {})
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
