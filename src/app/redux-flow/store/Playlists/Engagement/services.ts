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
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
            adsId: adsId
        }, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getUploadUrl = async (data: string, playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/' + data,
        {
            playlistID: playlistId
        },
        {
            headers: {
                Authorization: token
            }
        })
}

const uploadFile = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deletePlaylistAd = async (data: Ad[], adsId: string, playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/engagement/ads',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteFile = async (playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/playlists/' + playlistId + '/settings/engagement/brand-image',
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
    savePlaylistAd,
    getUploadUrl,
    uploadFile,
    deleteFile,
    deletePlaylistAd
}