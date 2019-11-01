import { ActionTypes } from './types';
import { AccountServices } from './services';
import { ValueInput } from '../../../utils/hooksFormSubmit';

export interface GetCompanyPageDetailsRequest {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_REQUEST;
    payload: {};
}
export interface GetCompanyPageDetailsSuccess {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_SUCCESS;
    payload: {data: any};
}
export interface GetCompanyPageDetailsError {
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_ERROR;
    payload: {error: any};
}

export interface SaveCompanyPageDetailsRequest {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_REQUEST;
    payload: {data: ValueInput};
}
export interface SaveCompanyPageDetailsSuccess {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_SUCCESS;
    payload: {data: any};
}
export interface SaveCompanyPageDetailsError {
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_ERROR;
    payload: {error: any};
}

const GetCompanyPageDetailsRequest = (): AccountAction => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_REQUEST,
    payload: {}
});

const GetCompanyPageDetailsSuccess = (data: any): AccountAction => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_SUCCESS,
    payload: {...data}
});

const GetCompanyPageDetailsError = (error: any): AccountAction => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_ERROR,
    payload: error
});

const SaveCompanyPageDetailsRequest = (data: ValueInput): AccountAction => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_REQUEST,
    payload: {data:{...data}}
});

const SaveCompanyPageDetailsSuccess = (data: any): AccountAction => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_SUCCESS,
    payload: {...data}
});

const SaveCompanyPageDetailsError = (error: any): AccountAction => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_ERROR,
    payload: error
});


export const getCompanyPageDetails = () => (dispatch: React.Dispatch<AccountAction>): void => {
    dispatch(GetCompanyPageDetailsRequest());
    AccountServices.getCompanyPageDetailsService()
        .then( (data: any) => {
            dispatch(GetCompanyPageDetailsSuccess(data))
        }).catch( (error: any) => {
            dispatch(GetCompanyPageDetailsError(error))
        })
}

export const saveCompanyPageDetails = (data: ValueInput) => (dispatch: React.Dispatch<AccountAction>): void => {
    dispatch(SaveCompanyPageDetailsRequest(data));
    AccountServices.saveCompanyPageDetailsService(data)
        .then( data => {
            dispatch(SaveCompanyPageDetailsSuccess(data))
        }).catch(error => {
            dispatch(SaveCompanyPageDetailsError(error))
        })
}



export type AccountAction = GetCompanyPageDetailsRequest | GetCompanyPageDetailsSuccess | GetCompanyPageDetailsError | SaveCompanyPageDetailsRequest | SaveCompanyPageDetailsSuccess | SaveCompanyPageDetailsError 