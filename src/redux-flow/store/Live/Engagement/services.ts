import axios from 'axios';
import { Ad } from '../../Settings/Interactions';
import { LiveEngagementSettings } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveEngagementSettings = () => {
    return axios.get(urlBase + 'live-engagements')
}

const saveLiveEngagementSettings = (data: LiveEngagementSettings) => {
    return axios.put(urlBase + 'live-engagements', {data: data})
}

const saveLiveAd = (data: Ad) => {
    return axios.put(urlBase + 'live-engagements-ad', {data: data})
}

const createLiveAd = (data: Ad) => {
    return axios.post(urlBase + 'live-engagements-ad', {data: data})
}

const deleteLiveAd = (data: Ad) => {
    return axios.delete(urlBase + 'live-engagements-ad', {data: data})
}

export const liveEngagementServices = {
    getLiveEngagementSettings,
    saveLiveEngagementSettings,
    saveLiveAd,
    createLiveAd,
    deleteLiveAd
}