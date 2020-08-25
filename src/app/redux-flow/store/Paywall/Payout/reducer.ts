import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PayoutInfos, payoutInitialState, PaymentMethod,  } from "./types";

const reducer: Reducer<PayoutInfos> = (state = payoutInitialState, action: Action) => {
    let paymentMethods: PaymentMethod[] = []
    switch (action.type) {
        case ActionTypes.GET_PAYMENT_METHODS :
            return {
                ...state,
                paymentMethods: action.payload.data.paymentMethods
            }
        case ActionTypes.GET_WITHDRAWAL_REQUESTS :
            return {
                ...state,
                withdrawalRequests: action.payload.data.withdrawals
            }
        case ActionTypes.ADD_PAYMENT_METHOD :
            paymentMethods = state.paymentMethods.slice();
            paymentMethods.splice(paymentMethods.length, 0, action.payload);
            return {
                ...state,
                paymentMethods: paymentMethods
            }
        case ActionTypes.UPDATE_PAYMENT_METHOD :
            return {
                ...state,
                paymentMethods: state.paymentMethods.map((item) => {
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
        case ActionTypes.DELETE_PAYMENT_METHOD :
            return {
                ...state,
                paymentMethods: state.paymentMethods.filter(p => p.id !== action.payload.id)
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
