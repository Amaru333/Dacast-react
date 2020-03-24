import axios from 'axios'
import { ProfilePageInfos } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getProfilePageDetailsService = () => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/profile', {headers: {
        'Authorization': token
    }});
}

const saveProfilePageDetailsService = (userData: ProfilePageInfos) => {
    isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/profile',
        {...userData}, 
        {headers: {
            'Authorization': token
        }})
}

const saveProfilePasswordService = (currentPassword: string, newPassword: string) => {
    isTokenExpired()
    let {token, userId, accessToken} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/change-password',
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