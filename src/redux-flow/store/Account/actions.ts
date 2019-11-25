import { ActionTypes, CompanyPageInfos, ProfilePageInfos } from './types';
import { AccountServices } from './services';
import { showToastNotification } from '../toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';



/** COMPANY PAGE ACTIONS */

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
        await AccountServices.getCompanyPageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_COMPANY_PAGE_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveCompanyPageDetailsAction = (data: CompanyPageInfos): ThunkDispatch<Promise<void>, {}, SaveCompanyPageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveCompanyPageDetails> ) => {
        await AccountServices.saveCompanyPageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadLogoUrl = (): ThunkDispatch<Promise<void>, {}, GetUploadLogoUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetUploadLogoUrl> ) => {
        await AccountServices.getUploadLogoUrlService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_UPLOAD_LOGO_URL, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const uploadCompanyLogo = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadCompanyLogo> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, UploadCompanyLogo> ) => {
        await AccountServices.uploadCompanyLogoService(data, uploadUrl)
            .then( response => {
                dispatch( {type: ActionTypes.UPLOAD_COMPANY_LOGO, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

/** END COMPANY PAGE ACTIONS */


/** PROFILE PAGE ACTIONS */

export interface GetProfilePageDetails {
    type: ActionTypes.GET_PROFILE_PAGE_DETAILS;
    payload: ProfilePageInfos;
}

export interface SaveProfilePageDetails {
    type: ActionTypes.SAVE_PROFILE_PAGE_DETAILS;
    payload: ProfilePageInfos;
}

export interface SaveProfilePassword {
    type: ActionTypes.SAVE_PROFILE_PASSWORD;
    payload: string;
}


export const getProfilePageDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetProfilePageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetProfilePageDetails> ) => {
        await AccountServices.getProfilePageDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PROFILE_PAGE_DETAILS, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveProfilePageDetailsAction = (data: ProfilePageInfos): ThunkDispatch<Promise<void>, {}, SaveProfilePageDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveProfilePageDetails> ) => {
        await AccountServices.saveProfilePageDetailsService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PROFILE_PAGE_DETAILS, payload: response.data} );
                dispatch(showToastNotification("Data saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'flexible', "error"));
            })
    };
}

export const saveProfilePasswordAction = (data: string): ThunkDispatch<Promise<void>, {}, SaveProfilePassword> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveProfilePassword> ) => {
        await AccountServices.saveProfilePasswordService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_PROFILE_PASSWORD, payload: response.data} );
                dispatch(showToastNotification("Password saved!", 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

/** END PROFILE PAGE ACTIONS */


export type AccountAction = 
GetCompanyPageDetails 
| SaveCompanyPageDetails 
| GetUploadLogoUrl 
| UploadCompanyLogo
| GetProfilePageDetails
| SaveProfilePageDetails
| SaveProfilePassword