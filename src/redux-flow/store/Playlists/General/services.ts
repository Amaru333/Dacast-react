import axios from 'axios'
import { PlaylistDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistDetailsService = () => {
    return axios.get(urlBase + 'playlist-details');
}

const editPlaylistDetailsService = (data: PlaylistDetails) => {
    return axios.put(urlBase + 'playlist-details', {...data});
}

const changePlaylistThumbnailService = (data: ThumbnailUpload) => {
    return axios.put(urlBase + 'playlist-thumbnail', {...data})
}

const deletePlaylistThumbnailService = () => {
    return axios.delete(urlBase + 'playlist-thumbnail')
}

const changePlaylistSplashscrenService = (data: SplashscreenUpload) => {
    return axios.put(urlBase + 'playlist-splashscreen', {...data})
}

const deletePlaylistSplashscrenService = () => {
    return axios.delete(urlBase + 'playlist-splashscreen')
}

const changePlaylistPosterService = (data: PosterUpload) => {
    return axios.put(urlBase + 'playlist-poster', {...data})
}

const deletePlaylistPosterService = () => {
    return axios.delete(urlBase + 'playlist-poster')
}

export const PlaylistGeneralServices = {
    getPlaylistDetailsService,
    editPlaylistDetailsService,
    changePlaylistThumbnailService,
    deletePlaylistThumbnailService,
    changePlaylistSplashscrenService,
    deletePlaylistSplashscrenService,
    changePlaylistPosterService,
    deletePlaylistPosterService
}