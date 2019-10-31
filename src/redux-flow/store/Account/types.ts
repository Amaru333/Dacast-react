import { ValueInput } from '../../../utils/hooksFormSubmit';

export enum ActionTypes {
    GET_COMPANY_PAGE_DETAILS_REQUEST = "@@account/GET_COMPANY_PAGE_DETAILS_REQUEST",
    GET_COMPANY_PAGE_DETAILS_SUCCESS = "@@account/GET_COMPANY_PAGE_DETAILS_SUCCESS",
    GET_COMPANY_PAGE_DETAILS_ERROR = "@@account/GET_COMPANY_PAGE_DETAILS_ERROR",
    SAVE_COMPANY_PAGE_DETAILS_REQUEST = "@@account/SAVE_COMPANY_PAGE_DETAILS_REQUEST",
    SAVE_COMPANY_PAGE_DETAILS_SUCCESS = "@@account/SAVE_COMPANY_PAGE_DETAILS_SUCCESS",
    SAVE_COMPANY_PAGE_DETAILS_ERROR = "@@account/SAVE_COMPANY_PAGE_DETAILS_ERROR"
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
    saveCompanyPageDetails: (data: ValueInput) => void;
} 

export type AccountProps = StateProps & DispatchProps;