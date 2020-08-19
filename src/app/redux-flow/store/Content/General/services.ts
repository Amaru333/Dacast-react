import { SubtitleInfo, ContentDetails } from './types'
import { axiosClient } from '../../../../utils/axiosClient'

const getContentDetailsService = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`/${contentType}/${contentId}`)
}

const restoreContentService = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`/${contentType}/${contentId}/restore`)
}

const editContentDetailsService = async (data: ContentDetails, contentType: string) => {
    return await axiosClient.put(`/${contentType}/${data.id}`,
        {
            ...data
        } 
    )
}

const getUploadUrl = async (data: string, contentId: string, extension: string, contentType: string, subtitleInfo?: SubtitleInfo) => {
    let requestData: any = {
        extension: extension
    }
    switch(contentType) {
        case 'vod':
            requestData = {...requestData, vodID: contentId}
            break
        case 'live':
            requestData = {...requestData, liveID: contentId}
            break
        case 'playlist':
            requestData = {...requestData, playlistID: contentId}
            break
        default:
            break
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
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            ...requestData
        }
    )
}

const uploadImageFromVideo = async (contentId: string, time: number, imageType: string) => {
    return await axiosClient.post(`/vods/${contentId}/targets/${imageType.split('-')[1]}`, 
        {
            time: time
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteFile = async (contentId: string, targetId: string, contentType: string) => {
    return await axiosClient.delete(`/${contentType}/${contentId}/targets/${targetId}`)
}


export const ContentGeneralServices = {
    getContentDetailsService,
    editContentDetailsService,
    getUploadUrl,
    uploadFile,
    uploadImageFromVideo,
    deleteFile,
    restoreContentService
}