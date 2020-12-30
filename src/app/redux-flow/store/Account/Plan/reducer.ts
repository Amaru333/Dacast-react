
import { ActionTypes, BillingPageInfos, PlanAction } from '.';
import { planInitialState } from './types';


export const reducer = (state = planInitialState, action: PlanAction): BillingPageInfos => {
    switch (action.type) {
        case ActionTypes.GET_BILLING_PAGE_INFOS:
            return {...state, 
                ...action.payload
            }
        case ActionTypes.ADD_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...state.playbackProtection, ...action.payload}
            }
        case ActionTypes.EDIT_BILLING_PAGE_PLAYBACK_PROTECTION:          
            return {...state,
                playbackProtection: {...state.playbackProtection, ...action.payload}
            } 
        case ActionTypes.GET_PRODUCT_DETAILS:
            return {...state, 
                products: action.payload
            } 
        default:
            return state;
    }
};



export {reducer as PlanReducer}; 