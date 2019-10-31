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

const GetCompanyPageDetailsRequest = (): Action => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_REQUEST,
    payload: {}
});

const GetCompanyPageDetailsSuccess = (data: any): Action => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_SUCCESS,
    payload: {...data}
});

const GetCompanyPageDetailsError = (error: any): Action => ({
    type: ActionTypes.GET_COMPANY_PAGE_DETAILS_ERROR,
    payload: error
});

const SaveCompanyPageDetailsRequest = (data: ValueInput): Action => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_REQUEST,
    payload: {data:{...data}}
});

const SaveCompanyPageDetailsSuccess = (data: any): Action => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_SUCCESS,
    payload: {...data}
});

const SaveCompanyPageDetailsError = (error: any): Action => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_ERROR,
    payload: error
});


export const getCompanyPageDetails = () => (dispatch: any): void => {
    dispatch(GetCompanyPageDetailsRequest());
    AccountServices.getCompanyPageDetailsService()
        .then( (data: any) => {
            dispatch(GetCompanyPageDetailsSuccess(data))
        }).catch( (error: any) => {
            dispatch(GetCompanyPageDetailsError(error))
        })
}

export const saveCompanyPageDetails = (data: ValueInput) => (dispatch: any): void => {
    dispatch(SaveCompanyPageDetailsRequest(data));
    AccountServices.saveCompanyPageDetailsService(data)
        .then( data => {
            dispatch(SaveCompanyPageDetailsSuccess(data))
        }).catch(error => {
            dispatch(SaveCompanyPageDetailsError(error))
        })
}



export type Action = GetCompanyPageDetailsRequest | GetCompanyPageDetailsSuccess | GetCompanyPageDetailsError | SaveCompanyPageDetailsRequest | SaveCompanyPageDetailsSuccess | SaveCompanyPageDetailsError 