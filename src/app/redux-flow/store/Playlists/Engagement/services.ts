import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { axiosClient } from '../../../../utils/axiosClient';

const getPlaylistEngagementSettings = async (playlistId: string) => {
    return await axiosClient.get('/playlists/' + playlistId + '/settings/engagement')
}

const savePlaylistEngagementSettings = async (data: ContentEngagementSettings) => {
    return await axiosClient.put('/playlists/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}
    )
}

const savePlaylistAd = async (data: Ad[], adsId: string, playlistId: string) => {
    return await axiosClient.put('/playlists/' + playlistId + '/settings/engagement/ads',
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
            adsId: adsId
        }
    )
}

const getUploadUrl = async (data: string, playlistId: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            playlistID: playlistId
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deletePlaylistAd = async (data: Ad[], adsId: string, playlistId: string) => {
    return await axiosClient.delete('/playlists/' + playlistId + '/settings/engagement/ads')
}

const deleteFile = async (playlistId: string) => {
    return await axiosClient.delete('/playlists/' + playlistId + '/settings/engagement/brand-image')
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