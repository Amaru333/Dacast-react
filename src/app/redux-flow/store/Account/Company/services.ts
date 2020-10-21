import { CompanyPageInfos } from './types';
import { userToken } from '../../../../utils/services/token/tokenService';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getCompanyPageDetailsService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/company')
}

// const getCompanyPageLogoUrlService = async () => {
//     const userId = userToken.getUserInfoItem('custom:dacast_user_id')
//     return await axiosClient.get('/accounts/' + userId + '/company/logo-url')
// }

const saveCompanyPageDetailsService = async (data: CompanyPageInfos) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/company',
        {
            ...data
        }
    )
}

const getUploadLogoUrlService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/uploads/signatures/singlepart/company-logo',
        {
            userID: userId
        }
    )
}

const uploadCompanyLogoService = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteCompanyLogoService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete('/accounts/' + userId + '/company/logo')
}

export const CompanyServices = {
    getCompanyPageDetailsService,
    // getCompanyPageLogoUrlService,
    saveCompanyPageDetailsService,
    getUploadLogoUrlService,
    uploadCompanyLogoService,
    deleteCompanyLogoService
} 