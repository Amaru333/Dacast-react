import { ActionTypes, CompanyPageInfos } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetCompanyDetailsOutput, formatPutCompanyDetailsInput, formatPostCompanyLogoUrlInput, formatPostMakeUserOwnerInput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';
import { formatPutUploadFileInput } from '../../Common/viewModel';
import { PostUploadUrlOutput } from '../../../../../DacastSdk/common';


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
    payload: {presignedURL: string};
}

export interface UploadCompanyLogo {
    type: ActionTypes.UPLOAD_COMPANY_LOGO;
    payload: {data: File, uploadUrl: string};
}

export interface DeleteCompanyLogo {
    type: ActionTypes.DELETE_COMPANY_LOGO;
    payload: File;
}

export interface MakeUserOwner {
    type: ActionTypes.MAKE_USER_OWNER;
    payload: null
}

export type CompanyAction = GetCompanyPageDetails | SaveCompanyPageDetails | GetUploadLogoUrl | UploadCompanyLogo| DeleteCompanyLogo | MakeUserOwner

export const getCompanyPageDetailsAction = applyViewModel(dacastSdk.getCompanyDetails, undefined, formatGetCompanyDetailsOutput, ActionTypes.GET_COMPANY_PAGE_DETAILS, null, 'Couldn\'t get company details')
export const saveCompanyPageDetailsAction = applyViewModel(dacastSdk.putCompanyDetails, formatPutCompanyDetailsInput, undefined, ActionTypes.SAVE_COMPANY_PAGE_DETAILS, 'Changes have been saved', 'Couldn\'t save changes')

export const getUploadLogoUrlAction = applyViewModel(dacastSdk.postUploadUrl, formatPostCompanyLogoUrlInput, (data: PostUploadUrlOutput) => data, ActionTypes.GET_UPLOAD_LOGO_URL, null, 'Couldn\'t upload file')
export const uploadCompanyLogo = applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, undefined, ActionTypes.UPLOAD_COMPANY_LOGO, 'Company Logo has been uploaded', 'Couldn\'t upload company logo')
export const deleteCompanyLogo = applyViewModel(dacastSdk.deleteCompanyLogo, undefined, undefined, ActionTypes.DELETE_COMPANY_LOGO, 'Company Logo has been deleted', 'Couldn\'t delete company logo')
export const makeUserOwnerAction = applyViewModel(dacastSdk.postMakeUserOwner, formatPostMakeUserOwnerInput, undefined, ActionTypes.MAKE_USER_OWNER, 'Account owner changed', 'Couldn\'t change account owner')