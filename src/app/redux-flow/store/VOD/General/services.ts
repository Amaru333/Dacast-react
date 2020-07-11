import axios from 'axios'
import { SubtitleInfo, VodDetails } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/'

const getVodDetailsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getVodList = async (qs: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/vods' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'), 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteVodService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.delete(process.env.API_BASE_URL + '/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const restoreVodService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/vods/' + vodId, 
        {},
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const editVodDetailsService = async (data: VodDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/vods/' + data.id,
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, vodId: string, subtitleInfo?: SubtitleInfo) => {
    let requestData: any = {
        vodID: vodId
    }
    if(data === 'subtitle') {
        requestData = {
            vodID: vodId,
            name: subtitleInfo.name,
            languageLongName: subtitleInfo.languageLongName,
            languageShortName: subtitleInfo.languageShortName,
            convertToUTF8: subtitleInfo.convertToUTF8
        }
    }
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/' + data,
        {
            ...requestData
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const uploadImageFromVideo = async (vodId: string, time: number, imageType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    console.log('data', vodId, time, imageType)
    return axios.post(process.env.API_BASE_URL + `/vods/${vodId}/targets/${imageType.split('-')[1]}`, 
        {
            time: time
        },
        {
          headers: {
              Authorization: token
            }  
        }
    )
}

const uploadFile = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteFile = async (vodId: string, targetId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/vods/' + vodId + '/targets/' + targetId,
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export const VodGeneralServices = {
    getVodDetailsService,
    editVodDetailsService,
    getUploadUrl,
    uploadFile,
    uploadImageFromVideo,
    deleteFile,
    getVodList,
    deleteVodService,
    restoreVodService
}