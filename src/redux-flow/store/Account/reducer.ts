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
                data: {...state, companyPage:{...action.payload}}
            }
        case ActionTypes.GET_UPLOAD_LOGO_URL:
            const companyPage = state.data ? {...state.data.companyPage, uploadLogoUrl:action.payload} : null;
            return {
                ...state,
                data: {...state.data, companyPage: companyPage}
            }
        case ActionTypes.UPLOAD_COMPANY_LOGO:
            return {
                ...state,
            }
        default:
            return state;
    }
};

export {reducer as AccountReducer}; 