import { EmbedSettingsOptionType } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getEmbedSettingsOptionsService = async () => {
    return await axiosClient.get('/settings/embed')
}

const saveEmbedSettingsOptionsService = async (data: EmbedSettingsOptionType) => {
    return await axiosClient.put('/settings/embed',
        {
            ...data
        }
    )
}

export const SettingsServices = {
    getEmbedSettingsOptionsService,
    saveEmbedSettingsOptionsService
} 