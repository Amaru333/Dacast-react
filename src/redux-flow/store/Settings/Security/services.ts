import axios from 'axios'
import { SettingsSecurityDetails, GeoRestriction, DomainControl } from './types';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getSettingsSecurityOptionsService = () => {
    return axios.get(urlBase + 'getSettingsSecurityOptions');
}

const saveSettingsSecurityOptionsService = (data: SettingsSecurityDetails) => {
    return axios.post(urlBase + 'saveSettingsSecurityOptions', {...data});
}

const saveGeoRestrictionGroupService = (data: GeoRestriction) => {
    return axios.post(urlBase + 'saveGeoRestrictionGroup', {...data});
}

const deleteGeoRestrictionGroupService = (data: GeoRestriction) => {
    return axios.delete(urlBase + 'deleteGeoRestrictionGroup', {data:{...data}});
}

const saveDomainControlGroupService = (data: DomainControl) => {
    return axios.post(urlBase + 'saveDomainControlGroup', {...data});
}

const deleteDomainControlGroupService = (data: DomainControl) => {
    return axios.delete(urlBase + 'deleteDomainControlGroup', {data:{...data}});
}

export const SettingsServices = {
    getSettingsSecurityOptionsService,
    saveSettingsSecurityOptionsService,
    saveGeoRestrictionGroupService,
    deleteGeoRestrictionGroupService,
    saveDomainControlGroupService,
    deleteDomainControlGroupService

} 