import axios from 'axios';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodEngagementSettings = () => {
    return axios.get(urlBase + 'vod-engagements')
}

export const vodEngagementServices = {
    getVodEngagementSettings
}