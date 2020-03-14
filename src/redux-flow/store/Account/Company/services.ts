import axios from 'axios'
import { CompanyPageInfos } from './types';
import { addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getCompanyPageDetailsService = (accountId: string) => {
    let header = addTokenToHeader();

    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + accountId + '/company', {headers: {
        'Authorization': header
    }});
}

const saveCompanyPageDetailsService = (data: CompanyPageInfos, accountId: string) => {
    let customData = data
    //delete customData['accountName']
    let header = addTokenToHeader();
    return axios.patch('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + accountId + '/company',
    {...customData}, 
    {headers: {
        'Authorization': header
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