import axios from 'axios'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveDetailsService = () => {
    return axios.get(urlBase + 'live-details');
}

const getLiveList = () => {
    return axios.get(urlBase + 'channels');
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

const deleteLiveChannelService = (data: string) => {
    return axios.delete(urlBase + 'channel', {data}); 
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    getLiveList,
    saveLiveDetailsService,
    changeLiveThumbnailService,
    changeLiveSplashscrenService,
    changeLivePosterService,
    deleteLiveChannelService
}