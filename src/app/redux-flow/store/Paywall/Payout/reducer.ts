import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PayoutInfos, payoutInitialState, PaymentMethod, PaymentMethodType,  } from "./types";

const reducer: Reducer<PayoutInfos> = (state = payoutInitialState, action: Action) => {
    let paymentMethods: PaymentMethod[] = []
    switch (action.type) {
        case ActionTypes.GET_PAYMENT_METHODS :
            return {
                ...state,
                paymentMethods: action.payload
            }
        case ActionTypes.GET_WITHDRAWAL_REQUESTS :
            return {
                ...state,
                withdrawalRequests: action.payload
            }
        case ActionTypes.ADD_PAYMENT_METHOD :
            paymentMethods = state.paymentMethods.slice();
            paymentMethods.splice(
                paymentMethods.length, 
                0, 
                action.payload
            );
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
            let withdrawalRequests = state.withdrawalRequests.slice()
            withdrawalRequests.push(action.payload)
            return {
                ...state,
                withdrawalRequests: withdrawalRequests
            }
        case ActionTypes.CANCEL_WITHDRAWAL_REQUEST :
            return {
                ...state,
                withdrawalRequests: state.withdrawalRequests.map(item => {
                    if(item.id !== action.payload.id) {
                        return item;
                    }
                    else {
                        return {
                            ...action.payload,
                        }
                    }
                })
            }
        default:
            return state;
    }
};

export { reducer as PayoutReducer };
