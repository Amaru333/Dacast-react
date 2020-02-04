import axios from 'axios';
import { Ad } from '../../Settings/Interactions';
import { VodEngagementSettings } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodEngagementSettings = () => {
    return axios.get(urlBase + 'vod-engagements')
}

const saveVodEngagementSettings = (data: VodEngagementSettings) => {
    return axios.put(urlBase + 'vod-engagements', {data: data})
}

const saveVodAd = (data: Ad) => {
    return axios.put(urlBase + 'vod-engagements-ad', {data: data})
}

const createVodAd = (data: Ad) => {
    return axios.post(urlBase + 'vod-engagements-ad', {data: data})
}

const deleteVodAd = (data: Ad) => {
    return axios.delete(urlBase + 'vod-engagements-ad', {data: data})
}

export const vodEngagementServices = {
    getVodEngagementSettings,
    saveVodEngagementSettings,
    saveVodAd,
    createVodAd,
    deleteVodAd
}