import axios from 'axios'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getLiveDetailsService = () => {
    return axios.get(urlBase + 'live-details');
}

const saveLiveDetailsService = (data: LiveDetails) => {
    return axios.post(urlBase + 'live-details', {...data});
}

const changeLiveThumbnailService = (data: ThumbnailUpload) => {
    return axios.put(urlBase + 'live/thumbnail', {...data})
}

const changeLiveSplashscrenService = (data: SplashscreenUpload) => {
    return axios.put(urlBase + 'live/splashscreen', {...data})
}

const changeLivePosterService = (data: PosterUpload) => {
    return axios.put(urlBase + 'live/poster', {...data})
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    saveLiveDetailsService,
    changeLiveThumbnailService,
    changeLiveSplashscrenService,
    changeLivePosterService
}