import { axiosClient } from '../../../../utils/axiosClient'

const formatQsToEndpoint = (qs: string) => {
    console.log(Object.fromEntries(new URLSearchParams(qs)))
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
    console.log(contentType)
    if(contentType === 'exposs') {
        return { data: {"data":{"results":[{"ownerID":"c4047a96-bb64-3226-170d-2a4be58f928c","objectID":"playlist_1746b6e4-c7a0-c69a-1d1e-ed75cf0f8ede","type":"playlist","title":"Test","createdAt":1597760973,"status":"online","featuresList":{"paywall":false,"recording":false,"aes":false,"rewind":false,"advertising":false}},{"ownerID":"c4047a96-bb64-3226-170d-2a4be58f928c","objectID":"playlist_fd701db5-a1c3-6367-9a3d-2877049808a1","type":"playlist","title":"Test","createdAt":1597760470,"status":"online","featuresList":{"paywall":false,"recording":false,"aes":false,"rewind":false,"advertising":false}}],"perPage":10,"totalResults":2,"page":1}} }
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