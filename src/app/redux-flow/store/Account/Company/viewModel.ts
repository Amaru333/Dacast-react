import { CompanyPageInfos } from './types';
import { GetCompanyRequestOutput, CompanyDetailsEndpoints } from '../../../../../DacastSdk/account';
import { PostUploadUrlInput } from '../../../../../DacastSdk/common';
import { userToken } from '../../../../utils/services/token/tokenService';

export const formatGetCompanyDetailsOutput = (data: GetCompanyRequestOutput): CompanyPageInfos => {
    let formattedData: CompanyPageInfos = {
        id: data.id,
        accountName: data.accountName,
        companyName: data.companyName,
        companyEmail: data.companyEmail,
        companyWebsite: data.companyWebsite,
        contactNumber: data.contactNumber,
        vatNumber: data.vatNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        town: data.town,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        logoURL: data.logoURL
    }
    userToken.updateUserInfo({'companyName': data.companyName})
    return formattedData
}

export const formatPutCompanyDetailsInput = (data: CompanyPageInfos): CompanyDetailsEndpoints => {
    let formattedData: CompanyDetailsEndpoints = {
        id: data.id,
        accountName: data.accountName,
        companyName: data.companyName,
        contactNumber: data.contactNumber,
        companyEmail: data.companyEmail,
        companyWebsite: data.companyWebsite
    }

    if(data.vatNumber) {
        formattedData.vatNumber = data.vatNumber
    }

    if(data.addressLine1) {
        formattedData.addressLine1 = data.addressLine1,
        formattedData.addressLine2 = data.addressLine2
        formattedData.state = data.state,
        formattedData.town = data.town
        formattedData.zipCode = data.zipCode,
        formattedData.country = data.country
    }
    
    userToken.updateUserInfo({'companyName': data.companyName})
    return formattedData
}

export const formatPostCompanyLogoUrlInput = (): PostUploadUrlInput => {
    let formattedData: PostUploadUrlInput = {
        uploadType: 'company-logo',
        uploadRequestBody: {
            userID: userToken.getUserInfoItem('user-id')
        }
    }
    return formattedData
}