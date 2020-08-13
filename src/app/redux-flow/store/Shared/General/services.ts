import axios from 'axios'
import { SubtitleInfo, ContentDetails } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const getContentDetailsService = async (contentId: string, contentType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + contentId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getContentList = async (qs: string, contentType: string) => {
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

const deleteContentService = async (contentId: string, contentType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.delete(process.env.API_BASE_URL + '/vods/' + contentId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const restoreContentService = async (contentId: string, contentType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/vods/' + contentId + '/restore', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const editContentDetailsService = async (data: ContentDetails, contentType: string) => {
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

const getUploadUrl = async (data: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
    let requestData: any = {
        vodID: contentId,
        extension: extension
    }
    if(data === 'subtitle') {
        requestData = {
            vodID: contentId,
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

const uploadImageFromVideo = async (contentId: string, time: number, imageType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    console.log('data', contentId, time, imageType)
    return axios.post(process.env.API_BASE_URL + `/vods/${contentId}/targets/${imageType.split('-')[1]}`, 
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

const deleteFile = async (contentId: string, targetId: string, contentType: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/vods/' + contentId + '/targets/' + targetId,
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export const ContentGeneralServices = {
    getContentDetailsService,
    editContentDetailsService,
    getUploadUrl,
    uploadFile,
    uploadImageFromVideo,
    deleteFile,
    getContentList,
    deleteContentService,
    restoreContentService
}