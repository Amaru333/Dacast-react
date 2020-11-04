export interface GetCompanyLogoUploadUrl {
    userID: string
}

export type PostUploadUrlInput = {
    uploadType: 'company-logo' | 'transcoding-watermark'
    uploadRequestBody: GetCompanyLogoUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
    fileID?: string
}

export interface PutUploadFileInput {
    uploadUrl: string
    data: File
}