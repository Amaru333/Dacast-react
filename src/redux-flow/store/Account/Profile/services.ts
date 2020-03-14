import axios from 'axios'
import { ProfilePageInfos } from './types';
import { addTokenToHeader } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getProfilePageDetailsService = (accountId: string) => {
    let header = addTokenToHeader();

    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + accountId + '/profile', {headers: {
        'Authorization': header
    }});
}

const saveProfilePageDetailsService = (userData: ProfilePageInfos, accountId: string) => {
    let header = addTokenToHeader();
    return axios.patch('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + accountId + '/profile',
    {...userData}, 
    {headers: {
        'Authorization': header
    }})
}

const saveProfilePasswordService = (data: string) => {
    return axios.post(urlBase + 'saveProfilePassword', {data})
}

export const ProfileServices = {
    getProfilePageDetailsService,
    saveProfilePageDetailsService,
    saveProfilePasswordService
} 