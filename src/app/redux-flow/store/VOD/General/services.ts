import axios from 'axios'
import { SubtitleInfo, VodDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodDetailsService = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    );
}

const getVodList = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/', 
        {
            headers: {
                Authorization: token
            }
        }
    );
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

const deleteVodPosterService = () => {
    return axios.delete(urlBase + 'vod/poster')
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
    deleteVodPosterService,
    getVodList
}