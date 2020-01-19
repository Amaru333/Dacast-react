import axios from 'axios'
import { SubtitleInfo, VodDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodDetailsService = () => {
    return axios.get(urlBase + 'vod-details');
}

const getVodList = () => {
    return axios.get(urlBase + 'vods');
}

const editVodDetailsService = (data: VodDetails) => {
    return axios.put(urlBase + 'vod-details', {...data});
}

const addVodSubtitleService = (data: SubtitleInfo) => {
    return axios.post(urlBase + 'vod-subtitle', {...data})
}

const editVodSubtitleService = (data: SubtitleInfo) => {
    return axios.put(urlBase + 'vod-subtitle', {...data})
}

const deleteVodSubtitleService = (data: SubtitleInfo) => {
    return axios.delete(urlBase + 'vod-subtitle', {data:{...data}})
}

const changeVodThumbnailService = (data: ThumbnailUpload) => {
    return axios.put(urlBase + 'vod-thumbnail', {...data})
}

const changeVodSplashscrenService = (data: SplashscreenUpload) => {
    return axios.put(urlBase + 'vod/splashscreen', {...data})
}

const changeVodPosterService = (data: PosterUpload) => {
    return axios.put(urlBase + 'vod/poster', {...data})
}

export const VodGeneralServices = {
    getVodDetailsService,
    editVodDetailsService,
    addVodSubtitleService,
    editVodSubtitleService,
    deleteVodSubtitleService,
    changeVodThumbnailService,
    changeVodSplashscrenService,
    changeVodPosterService,
    getVodList
}