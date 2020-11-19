export interface GetCompanyLogoUploadUrl {
    userID: string
}

export interface GetUserBrandImageUploadUrl {
    userID: string
}

export type PostUploadUrlInput = {
    uploadType: 'company-logo' | 'transcoding-watermark' | 'player-watermark'
    uploadRequestBody: GetCompanyLogoUploadUrl | GetUserBrandImageUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
    fileID?: string
}

export interface PutUploadFileInput {
    uploadUrl: string
    data: File
}