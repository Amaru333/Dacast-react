import axios from 'axios'

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getThemingList = () => {
    return axios.get(urlBase + 'setting-themes');
}

export const themingServices = {
    getThemingList
}