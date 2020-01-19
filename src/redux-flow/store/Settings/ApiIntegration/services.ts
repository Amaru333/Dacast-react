import axios from 'axios'
import { ApiIntegrationPageInfos } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getSettingsIntegrationService = () => {
    return axios.get(urlBase + 'getSettingsIntegration');
}

const saveSettingsIntegrationService = (data: ApiIntegrationPageInfos) => {
    return axios.post(urlBase + 'saveSettingsIntegration', {...data})
}


export const SettingsIntegrationServices = {
    getSettingsIntegrationService,
    saveSettingsIntegrationService
}