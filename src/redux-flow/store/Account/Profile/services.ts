import axios from 'axios'
import { ProfilePageInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getProfilePageDetailsService = () => {
    return axios.get(urlBase + 'getProfilePageDetails');
}

const saveProfilePageDetailsService = (data: ProfilePageInfos) => {
    return axios.post(urlBase + 'saveProfilePageDetails', {...data})
}

const saveProfilePasswordService = (data: string) => {
    return axios.post(urlBase + 'saveProfilePassword', {data})
}

export const ProfileServices = {
    getProfilePageDetailsService,
    saveProfilePageDetailsService,
    saveProfilePasswordService
} 