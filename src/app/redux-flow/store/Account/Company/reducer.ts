
import { ActionTypes, companyInitialState, CompanyPageInfos, CompanyAction } from './';


export const reducer = (state = companyInitialState, action: CompanyAction): CompanyPageInfos => {
    switch (action.type) {
        case ActionTypes.GET_COMPANY_PAGE_DETAILS:
            return {...state, 
                ...action.payload
            }
        case ActionTypes.SAVE_COMPANY_PAGE_DETAILS:
            return {...state,
                ...action.payload
            }
        case ActionTypes.GET_UPLOAD_LOGO_URL:     
            return {
                ...state,
                uploadLogoUrl:action.payload
            }
        case ActionTypes.UPLOAD_COMPANY_LOGO:
            return {
                ...state,
            }
        default:
            return state;
    }
};

export {reducer as CompanyReducer}; 