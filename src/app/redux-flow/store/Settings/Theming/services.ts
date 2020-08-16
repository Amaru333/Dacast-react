import { ThemeOptions } from './types';
import { userToken } from '../../../../utils/token';
import { axiosClient } from '../../../../utils/axiosClient';

const getThemingList = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/settings/themes')
}

const createTheme = async (data: ThemeOptions) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/accounts/' + userId + '/settings/themes/',
        {
            ...data
        }
    )
}

const saveTheme = async (data: ThemeOptions) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/settings/themes/' + data.id,
        {
            ...data, 
        }
    )
}

const deleteTheme = async (data: ThemeOptions) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete('/accounts/' + userId + '/settings/themes/' + data.id)
}

export const themingServices = {
    getThemingList,
    createTheme,
    saveTheme,
    deleteTheme
}