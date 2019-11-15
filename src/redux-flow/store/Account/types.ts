export enum ActionTypes {
    GET_COMPANY_PAGE_DETAILS = "@@account/GET_COMPANY_PAGE_DETAILS",
    SAVE_COMPANY_PAGE_DETAILS = "@@account/SAVE_COMPANY_PAGE_DETAILS",
    GET_UPLOAD_LOGO_URL = "@@account/GET_UPLOAD_LOGO_URL",
    UPLOAD_COMPANY_LOGO = "@@account/UPLOAD_COMPANY_LOGO",
    GET_PROFILE_PAGE_DETAILS = "@@account/GET_PROFILE_PAGE_DETAILS",
    SAVE_PROFILE_PAGE_DETAILS ="@@account/SAVE_PROFILE_PAGE_DETAILS",
    SAVE_PROFILE_PASSWORD ="@@account/SAVE_PROFILE_PASSWORD"
}

export interface AccountInfos {
    companyPage?: CompanyPageInfos;
    profilePage?: ProfilePageInfos;
}

export interface ProfilePageInfos {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    lastChangedPassword: string;
    timezone: string;
    marketing: boolean;
    lowData: boolean;
    upload: boolean;
    weeklyAnalytics: boolean;
    apiPingbackNotifications: boolean;
}

export interface CompanyPageInfos {
    accountName: string;
    businessName: string;
    contactNumber: string;
    emailAddress: string;
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
}

export interface AccountState {
    readonly data: AccountInfos | false;
}

export const accountInitialState: AccountState = {
    data: false,
};

export interface StateProps {
    account: AccountState;
}
