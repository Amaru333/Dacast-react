import { SecuritySettings } from '../../Settings/Security/types';
import { axiosClient } from '../../../../utils/axiosClient';

const getVodSecuritySettingsService = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/settings/security')
}

const saveVodSecuritySettingsService = async (data: SecuritySettings, vodId: string) => {
    return await axiosClient.put('/vods/' + vodId + '/settings/security', 
        {
            ...data
        }
    )
}

export const VodSecurityServices = {
    getVodSecuritySettingsService,
    saveVodSecuritySettingsService
}