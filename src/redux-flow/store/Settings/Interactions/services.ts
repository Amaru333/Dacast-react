import axios from 'axios';
import { InteractionsInfos, Ad, MailCatcher } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getInteractionsInfos = () => {
    return axios.get(urlBase + 'settings-interactions');
}

const saveInteractionsInfos = (data: InteractionsInfos) => {
    return axios.put(urlBase + 'settings-interactions', {data: data});
}

const saveAd = (data: Ad) => {
    return axios.put(urlBase + 'settings-interactions-ad', {data: data})
}

const createAd = (data: Ad) => {
    return axios.post(urlBase + 'settings-interactions-ad', {data: data})
}

const deleteAd = (data: Ad) => {
    return axios.delete(urlBase + 'settings-interactions-ad', {data: data})
}

const saveMailCatcher = (data: MailCatcher) => {
    return axios.put(urlBase + 'settings-interactions-mail-catcher', {data: data})
}

const createMailCatcher = (data: MailCatcher) => {
    return axios.post(urlBase + 'settings-interactions-mail-catcher', {data: data})
}

const deleteMailCatcher = (data: MailCatcher) => {
    return axios.delete(urlBase + 'settings-interactions-mail-catcher', {data: data})
}

export const interactionsServices = {
    getInteractionsInfos,
    saveInteractionsInfos,
    saveAd,
    createAd,
    deleteAd,
    saveMailCatcher,
    createMailCatcher,
    deleteMailCatcher
}