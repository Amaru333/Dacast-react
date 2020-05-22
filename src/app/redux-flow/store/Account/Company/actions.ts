import { ActionTypes, CompanyPageInfos } from './types';
import { CompanyServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";


export interface GetCompanyPageDetails {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS;
    payload: {data: CompanyPageInfos};
}

export interface GetCompanyLogoUrl {
    type: ActionTypes.GET_COMPANY_LOGO_URL;
    payload: {data: {id: string; url: string}};
}

export interface SaveCompanyPageDetails {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
}

export interface GetUploadLogoUrl {
    type: ActionTypes.GET_UPLOAD_LOGO_URL;
    payload: {data: {presignedURL: string}};
}

export interface UploadCompanyLogo {
    type: ActionTypes.UPLOAD_COMPANY_LOGO;
    payload: File;
}

export interface DeleteCompanyLogo {
    type: ActionTypes.DELETE_COMPANY_LOGO;
    payload: File;
}


export const getCompanyPageDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetCompanyPageDetails> ) => {
        await CompanyServices.getCompanyPageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_PAGE_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getCompanyPageLogoUrlAction = (): ThunkDispatch<Promise<void>, {}, GetCompanyLogoUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetCompanyLogoUrl> ) => {
        await CompanyServices.getCompanyPageLogoUrlService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_LOGO_URL, payload: response.data} );
            }).catch(() => {
                //dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveCompanyPageDetailsAction = (data: CompanyPageInfos): ThunkDispatch<Promise<void>, {}, SaveCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveCompanyPageDetails> ) => {
        await CompanyServices.saveCompanyPageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS, payload: data} );
                dispatch(showToastNotification("Changes have been saved", 'flexible', "success"));
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
                dispatch(showToastNotification("Company Logo has been uploaded", 'flexible', "success"));
            }).catch((error) => {
                dispatch( {type: ActionTypes.UPLOAD_COMPANY_LOGO, payload: error} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteCompanyLogo = (): ThunkDispatch<Promise<void>, {}, DeleteCompanyLogo> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteCompanyLogo> ) => {
        await CompanyServices.deleteCompanyLogoService()
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_COMPANY_LOGO, payload: response.data} );
                dispatch(showToastNotification("Company Logo has been deleted", 'flexible', "success"));
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
| GetCompanyLogoUrl
| DeleteCompanyLogo