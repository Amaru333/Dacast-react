import { axiosClient } from '../../../../utils/services/axios/axiosClient'
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const getContentAnalyticsService = async (contentId: string, contentType: string) => {
    //return Axios.get('https://api.dacast.com/'+`${contentType}/${contentId}/analytics`)
    return await axiosClient.get(`${contentType}/${contentId}/analytics?endAt=1603880946&startAt=1603839600&schema=PlaysByTime`)
}

export const ContentAnalyticsServices = {
    getContentAnalyticsService,
}