import axios from 'axios'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveDetailsService = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + liveId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getLiveList = () => {
    return axios.get(urlBase + 'channels');
}

const saveLiveDetailsService = async (data: LiveDetails) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + data.id, 
        {...data},
        {
            headers: {
                Authorization: token
            }
        }
    )}

const changeLiveThumbnailService = (data: ThumbnailUpload) => {
    return axios.put(urlBase + 'live/thumbnail', {...data})
}

const deleteLiveThumbnailService = () => {
    return axios.delete(urlBase + 'live/thumbnail')
}

const changeLiveSplashscrenService = (data: SplashscreenUpload) => {
    return axios.put(urlBase + 'live/splashscreen', {...data})
}

const deleteLiveSplashscrenService = () => {
    return axios.delete(urlBase + 'live/splashscreen')
}

const changeLivePosterService = (data: PosterUpload) => {
    return axios.put(urlBase + 'live/poster', {...data})
}

const deleteLivePosterService = () => {
    return axios.delete(urlBase + 'live/poster')
}

const deleteLiveChannelService = (data: string) => {
    return axios.delete(urlBase + 'channel', {data}); 
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    getLiveList,
    saveLiveDetailsService,
    changeLiveThumbnailService,
    deleteLiveThumbnailService,
    changeLiveSplashscrenService,
    deleteLiveSplashscrenService,
    changeLivePosterService,
    deleteLivePosterService,
    deleteLiveChannelService
}