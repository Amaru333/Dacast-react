import axios from 'axios'
import { CompanyPageInfos } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';


const getCompanyPageDetailsService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/company', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getCompanyPageLogoUrlService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/company/logo-url', 
        {
            headers: {
            Authorization: token
            }
        }
    )
}

const saveCompanyPageDetailsService = async (data: CompanyPageInfos) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/company',
        {
            ...data
        }, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadLogoUrlService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/company-logo',
        {},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const uploadCompanyLogoService = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteCompanyLogoService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/accounts/' + userId + '/company/logo', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const CompanyServices = {
    getCompanyPageDetailsService,
    getCompanyPageLogoUrlService,
    saveCompanyPageDetailsService,
    getUploadLogoUrlService,
    uploadCompanyLogoService,
    deleteCompanyLogoService
} 