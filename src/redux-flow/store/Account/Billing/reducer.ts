
import { ActionTypes, billingInitialState, BillingPageInfos, BillingAction } from './';
import { CreditCardPayment, PaypalPayment } from './types';


export const reducer = (state = billingInitialState, action: BillingAction): BillingPageInfos => {
    switch (action.type) {
        case ActionTypes.GET_BILLING_PAGE_INFOS:
            return {...state, 
                ...action.payload
            }
        case ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD: 
            return {...state,
                paypal: Object.keys(action.payload).includes('emailAddress') ? {...action.payload} as PaypalPayment : null,
                creditCard: Object.keys(action.payload).includes('firstName') ? {...action.payload} as CreditCardPayment : null
            }
        case ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...action.payload}
            }
        case ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...action.payload}
            }
        case ActionTypes.DELETE_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: action.payload
            }      
        case ActionTypes.ADD_BILLING_PAGE_EXTRAS:          
            let newExtras = state.extras ? state.extras.slice() : [];
            newExtras.splice(newExtras.length, 0, action.payload )
            return {...state,
                extras: newExtras
            } 
        default:
            return state;
    }
};



export {reducer as BillingReducer}; 