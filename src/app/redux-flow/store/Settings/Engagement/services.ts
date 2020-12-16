import { EngagementInfo, Ad, MailCatcher } from './types';
import { userToken } from '../../../../utils/services/token/tokenService';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getEngagementInfos = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/settings/engagement')
}

const saveEngagementInfos = async (data: EngagementInfo) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/settings/engagement',
        {
            ...data
        }
    )
}

const saveAd = async (data: Ad[]) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/settings/engagement/ads/',
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
        }
    )
}

const getUploadUrl = async (data: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            userID: userId
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteFile = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await  axiosClient.delete('/accounts/' + userId + '/settings/engagement/brand-image')
}


const saveMailCatcher = async (data: MailCatcher) => {
    return await axiosClient.put('settings-interactions-mail-catcher', {data: data})
}

const createMailCatcher = async (data: MailCatcher) => {
    return await axiosClient.post('settings-interactions-mail-catcher', {data: data})
}

const deleteMailCatcher = async (data: MailCatcher) => {
    return await axiosClient.delete('settings-interactions-mail-catcher', {data: data})
}

export const engagementServices = {
    getEngagementInfos,
    saveEngagementInfos,
    saveAd,
    saveMailCatcher,
    createMailCatcher,
    deleteMailCatcher,
    getUploadUrl,
    uploadFile,
    deleteFile
}