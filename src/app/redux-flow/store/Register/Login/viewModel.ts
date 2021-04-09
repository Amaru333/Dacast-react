import { isMultiUserPayload, isMultiUserToken, PostLoginInput, PostLoginOuput } from "../../../../../DacastSdk/session";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { LoginInfos, TokenInfos } from "./types";



export const formatPostLoginInput = (data: LoginInfos): PostLoginInput => {
    if(isMultiUserPayload(data)) {
        return {
            selectedUserId: data.selectedUserId,
            loginToken: data.loginToken
        }
    }

    let formattedData: PostLoginInput = {
        email: data.email,
        password: data.password
    }

    return formattedData
}

export const formatPostLoginOutput = (data: PostLoginOuput, dataReact: LoginInfos): TokenInfos => {
    if(isMultiUserToken(data)) {
        return {
            refresh: '',
            token: '',
            expires: Date.now(),
            loginToken: data.loginToken,
            availableUsers: data.availableUsers.map(user => {
                return {
                    userId: user.userId,
                    companyName: user.companyName || user.companyWebsite,
                    companyWebsite: user.companyWebsite,
                    role: user.role ? capitalizeFirstLetter(user.role.split('-')[1]) : null
                }
            }),
            email: !isMultiUserPayload(dataReact) ? dataReact.email : ''
        }
    }
    return {
        refresh: data.refresh,
        expires: data.expires,
        token: data.token,
        accessToken: data.accessToken
    }
}