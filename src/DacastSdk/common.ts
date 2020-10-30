export interface GetCompanyLogoUploadUrl {
    userID: string
}

export type PostUploadUrlInput = {
    uploadType: 'company-logo'
    uploadRequestBody: GetCompanyLogoUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
}

export interface PutUploadFileInput {
    uploadUrl: string
    data: File
}