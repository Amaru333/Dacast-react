import axios from 'axios'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveDetailsService = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + liveId, 
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
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'), 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLiveDetailsService = async (data: LiveDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + data.id, 
        {...data},
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
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + data, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart/' + data,
        {
            liveID: liveId
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
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + liveId + '/targets/' + targetId,
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