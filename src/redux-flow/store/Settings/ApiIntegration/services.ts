import axios from 'axios'
import { ApiIntegrationPageInfos } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getSettingsIntegrationService = () => {
    return axios.get(urlBase + 'settings-integration-page');
}

const saveSettingsIntegrationService = (data: ApiIntegrationPageInfos) => {
    return axios.post(urlBase + 'saveSettingsIntegration', {...data})
}


export const SettingsIntegrationServices = {
    getSettingsIntegrationService,
    saveSettingsIntegrationService
}