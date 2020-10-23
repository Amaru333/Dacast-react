export interface CompanyDetailsEndpoints {
    id: string;
    accountName: string;
    companyName: string;
    contactNumber: string;
    companyEmail: string;
    companyWebsite: string;
    vatNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    state?: string;
    town?: string;
    zipCode?: string;
    country?: string;
}

export type GetCompanyRequestOutput = CompanyDetailsEndpoints & {
    logoURL: string;
}