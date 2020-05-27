import axios from 'axios'
import { ProfilePageInfos } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getProfilePageDetailsService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/profile', {headers: {
        'Authorization': token
    }});
}

const saveProfilePageDetailsService = async (userData: ProfilePageInfos) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/profile',
        {...userData}, 
        {headers: {
            'Authorization': token
        }})
}

const saveProfilePasswordService = async (currentPassword: string, newPassword: string) => {
    await isTokenExpired()
    let {token, userId, accessToken} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/change-password',
        {'accessToken': accessToken,
            'currentPassword': currentPassword,
            'newPassword': newPassword
        }, 
        {headers: {
            'Authorization': token
        }}
    )
}

export const ProfileServices = {
    getProfilePageDetailsService,
    saveProfilePageDetailsService,
    saveProfilePasswordService
} 