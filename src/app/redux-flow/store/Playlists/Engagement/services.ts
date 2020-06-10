import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistEngagementSettings = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )}

const savePlaylistEngagementSettings = async (data: ContentEngagementSettings) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/playlists/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePlaylistAd = async (data: Ad[], adsId: string, playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/engagement/ads',
        {
            ads: data,
            adsId: adsId
        }, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export const playlistEngagementServices = {
    getPlaylistEngagementSettings,
    savePlaylistEngagementSettings,
    savePlaylistAd
}