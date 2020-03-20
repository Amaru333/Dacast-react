import axios from 'axios'
import { CompanyPageInfos } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getCompanyPageDetailsService = () => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company', {headers: {
        'Authorization': token
    }});
}

const getCompanyPageLogoUrlService = () => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company/logo-url', {headers: {
        'Authorization': token
    }});
}

const saveCompanyPageDetailsService = (data: CompanyPageInfos) => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company',
        {...data}, 
        {headers: {
            'Authorization': token
        }})
}

const getUploadLogoUrlService = () => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart',
    {'parameters': {
            'userID': userId
        }, 
    'type': 'company-logo'},
    {headers: {
        'Authorization': token
    }});
}

const uploadCompanyLogoService = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteCompanyLogoService = () => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company/logo', {headers: {
        'Authorization': token
    }});
}

export const CompanyServices = {
    getCompanyPageDetailsService,
    getCompanyPageLogoUrlService,
    saveCompanyPageDetailsService,
    getUploadLogoUrlService,
    uploadCompanyLogoService,
    deleteCompanyLogoService
} 