export type PostLoginInput = NormalUserLoginInput | MultiUserSelectedAccountLoginInput

interface NormalUserLoginInput {
    email: string
    password: string
}

interface MultiUserSelectedAccountLoginInput {
    loginToken: string
    selectedUserId: string
}

export interface MultiAccountUserInfo {
    userId: string
    companyName: string
    companyWebsite: string
    role: string
}

interface MultiAccountUser {
    availableUsers: MultiAccountUserInfo[]
    loginToken: string
}

export interface UserLoginToken {
    token: string
    accessToken: string
    refresh: string
    expires: number
}

export type PostLoginOuput = MultiAccountUser | UserLoginToken

export function isMultiUserToken(token: PostLoginOuput): token is MultiAccountUser {
    //@ts-ignore
    return !!token['loginToken']
}

export function isMultiUserPayload(data: PostLoginInput): data is MultiUserSelectedAccountLoginInput {
    //@ts-ignore
    return !!data['loginToken']
}

export interface PostResetPasswordInput {
    newPassword: string
    email: string
    verificationToken: string
}