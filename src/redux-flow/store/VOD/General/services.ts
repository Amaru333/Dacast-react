import axios from 'axios'
import { SubtitleInfo, Thumbnail } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodDetailsService = () => {
    return axios.get(urlBase + 'vod-details');
}

const addVodSubtitleService = (data: SubtitleInfo) => {
    return axios.post(urlBase + 'vod-subtitles', {...data})
}

const editVodSubtitleService = (data: SubtitleInfo) => {
    return axios.post(urlBase + 'vod-subtitles', {...data})
}

const changeVodThumbnailService = (data: Thumbnail) => {
    return axios.post(urlBase + 'vod-thumbnail', {...data})
}

export const VodGeneralServices = {
    getVodDetailsService,
    addVodSubtitleService,
    editVodSubtitleService,
    changeVodThumbnailService
}