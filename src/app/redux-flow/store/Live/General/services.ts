import axios from 'axios'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';
import { ContentDetails } from '../../VOD/General/types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveDetailsService = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/channels/' + liveId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getLiveList = async (qs: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/channels' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'), 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLiveDetailsService = async (data: ContentDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/channels/' + data.id, 
        {
            ...data,
            countdown: {
                ...data.countdown,
                startTime: Math.floor(data.countdown.startTime / 1000)
            }
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteLiveChannelService = async (data: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/channels/' + data, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, liveId: string, extension: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/' + data,
        {
            liveID: liveId,
            extension: extension
        },
        {
            headers: {
                Authorization: token
            }
        })
}

const uploadFile = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteFile = async (liveId: string, targetId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/channels/' + liveId + '/targets/' + targetId,
        {
            headers: {
                Authorization: token
            }
        }
    )
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