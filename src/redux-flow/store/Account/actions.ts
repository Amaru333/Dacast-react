import { ActionTypes, CompanyPageInfos } from './types';
import { AccountServices } from './services';
import { showToastNotification } from '../toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';

export interface GetCompanyPageDetails {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
}

export interface SaveCompanyPageDetails {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
}


export const getCompanyPageDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetCompanyPageDetails> ) => {
        await AccountServices.getCompanyPageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_PAGE_DETAILS, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveCompanyPageDetailsAction = (data: CompanyPageInfos): ThunkDispatch<Promise<void>, {}, SaveCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveCompanyPageDetails> ) => {
        await AccountServices.saveCompanyPageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type AccountAction = GetCompanyPageDetails | SaveCompanyPageDetails