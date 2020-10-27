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

interface Invoice {
    id: string;
    date: number;
    total: number;
    status: 'pending' | 'failed' | 'paid';
    downloadLink: string;
}

export interface GetInvoicesOutput {
    invoices: Invoice[];
    page: number;
    perPage: number;
    total: number;
}

export interface ProfileDetails {
    emailAddress: string;
    firstName: string;
    id: string;
    lastName: string;
    lowData: boolean;
    marketing: boolean;
    passwordLastChanged: number | null;
    phoneNumber: string;
    timezone: string;
    videoUpload: boolean;
}

export interface PutProfileDetailsInput {
    firstName: string;
    lastName: string;
    lowData: boolean;
    marketing: boolean;
    phoneNumber: string;
    timezone: string;
    videoUpload: boolean;
}

export interface PutUserPasswordInput {
    currentPassword: string;
    newPassword: string;
    accessToken: string;
}