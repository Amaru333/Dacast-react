import { DateTime } from 'luxon'
import { ProfileDetails, PutProfileDetailsInput, PostUserPasswordInput } from '../../../../../DacastSdk/account'
import { tsToLocaleDate } from '../../../../../utils/formatUtils'
import { userToken } from '../../../../utils/services/token/tokenService'
import { ProfilePageInfos } from './types'

export const formatGetProfileDetailsOutput = (data: ProfileDetails): ProfilePageInfos => {
    let formattedData: ProfilePageInfos = {
        ...data,
        passwordLastChanged: data.passwordLastChanged ? tsToLocaleDate(data.passwordLastChanged, DateTime.DATETIME_SHORT) : 'never'
    }

    return formattedData
}

export const formatPutProfileDetailsInput = (data: ProfilePageInfos): PutProfileDetailsInput => {
    let formattedData: PutProfileDetailsInput = {
        firstName: data.firstName,
        lastName: data.lastName,
        lowData: data.lowData,
        marketing: data.marketing,
        phoneNumber: data.phoneNumber,
        timezone: data.timezone,
        videoUpload: data.videoUpload
    }

    return formattedData
}

export const formatPostUserPasswordInput = (data: {currentPassword: string, newPassword: string}): PostUserPasswordInput => {
    let formattedData: PostUserPasswordInput = {
        ...data,
        accessToken: userToken.getTokenInfo().accessToken
    }

    return formattedData
}