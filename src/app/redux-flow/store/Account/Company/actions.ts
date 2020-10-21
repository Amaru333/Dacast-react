import { ActionTypes, CompanyPageInfos } from './types';
import { CompanyServices } from './services';
import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from "../..";
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetCompanyDetailsOutput } from './viewModel';


export interface GetCompanyPageDetails {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS;
    payload: CompanyPageInfos;
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
        await dacastSdk.getCompanyDetails()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_PAGE_DETAILS, payload: formatGetCompanyDetailsOutput(response)} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

// export const getCompanyPageLogoUrlAction = (): ThunkDispatch<Promise<void>, {}, GetCompanyLogoUrl> => {
//     return async (dispatch: ThunkDispatch<ApplicationState , {}, GetCompanyLogoUrl> ) => {
//         await CompanyServices.getCompanyPageLogoUrlService()
//             .then( response => {
//                 dispatch( {type: ActionTypes.GET_COMPANY_LOGO_URL, payload: response.data} );
//             }).catch(() => {
//                 //dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
//                 return Promise.reject()
//             })
//     };
// }

export const saveCompanyPageDetailsAction = (data: CompanyPageInfos): ThunkDispatch<Promise<void>, {}, SaveCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveCompanyPageDetails> ) => {
        await CompanyServices.saveCompanyPageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS, payload: data} );
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
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
                return Promise.reject()
            })
    };
}

export const uploadCompanyLogo = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadCompanyLogo> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, UploadCompanyLogo> ) => {
        await CompanyServices.uploadCompanyLogoService(data, uploadUrl)
            .then( response => {
                dispatch( {type: ActionTypes.UPLOAD_COMPANY_LOGO, payload: response.data} );
                dispatch(showToastNotification("Company Logo has been uploaded", 'fixed', "success"));
            }).catch((error) => {
                dispatch( {type: ActionTypes.UPLOAD_COMPANY_LOGO, payload: error} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteCompanyLogo = (): ThunkDispatch<Promise<void>, {}, DeleteCompanyLogo> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteCompanyLogo> ) => {
        await CompanyServices.deleteCompanyLogoService()
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_COMPANY_LOGO, payload: response.data} );
                dispatch(showToastNotification("Company Logo has been deleted", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
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