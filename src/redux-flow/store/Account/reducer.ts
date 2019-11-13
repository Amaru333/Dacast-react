import { AccountAction } from "./actions";
import { ActionTypes, accountInitialState, AccountState } from './types';


export const reducer = (state = accountInitialState, action: AccountAction): AccountState => {
    switch (action.type) {
        case ActionTypes.GET_COMPANY_PAGE_DETAILS:
            return {
                ...state,
                data: {...state.data, companyPage:{...action.payload}}
            }
        case ActionTypes.SAVE_COMPANY_PAGE_DETAILS:
            return {
                ...state,
                data: {...state, companyPage:{...action.payload}}
            }
        case ActionTypes.GET_UPLOAD_LOGO_URL:
            if(state.data){
                const companyPage = {...state.data.companyPage!, uploadLogoUrl:action.payload};          
                return {
                    ...state,
                    data: {...state.data, companyPage: companyPage}
                }
            }
            return {
                ...state,
            }
        case ActionTypes.UPLOAD_COMPANY_LOGO:
            return {
                ...state,
            }
        case ActionTypes.GET_PROFILE_PAGE_DETAILS:
            return {
                ...state,
                data: {...state.data, profilePage:{...action.payload}}
            }
        case ActionTypes.SAVE_PROFILE_PAGE_DETAILS:
            return {
                ...state,
                data: {...state, profilePage:{...action.payload}}
            }
        case ActionTypes.SAVE_PROFILE_PASSWORD:
            if(state.data) {
                const profilePage = {...state.data.profilePage!, lastChangedPassword: Date.now().toLocaleString()};
                return {
                    ...state,
                    data: {...state.data, profilePage:profilePage}
                }
            }
            return {...state}
        default:
            return state;
    }
};

export {reducer as AccountReducer}; 