import { axiosClient } from '../../../../utils/axiosClient'


const getContentList = async (qs: string, contentType: string) => {
    return await axiosClient.get('/' + contentType + (qs ? '?' + qs : '?status=online,offline,processing&page=1&per-page=10'))
}

const deleteContentService = async (contentId: string, contentType: string) => {
    return await axiosClient.delete(`/${contentType}/${contentId}`)
}

export const contentListServices = {
    getContentList,
    deleteContentService,
}