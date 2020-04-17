import axios from 'axios'
import { SettingsSecurityDetails, GeoRestriction, DomainControl } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getSettingsSecurityOptionsService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security',
        {headers: {
            'Authorization': token
        }})
}

const saveSettingsSecurityOptionsService = async (data: SettingsSecurityDetails) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security',
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const createGeoRestrictionGroupService = async (data: GeoRestriction) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions',
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const saveGeoRestrictionGroupService = async (data: GeoRestriction) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const deleteGeoRestrictionGroupService = async (data: GeoRestriction) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {headers: {
            'Authorization': token
        }}
    )
}

const createDomainControlGroupService = async (data: DomainControl) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions',
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const saveDomainControlGroupService = async (data: DomainControl) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const deleteDomainControlGroupService = async (data: DomainControl) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {headers: {
            'Authorization': token
        }}
    )
}

export const SettingsServices = {
    getSettingsSecurityOptionsService,
    saveSettingsSecurityOptionsService,
    createGeoRestrictionGroupService,
    saveGeoRestrictionGroupService,
    deleteGeoRestrictionGroupService,
    createDomainControlGroupService,
    saveDomainControlGroupService,
    deleteDomainControlGroupService

} 