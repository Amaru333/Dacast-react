import { SecuritySettings } from '../../Settings/Security/types';
import { axiosClient } from '../../../../utils/axiosClient';

const getLiveSecuritySettingsService = async (liveId: string) => {
    return await axiosClient.get('/channels/' + liveId + '/settings/security')
}

const saveLiveSecuritySettingsService = async (data: SecuritySettings, liveId: string) => {
    return await axiosClient.put('/channels/' + liveId + '/settings/security', 
        {...data}
    )
}

export const LiveSecurityServices = {
    getLiveSecuritySettingsService,
    saveLiveSecuritySettingsService
}