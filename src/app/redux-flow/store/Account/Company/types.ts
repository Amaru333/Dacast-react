export enum ActionTypes {
    GET_COMPANY_PAGE_DETAILS = "@@account_company/GET_COMPANY_PAGE_DETAILS",
    GET_COMPANY_LOGO_URL = "@@account_company/GET_COMPANY_LOGO_URL",
    SAVE_COMPANY_PAGE_DETAILS = "@@account_company/SAVE_COMPANY_PAGE_DETAILS",
    GET_UPLOAD_LOGO_URL = "@@account_company/GET_UPLOAD_LOGO_URL",
    UPLOAD_COMPANY_LOGO = "@@account_company/UPLOAD_COMPANY_LOGO",
    DELETE_COMPANY_LOGO = "@@account_company/DELETE_COMPANY_LOGO",
}


export interface CompanyPageInfos {
    id: string;
    accountName: string;
    businessName: string;
    contactNumber: string;
    companyEmail: string;
    companyWebsite: string;
    vatNumber: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    town: string;
    zipCode: string;
    country: string;
    logoUrl?: string;
    uploadLogoUrl?: string;
    isUploading?: boolean;
}

export const companyInitialState: CompanyPageInfos = {
    id: "",
    accountName: "",
    businessName: "",
    contactNumber: "",
    companyEmail: "",
    companyWebsite: "",
    vatNumber: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    town: "",
    zipCode: "",
    country: "",
    logoUrl: "",
    uploadLogoUrl: "",
    isUploading: false
};
