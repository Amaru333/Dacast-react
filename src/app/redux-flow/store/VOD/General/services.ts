import { SubtitleInfo, ContentDetails } from './types'
import { axiosClient } from '../../../../utils/axiosClient'

const getVodDetailsService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId)
}

const getVodList = async (qs: string) => {
    return await axiosClient.get('/vods' + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'))
}

const deleteVodService = async (vodId: string) => {
    return await axiosClient.delete('/vods/' + vodId)
}

const restoreVodService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/restore')
}

const editVodDetailsService = async (data: ContentDetails) => {
    return await axiosClient.put('/vods/' + data.id,
        {
            ...data
        }
    )
}

const getUploadUrl = async (data: string, vodId: string, extension: string, subtitleInfo?: SubtitleInfo) => {
    let requestData: any = {
        vodID: vodId,
        extension: extension
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
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            ...requestData
        }
    )
}

const uploadImageFromVideo = async (vodId: string, time: number, imageType: string) => {
    return await axiosClient.post(`/vods/${vodId}/targets/${imageType.split('-')[1]}`, 
        {
            time: time
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteFile = async (vodId: string, targetId: string) => {
    return await axiosClient.delete('/vods/' + vodId + '/targets/' + targetId)
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