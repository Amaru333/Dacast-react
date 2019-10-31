import { ActionTypes } from './types';
import { AccountServices } from './services';

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
    payload: {data: any};
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

const SaveCompanyPageDetailsRequest = (data: any): Action => ({
    type: ActionTypes.SAVE_COMPANY_PAGE_DETAILS_REQUEST,
    payload: {...data}
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
    .then( data => {
        dispatch(GetCompanyPageDetailsSuccess(data))
    }).catch(error => {
        dispatch(GetCompanyPageDetailsError(error))
    })
}

export const saveCompanyPageDetails = (data: any) => (dispatch: any): void => {
    dispatch(SaveCompanyPageDetailsRequest(data));
    AccountServices.saveCompanyPageDetailsService(data)
    .then( data => {
        dispatch(SaveCompanyPageDetailsSuccess(data))
    }).catch(error => {
        dispatch(SaveCompanyPageDetailsError(error))
    })
}



export type Action = GetCompanyPageDetailsRequest | GetCompanyPageDetailsSuccess | GetCompanyPageDetailsError | SaveCompanyPageDetailsRequest | SaveCompanyPageDetailsSuccess | SaveCompanyPageDetailsError 