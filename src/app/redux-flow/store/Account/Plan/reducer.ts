
import { ActionTypes, BillingPageInfos, PlanAction } from '.';
import { planInitialState } from './types';


export const reducer = (state = planInitialState, action: PlanAction): BillingPageInfos => {
    switch (action.type) {
        case ActionTypes.GET_BILLING_PAGE_INFOS:
            return {...state, 
                ...action.payload.data
            }
        case ActionTypes.SAVE_BILLING_PAGE_PAYMENT_METHOD: 
            return state;
            
        case ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...state.playbackProtection, ...action.payload}
            }
        case ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...state.playbackProtection, ...action.payload}
            } 
        case ActionTypes.ADD_BILLING_PAGE_EXTRAS:          
            let newExtras = state.extras ? state.extras.slice() : [];
            newExtras.splice(newExtras.length, 0, action.payload )
            return {...state,
                extras: newExtras
            }
        case ActionTypes.GET_PRODUCT_DETAILS:
            return {...state, 
                ...action.payload.data
            } 
        default:
            return state;
    }
};



export {reducer as PlanReducer}; 