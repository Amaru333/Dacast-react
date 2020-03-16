import { ActionTypes, CompanyPageInfos } from './types';
import { CompanyServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";


export interface GetCompanyPageDetails {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
}

export interface SaveCompanyPageDetails {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
}

export interface GetUploadLogoUrl {
    type: ActionTypes.GET_UPLOAD_LOGO_URL;
    payload: string;
}

export interface UploadCompanyLogo {
    type: ActionTypes.UPLOAD_COMPANY_LOGO;
    payload: File;
}


export const getCompanyPageDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetCompanyPageDetails> ) => {
        await CompanyServices.getCompanyPageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_PAGE_DETAILS, payload: response.data.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveCompanyPageDetailsAction = (data: CompanyPageInfos): ThunkDispatch<Promise<void>, {}, SaveCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveCompanyPageDetails> ) => {
        await CompanyServices.saveCompanyPageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS, payload: response.data.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadLogoUrlAction = (): ThunkDispatch<Promise<void>, {}, GetUploadLogoUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetUploadLogoUrl> ) => {
        await CompanyServices.getUploadLogoUrlService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_UPLOAD_LOGO_URL, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const uploadCompanyLogo = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadCompanyLogo> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, UploadCompanyLogo> ) => {
        await CompanyServices.uploadCompanyLogoService(data, uploadUrl)
            .then( response => {
                dispatch( {type: ActionTypes.UPLOAD_COMPANY_LOGO, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type CompanyAction = 
GetCompanyPageDetails 
| SaveCompanyPageDetails 
| GetUploadLogoUrl 
| UploadCompanyLogo