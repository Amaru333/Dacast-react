import axios from 'axios'
import { SubtitleInfo, VodDetails } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/'

const getVodDetailsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getVodList = async (qs: string) => {
    console.log(qs)
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'), 
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
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId, 
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
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + data.id,
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, vodId: string, subtitleInfo?: SubtitleInfo) => {
    let requestData: {vodID: string; fileName?: string; languageLongName?: string; languageShortName?: string} = {
        vodID: vodId
    }
    if(subtitleInfo) {
        requestData = {
            vodID: vodId,
            fileName: subtitleInfo.fileName,
            languageLongName: subtitleInfo.languageLongName,
            languageShortName: subtitleInfo.languageShortName
        }
    }
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart/' + data,
        {
            ...requestData
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

const deleteFile = async (vodId: string, targetId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/targets/' + targetId,
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
    deleteFile,
    getVodList,
    deleteVodService
}