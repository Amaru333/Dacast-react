export enum ActionTypes {
    GET_COMPANY_PAGE_DETAILS_REQUEST = "@@account/GET_COMPANY_PAGE_DETAILS_REQUEST",
    GET_COMPANY_PAGE_DETAILS_SUCCESS = "@@account/GET_COMPANY_PAGE_DETAILS_SUCCESS",
    GET_COMPANY_PAGE_DETAILS_ERROR = "@@account/GET_COMPANY_PAGE_DETAILS_ERROR"
}

export interface AccountState {
    readonly data: any;
}

export const accountInitialState: AccountState = {
    data: [],
};

export interface StateProps {
    account: any;
}

export interface DispatchProps {
    getCompanyPageDetails: () => void;
} 

export type AccountProps = StateProps & DispatchProps;