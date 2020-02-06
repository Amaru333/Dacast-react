import axios from 'axios'
import { Rendition } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodRenditionsService = () => {
    return axios.get(urlBase + 'vod-rendition')
}

const addVodRenditionsService = (data: Rendition[]) => {
    return axios.put(urlBase + 'vod-rendition', {...data})
}

const deleteVodRenditionsService = (data: Rendition[]) => {
    return axios.delete(urlBase + 'vod-rendition', {data:{...data}})
}

export const VodRenditionsServices = {
    getVodRenditionsService,
    addVodRenditionsService,
    deleteVodRenditionsService
}