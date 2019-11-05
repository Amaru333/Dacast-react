import axios from 'axios'
import { CompanyPageInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getCompanyPageDetailsService = () => {
    return axios.get(urlBase + 'getCompanyPageDetails');
}

const saveCompanyPageDetailsService = (data: CompanyPageInfos) => {
    return axios.post(urlBase + 'saveCompanyPageDetails', {...data})
}


export const AccountServices = {
    getCompanyPageDetailsService,
    saveCompanyPageDetailsService
} 