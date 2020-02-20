import axios from 'axios';
import { GroupPrice, GroupPromo } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getGroupsInfos = () => {
    return axios.get(urlBase + 'paywall-groups');
}

const createGroupPrice = (data: GroupPrice) => {
    return axios.post(urlBase + 'paywall-group-price', {data: data})
}

const saveGroupPrice = (data: GroupPrice) => {
    return axios.put(urlBase + 'paywall-group-price', {data: data})
}

const deleteGroupPrice = (data: GroupPrice) => {
    return axios.delete(urlBase + 'paywall-group-price', {data: data})
}

const createGroupPromo = (data: GroupPromo) => {
    return axios.post(urlBase + 'paywall-group-promo', {data: data})
}

const saveGroupPromo = (data: GroupPromo) => {
    return axios.put(urlBase + 'paywall-group-promo', {data: data})
}

const deleteGroupPromo = (data: GroupPromo) => {
    return axios.delete(urlBase + 'paywall-group-promo', {data: data})
}

export const GroupsServices = {
    getGroupsInfos,
    createGroupPrice,
    saveGroupPrice,
    deleteGroupPrice,
    createGroupPromo,
    saveGroupPromo,
    deleteGroupPromo
}
