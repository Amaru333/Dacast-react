import { AssetEndpoint, GetSearchContentOutput } from '../../../../../DacastSdk/common';
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { ContentStatus, ContentType } from '../../Common/types';
import { ContentItem, SearchResult } from './types';

export const formatGetContentListInput = (qs: string): string => {
    if(!qs) {
        return 'status=online,offline&page=1&per-page=10'
    }

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

export const formatGetContentListOutput = (contentType: ContentType) => (dataEndpoints: GetSearchContentOutput): {data: SearchResult, contentType: ContentType} => {
    let formattedData: SearchResult = {
        pageNumber: dataEndpoints.pageNumber,
        perPage: dataEndpoints.perPage,
        totalResults: dataEndpoints.totalResults,
        results: dataEndpoints.results.map((item: AssetEndpoint): ContentItem => {
            return {
                objectID: item.objectID.substr(item.objectID.indexOf('_') + 1),
                type: item.type === 'channel' ? 'live' : item.type as 'playlist' | 'vod' | 'expo',
                status: capitalizeFirstLetter(item.status) as ContentStatus,
                title: item.title,
                size: item.size,
                // views: item.views,
                duration: item.duration,
                thumbnail: item.thumbnail,
                createdAt: item.createdAt,
                featuresList: item.featuresList,
            }
        })
    }

    return {data: formattedData, contentType: contentType}
}

export const formatDeleteContentInput = (id: string) => id