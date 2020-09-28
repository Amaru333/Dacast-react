import { SecuritySettings, GeoRestriction, DomainControl } from './types';
import { userToken } from '../../../../utils/services/token/tokenService';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getSettingsSecurityOptionsService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/settings/security')
}

const saveSettingsSecurityOptionsService = async (data: SecuritySettings) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedData = data
    delete parsedData.selectedGeoRestriction
    delete parsedData.selectedDomainControl
    return await axiosClient.put('/accounts/' + userId + '/settings/security',
        {
            ...parsedData
        }
    )
}

const createGeoRestrictionGroupService = async (data: GeoRestriction) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedData = data
    delete parsedData.id
    return await axiosClient.post('/accounts/' + userId + '/settings/security/restrictions',
        {
            ...parsedData
        }
    )
}

const saveGeoRestrictionGroupService = async (data: GeoRestriction) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {
            ...data
        }
    )
}

const deleteGeoRestrictionGroupService = async (data: GeoRestriction) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete('/accounts/' + userId + '/settings/security/restrictions/' + data.id)
}

const createDomainControlGroupService = async (data: DomainControl) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedData = data
    delete parsedData.id
    return await axiosClient.post('/accounts/' + userId + '/settings/security/restrictions',
        {
            ...parsedData
        }
    )
}

const saveDomainControlGroupService = async (data: DomainControl) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/settings/security/restrictions/' + data.id,
        {
            ...data
        }
    )
}

const deleteDomainControlGroupService = async (data: DomainControl) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete('/accounts/' + userId + '/settings/security/restrictions/' + data.id)
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