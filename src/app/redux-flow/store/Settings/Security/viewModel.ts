import { DomainControlDetails, DomainControlEndpoint, DomainControlId, GeoRestrictionDetails, GeoRestrictionEndpoint, GeoRestrictionId, GetSecuritySettingsOutput, PutSecuritySettingsInput } from '../../../../../DacastSdk/settings';
import { formatTsToMs } from '../../../../../utils/services/date/dateService';
import { defaultDomainControl, defaultGeoRestriction, DomainControl, GeoRestriction, SecuritySettings } from './types';

export const formatGetSecuritySettingsOutput = (data: GetSecuritySettingsOutput): SecuritySettings => {
    let geoRestrictionsList: GeoRestriction[] = []
    let domainControlsList: DomainControl[] = []
    
    geoRestrictionsList.push(defaultGeoRestriction)
    if(data.geoRestriction) {
        geoRestrictionsList.push(...data.geoRestriction)
        if(geoRestrictionsList.filter(g => g.isDefault).length > 1) {
            geoRestrictionsList[0].isDefault = false
        }
    }
    domainControlsList.push(defaultDomainControl)
    if(data.domainControl) {
        domainControlsList.push(...data.domainControl)
        if(domainControlsList.filter(g => g.isDefault).length > 1) {
            domainControlsList[0].isDefault = false
        }
    }
    let formattedData: SecuritySettings = {
        contentScheduling: {...data.contentScheduling, startTime: formatTsToMs(data.contentScheduling.startTime), endTime: formatTsToMs(data.contentScheduling.endTime)},
        geoRestriction: geoRestrictionsList,
        domainControl: domainControlsList,
        passwordProtection: {
            password: data.passwordProtection.password ? data.passwordProtection.password : ""
        }
    }

    return formattedData
}

export const formatPutSecuritySettingsInput = (data: SecuritySettings): PutSecuritySettingsInput => {
    let formattedData: PutSecuritySettingsInput = {
        contentScheduling: data.contentScheduling,
        passwordProtection: {
            password: data.passwordProtection.password ? data.passwordProtection.password : null
        }
    }

    return formattedData
}


export const formatPostGeoRestrictionInput = (data: GeoRestriction): GeoRestrictionDetails => {
    let formattedData: GeoRestrictionDetails = {
        name: data.name,
        values: data.values, 
        isDefault: data.isDefault,
        restrictionType: 'geo-restriction'
    }

    return formattedData
}

export const formatPostGeoRestrictionOutput = (endpointResponse: GeoRestrictionId, dataReact: GeoRestriction): GeoRestriction => {
    let formattedData: GeoRestriction = {
        ...dataReact, 
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutGeoRestrictionInput = (data: GeoRestriction): GeoRestrictionEndpoint => {
    let formattedData: GeoRestrictionEndpoint = {
        id: data.id,
        name: data.name,
        values: data.values, 
        isDefault: data.isDefault,
        restrictionType: 'geo-restriction'
    }

    return formattedData
}

export const formatDeleteGeoRestrictionInput = (data: GeoRestriction): string => data.id

export const formatPostDomainControlInput = (data: DomainControl): DomainControlDetails => {
    let formattedData: DomainControlDetails = {
        name: data.name,
        values: data.values, 
        isDefault: data.isDefault,
        restrictionType: 'domain-restriction'
    }

    return formattedData
}

export const formatPostDomainControlOutput = (endpointResponse: DomainControlId, dataReact: DomainControl): DomainControl => {
    let formattedData: DomainControl = {
        ...dataReact, 
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutDomainControlInput = (data: DomainControl): DomainControlEndpoint => {
    let formattedData: DomainControlEndpoint = {
        id: data.id,
        name: data.name,
        values: data.values, 
        isDefault: data.isDefault,
        restrictionType: 'domain-restriction'
    }

    return formattedData
}

export const formatDeleteDomainControlInput = (data: DomainControl): string => data.id
