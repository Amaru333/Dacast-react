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


export const getCompanyPageDetails = () => (dispatch: any): void => {
    dispatch(GetCompanyPageDetailsRequest());
    AccountServices.getCompanyPageDetailsService()
    .then( (data : any) => {
        dispatch(GetCompanyPageDetailsSuccess(data))
    }).catch( (error : any) => {
        dispatch(GetCompanyPageDetailsError(error))
    })
}



export type Action = GetCompanyPageDetailsRequest | GetCompanyPageDetailsSuccess | GetCompanyPageDetailsError 