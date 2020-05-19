import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistEngagementSettings = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + playlistId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )}

const savePlaylistEngagementSettings = async (data: ContentEngagementSettings) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/playlists/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePlaylistAd = (data: Ad) => {
    return axios.put(urlBase + 'playlist-engagement-ad', {data: data})
}

const createPlaylistAd = (data: Ad) => {
    return axios.post(urlBase + 'playlist-engagement-ad', {data: data})
}

const deletePlaylistAd = (data: Ad) => {
    return axios.delete(urlBase + 'playlist-engagement-ad', {data: data})
}

export const playlistEngagementServices = {
    getPlaylistEngagementSettings,
    savePlaylistEngagementSettings,
    savePlaylistAd,
    createPlaylistAd,
    deletePlaylistAd
}