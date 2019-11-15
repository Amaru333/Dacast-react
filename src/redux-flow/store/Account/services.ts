import axios from 'axios'
import { CompanyPageInfos, ProfilePageInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

/** COMPANY PAGE SERVICES */
const getCompanyPageDetailsService = () => {
    return axios.get(urlBase + 'getCompanyPageDetails');
}

const saveCompanyPageDetailsService = (data: CompanyPageInfos) => {
    return axios.post(urlBase + 'saveCompanyPageDetails', {...data})
}

const getUploadLogoUrlService = () => {
    return axios.get(urlBase + 'getUploadLogoUrl');
}

const uploadCompanyLogoService = (data: File, uploadUrl: string) => {
    return axios.post(uploadUrl, data)
}

/** END OF COMPANY PAGE SERVICES */


/** PROFILE PAGE SERVICES  */

const getProfilePageDetailsService = () => {
    return axios.get(urlBase + 'getProfilePageDetails');
}

const saveProfilePageDetailsService = (data: ProfilePageInfos) => {
    return axios.post(urlBase + 'saveProfilePageDetails', {...data})
}

const saveProfilePasswordService = (data: string) => {
    return axios.post(urlBase + 'saveProfilePassword', {data})
}

/** END OF PROFILE PAGE SERVICES */

export const AccountServices = {
    getCompanyPageDetailsService,
    saveCompanyPageDetailsService,
    getUploadLogoUrlService,
    uploadCompanyLogoService,
    getProfilePageDetailsService,
    saveProfilePageDetailsService,
    saveProfilePasswordService
} 