import { Action } from "./actions";
import { ActionTypes, accountInitialState, AccountState } from './types';


export const reducer = (state = accountInitialState, action: Action): any => {
    switch (action.type) {
        case ActionTypes.GET_COMPANY_PAGE_DETAILS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.GET_COMPANY_PAGE_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: [...state.data, {companyPage:action.payload.data}]
            }
        case ActionTypes.GET_COMPANY_PAGE_DETAILS_ERROR:
            debugger;
            return {
                ...state,
                isFetching: false,
                data:[...state.data, {companyPage:action.payload}]
            }
        default:
            return state;
    }
};

export {reducer as AccountReducer}; 