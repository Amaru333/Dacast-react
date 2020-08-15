import { axiosClient } from '../../../../utils/axiosClient';
import { SecuritySettings } from '../../Settings/Security/types';

const getContentSecuritySettingsService = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`${contentType}/${contentId}/settings/security`)
}

const saveContentSecuritySettingsService = async (data: SecuritySettings, contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/settings/security`, 
        {
            ...data
        }
    )
}

const lockContentService = async (contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/settings/security/lock`)
}

export const ContentSecurityServices = {
    getContentSecuritySettingsService,
    saveContentSecuritySettingsService,
    lockContentService
}