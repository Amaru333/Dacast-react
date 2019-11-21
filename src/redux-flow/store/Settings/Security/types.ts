export enum ActionTypes {
    GET_SETTINGS_SECURITY_OPTIONS = "@@settings_security/GET_SETTINGS_SECURITY_OPTIONS",
    SAVE_SETTINGS_SECURITY_OPTIONS = "@@settings_security/SAVE_SETTINGS_SECURITY_OPTIONS",
    SAVE_GEO_RESTRICTION_GROUP = "@@settings_security/SAVE_GEO_RESTRICTION_GROUP",
    DELETE_GEO_RESTRICTION_GROUP = "@@settings_security/DELETE_GEO_RESTRICTION_GROUP",
    SAVE_DOMAIN_CONTROL_GROUP = "@@settings_security/SAVE_DOMAIN_CONTROL_GROUP",
    DELETE_DOMAIN_CONTROL_GROUP = "@@settings_security/DELETE_DOMAIN_CONTROL_GROUP",

}


export type GeoRestriction = {
    name: string;
    isDefault: boolean;
    countries: string[];
}

export type DomainControl = {
    name: string;
    isDefault: boolean;
    domains: string[];
}

export interface SettingsSecurityDetails {
    privateVideo: boolean;
    passwordProtectedVideo: boolean;
    videoScheduling: boolean;
    geoRestriction: GeoRestriction[];
    domainControl: DomainControl[];
}

export const defaultStateSettingsSecurity: SettingsSecurityDetails = {
    privateVideo: false,
    passwordProtectedVideo: false,
    videoScheduling: false,
    geoRestriction: [],
    domainControl: [],
}