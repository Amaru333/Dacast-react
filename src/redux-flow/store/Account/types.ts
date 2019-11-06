export enum ActionTypes {
    GET_COMPANY_PAGE_DETAILS = "@@account/GET_COMPANY_PAGE_DETAILS",
    SAVE_COMPANY_PAGE_DETAILS = "@@account/SAVE_COMPANY_PAGE_DETAILS"
}

export interface AccountInfos {
    companyPage: CompanyPageInfos;
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
