import { GetContentSecuritySettingsOutput, PutContentSecuritySettingsInput } from "../../../../../DacastSdk/common"
import { ContentType } from "../../Common/types"
import { ContentSecuritySettings, defaultDomainControl, defaultGeoRestriction, DomainControl, GeoRestriction } from "../../Settings/Security"

export const formatGetContentSecuritySettingsInput = (data: string): string => data

export const formatGetContentSecuritySettingsOutput = (contentType: ContentType) => (endpointResponse: GetContentSecuritySettingsOutput, dataReact: string): ContentSecuritySettings & {contentType: ContentType} => {

    let geoRestrictionsList: GeoRestriction[] = []
    let domainControlsList: DomainControl[] = []
    
    geoRestrictionsList.push(defaultGeoRestriction)
    if(endpointResponse.geoRestriction) {
        geoRestrictionsList.push(...endpointResponse.geoRestriction)
        if(geoRestrictionsList.filter(g => g.isDefault).length > 1) {
            geoRestrictionsList[0].isDefault = false
        }
    }
    domainControlsList.push(defaultDomainControl)
    if(endpointResponse.domainControl) {
        domainControlsList.push(...endpointResponse.domainControl)
        if(domainControlsList.filter(g => g.isDefault).length > 1) {
            domainControlsList[0].isDefault = false
        }
    }

    let formattedData: ContentSecuritySettings & {contentType: ContentType} = {
        securitySettings: {
            contentScheduling: {...endpointResponse.contentScheduling, startTime: endpointResponse.contentScheduling.startTime, endTime: endpointResponse.contentScheduling.endTime},
            geoRestriction: geoRestrictionsList,
            domainControl: domainControlsList,
            passwordProtection: {
                password: endpointResponse.passwordProtection.password ? endpointResponse.passwordProtection.password : ""
            },
            selectedDomainControl: endpointResponse.selectedDomainControl ? endpointResponse.selectedDomainControl : null,
            selectedGeoRestriction: endpointResponse.selectedGeoRestriction ? endpointResponse.selectedGeoRestriction : null

        },
        contentId: dataReact,
        contentType: contentType
    }

    return formattedData
}

export const formatPutContentSecuritySettingsInput = (data: ContentSecuritySettings): PutContentSecuritySettingsInput => {
    let formattedData: PutContentSecuritySettingsInput = {
        id: data.contentId,
        payload: {
            contentScheduling: data.securitySettings.contentScheduling,
            passwordProtection: {
                password: data.securitySettings.passwordProtection.password ? data.securitySettings.passwordProtection.password : null
            },
            selectedDomainControl: data.securitySettings.selectedDomainControl === '-1' ? null : data.securitySettings.selectedDomainControl,
            selectedGeoRestriction: data.securitySettings.selectedGeoRestriction === '-1' ? null : data.securitySettings.selectedGeoRestriction,
            locked: data.securitySettings.locked
        }
    }

    return formattedData
}

export const formatPutContentSecuritySettingsOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: ContentSecuritySettings): ContentSecuritySettings & {contentType: ContentType} => {
    let formattedData: ContentSecuritySettings & {contentType: ContentType} = {
        ...dataReact,
        contentType: contentType
    }

    return formattedData
}

export const formatPutLockContentSecuritySettings = (data: string): string => data