import { GetContentSecuritySettingsOutput } from "../../../../../DacastSdk/common"
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