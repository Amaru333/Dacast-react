import { AccountAction } from "./actions";
import { ActionTypes, accountInitialState, AccountState } from './types';


export const reducer = (state = accountInitialState, action: AccountAction): AccountState => {
    switch (action.type) {
        case ActionTypes.GET_COMPANY_PAGE_DETAILS:
            return {
                ...state,
                data: {...state, companyPage:{...action.payload}}
            }
        case ActionTypes.SAVE_COMPANY_PAGE_DETAILS:
            return {
                ...state,
            }
        default:
            return state;
    }
};

export {reducer as AccountReducer}; 