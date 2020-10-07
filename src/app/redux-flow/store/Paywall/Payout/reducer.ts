import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, PayoutInfos, payoutInitialState, PaymentMethod, PaymentMethodType,  } from "./types";
import { capitalizeFirstLetter } from '../../../../../utils/utils';

const reducer: Reducer<PayoutInfos> = (state = payoutInitialState, action: Action) => {
    let paymentMethods: PaymentMethod[] = []
    switch (action.type) {
        case ActionTypes.GET_PAYMENT_METHODS :
            return {
                ...state,
                paymentMethods: action.payload.data.paymentMethods.map(p => {
                    return {
                        ...p,
                        paymentMethodType: p.paymentMethodType === 'us-transfer' ? PaymentMethodType.BankAccountUS : p.paymentMethodType === 'international-transfer' ? PaymentMethodType.BankAccountInternational : p.paymentMethodType === 'check' ? PaymentMethodType.Check : PaymentMethodType.PayPal
                    }
                })
            }
        case ActionTypes.GET_WITHDRAWAL_REQUESTS :
            return {
                ...state,
                withdrawalRequests: action.payload.data.withdrawals.map(r => {
                    return {
                        ...r,
                        status: capitalizeFirstLetter(r.status) as 'Completed' | 'Cancelled' | 'Pending'
                    }
                })
            }
        case ActionTypes.ADD_PAYMENT_METHOD :
            paymentMethods = state.paymentMethods.slice();
            paymentMethods.splice(
                paymentMethods.length, 
                0, 
                {
                    ...action.payload,
                    paymentMethodType: action.payload.paymentMethodType === 'us-transfer' ? PaymentMethodType.BankAccountUS : action.payload.paymentMethodType === 'international-transfer' ? PaymentMethodType.BankAccountInternational : action.payload.paymentMethodType === 'check' ? PaymentMethodType.Check : PaymentMethodType.PayPal
                 });
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
                            ...action.payload,
                            paymentMethodType: action.payload.paymentMethodType === 'us-transfer' ? PaymentMethodType.BankAccountUS : action.payload.paymentMethodType === 'international-transfer' ? PaymentMethodType.BankAccountInternational : action.payload.paymentMethodType === 'check' ? PaymentMethodType.Check : PaymentMethodType.PayPal
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
        case ActionTypes.DELETE_PAYMENT_METHOD :
            return {
                ...state,
                withdrawalRequests: state.withdrawalRequests.filter(p => p.id !== action.payload.id)
            }
        default:
            return state;
    }
};

export { reducer as PayoutReducer };
