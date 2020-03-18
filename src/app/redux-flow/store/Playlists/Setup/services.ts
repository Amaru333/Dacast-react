import axios from 'axios'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistSetupAction = () => {
    return axios.get(urlBase + 'playlist-setup');
}

const postPlaylistSetupAction = (data: any[]) => {
    return axios.post(urlBase + 'playlist-setup', {...data});
}

export const PlaylistSetupServices = {
    getPlaylistSetupAction,
    postPlaylistSetupAction
}