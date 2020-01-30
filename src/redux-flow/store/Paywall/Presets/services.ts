import axios from 'axios';
import { } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPresetsInfos = () => {
    return axios.get(urlBase + 'paywall-presets');
}

export const PresetsServices = {
    getPresetsInfos
}
