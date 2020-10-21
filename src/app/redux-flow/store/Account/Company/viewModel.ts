import { CompanyPageInfos } from './types';

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

    return formattedData
}