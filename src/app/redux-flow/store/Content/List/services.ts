import { axiosClient } from '../../../../utils/axiosClient'

const formatQsToEndpoint = (qs: string) => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page}&per-page=${objectFromQs.perPage}&status=${objectFromQs.status}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&keyword=${objectFromQs.keyword}` : '') + (objectFromQs.features ? `&features=${objectFromQs.features}` : '')
    if(objectFromQs.afterDate || objectFromQs.beforeDate) {
        endpointsQs+= `&created-at=${objectFromQs.afterDate ? objectFromQs.afterDate : ''},${objectFromQs.beforeDate ? objectFromQs.beforeDate : ''}`
    }
    if(objectFromQs.sizeStart || objectFromQs.sizeEnd) {
        endpointsQs+= `&size=${objectFromQs.sizeStart ? objectFromQs.sizeStart : ''},${objectFromQs.sizeEnd ? objectFromQs.sizeEnd : ''}`
    }

    return endpointsQs
}
const getContentList = async (qs: string, contentType: string) => {
    if(contentType === 'exposs') {
        contentType = 'expos'
    }
    return await axiosClient.get('/' + contentType + '?' + (qs ? formatQsToEndpoint(qs) : 'status=online,offline&page=1&per-page=10'))
}

const deleteContentService = async (contentId: string, contentType: string) => {
    return await axiosClient.delete(`/${contentType}/${contentId}`)
}

export const contentListServices = {
    getContentList,
    deleteContentService,
}