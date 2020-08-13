import axios from 'axios'
import { ProfilePageInfos } from './types';
import {axiosClient} from '../../../../utils/axiosClient';
import { userToken } from '../../../../utils/token';

const getProfilePageDetailsService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id');
    return await axiosClient.get('/accounts/' + userId + '/profile');
}

const saveProfilePageDetailsService = async (userData: ProfilePageInfos) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/profile',
        {
            ...userData
        } 
    )
}

const saveProfilePasswordService = async (currentPassword: string, newPassword: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/accounts/' + userId + '/change-password',
        {
            accessToken: userToken.getTokenInfo().accessToken,
            currentPassword: currentPassword,
            newPassword: newPassword
        }
    )
}

export const ProfileServices = {
    getProfilePageDetailsService,
    saveProfilePageDetailsService,
    saveProfilePasswordService
} 