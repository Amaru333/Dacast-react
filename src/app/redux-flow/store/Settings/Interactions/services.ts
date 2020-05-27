import axios from 'axios';
import { InteractionsInfos, Ad, MailCatcher } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getInteractionsInfos = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveInteractionsInfos = async (data: InteractionsInfos) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/engagement',
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveAd = async (data: Ad[]) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/engagement/ads/',
        {
            ads: data
        }, 
        {
            headers: {
                Authorization: token
            }
        }
    )
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
    saveMailCatcher,
    createMailCatcher,
    deleteMailCatcher
}