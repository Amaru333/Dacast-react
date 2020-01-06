export enum ActionTypes {
    GET_SETTINGS_SECURITY_OPTIONS = "@@settings_security/GET_SETTINGS_SECURITY_OPTIONS",
    SAVE_SETTINGS_SECURITY_OPTIONS = "@@settings_security/SAVE_SETTINGS_SECURITY_OPTIONS",
    SAVE_GEO_RESTRICTION_GROUP = "@@settings_security/SAVE_GEO_RESTRICTION_GROUP",
    DELETE_GEO_RESTRICTION_GROUP = "@@settings_security/DELETE_GEO_RESTRICTION_GROUP",
    SAVE_DOMAIN_CONTROL_GROUP = "@@settings_security/SAVE_DOMAIN_CONTROL_GROUP",
    DELETE_DOMAIN_CONTROL_GROUP = "@@settings_security/DELETE_DOMAIN_CONTROL_GROUP",

}


export interface GeoRestriction {
    name: string;
    isDefault: boolean;
    countries: string[];
}

export interface DomainControl {
    name: string;
    isDefault: boolean;
    domains: string[];
}

export interface PasswordProtectedVideo {
    enabled: boolean;
    promptTime?: string;
    password?: string;
}

export interface VideoScheduling {
    enabled: boolean;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
}

export interface SettingsSecurityDetails {
    privateVideo: boolean;
    passwordProtectedVideo: PasswordProtectedVideo;
    videoScheduling: VideoScheduling;
    geoRestriction?: GeoRestriction[];
    domainControl?: DomainControl[];
}

export const defaultStateSettingsSecurity: SettingsSecurityDetails = {
    privateVideo: false,
    passwordProtectedVideo: {
        enabled: false
    },
    videoScheduling: {
        enabled: false,
    },
    geoRestriction: [],
    domainControl: [],
}