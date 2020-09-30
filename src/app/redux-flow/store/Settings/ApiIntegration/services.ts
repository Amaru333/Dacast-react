import { ApiIntegrationPageInfos } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getSettingsIntegrationService = async () => {
    return await axiosClient.get('/settings-integration-page');
}

const saveSettingsIntegrationService = async (data: ApiIntegrationPageInfos) => {
    return await axiosClient.post('/save-settings-integration', {...data})
}

export const SettingsIntegrationServices = {
    getSettingsIntegrationService,
    saveSettingsIntegrationService
}