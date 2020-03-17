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

const saveCompanyPageDetailsService = (data: CompanyPageInfos) => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.patch('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company',
        {...data}, 
        {headers: {
            'Authorization': token
        }})
}

const getUploadLogoUrlService = () => {
    return axios.get(urlBase + 'getUploadLogoUrl');
}

const uploadCompanyLogoService = (data: File, uploadUrl: string) => {
    return axios.post(uploadUrl, data)
}

export const CompanyServices = {
    getCompanyPageDetailsService,
    saveCompanyPageDetailsService,
    getUploadLogoUrlService,
    uploadCompanyLogoService
} 