
import { ActionTypes, billingInitialState, BillingPageInfos, BillingAction } from './';


export const reducer = (state = billingInitialState, action: BillingAction): BillingPageInfos => {
    switch (action.type) {
        case ActionTypes.GET_BILLING_PAGE_PAYMENT_METHOD:
            return {...state, 
                ...action.payload
            }
        case ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD:
            return {...state,
                ...action.payload
            }
        case ActionTypes.CREATE_BILLING_PAGE_PAYMENT_METHOD:     
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export {reducer as BillingReducer}; 