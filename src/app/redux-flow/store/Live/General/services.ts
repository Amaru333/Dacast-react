import { ContentDetails } from '../../VOD/General/types';
import { axiosClient } from '../../../../utils/axiosClient';

const getLiveDetailsService = async (liveId: string) => {
    return await axiosClient.get('/channels/' + liveId)
}

const getLiveList = async (qs: string) => {
    return await axiosClient.get('/channels' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'))
}

const saveLiveDetailsService = async (data: ContentDetails) => {
    return await axiosClient.put('/channels/' + data.id, 
        {
            ...data,
            countdown: {
                ...data.countdown,
                startTime: Math.floor(data.countdown.startTime / 1000)
            }
        }
    )
}

const deleteLiveChannelService = async (data: string) => {
    return await axiosClient.delete('/channels/' + data)
}

const getUploadUrl = async (data: string, liveId: string, extension: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            liveID: liveId,
            extension: extension
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteFile = async (liveId: string, targetId: string) => {
    return await axiosClient.delete('/channels/' + liveId + '/targets/' + targetId)
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    getLiveList,
    saveLiveDetailsService,
    deleteLiveChannelService,
    getUploadUrl,
    uploadFile,
    deleteFile
}