
export enum ActionTypes {
    GET_SETTINGS_SECURITY_OPTIONS = "@@settings_security/GET_SETTINGS_SECURITY_OPTIONS",
    SAVE_SETTINGS_SECURITY_OPTIONS = "@@settings_security/SAVE_SETTINGS_SECURITY_OPTIONS",
    CREATE_GEO_RESTRICTION_GROUP = "@@settings_security/CREATE_GEO_RESTRICTION_GROUP",
    SAVE_GEO_RESTRICTION_GROUP = "@@settings_security/SAVE_GEO_RESTRICTION_GROUP",
    DELETE_GEO_RESTRICTION_GROUP = "@@settings_security/DELETE_GEO_RESTRICTION_GROUP",
    CREATE_DOMAIN_CONTROL_GROUP = "@@settings_security/CREATE_DOMAIN_CONTROL_GROUP",
    SAVE_DOMAIN_CONTROL_GROUP = "@@settings_security/SAVE_DOMAIN_CONTROL_GROUP",
    DELETE_DOMAIN_CONTROL_GROUP = "@@settings_security/DELETE_DOMAIN_CONTROL_GROUP",

}

export const defaultGeoRestriction: GeoRestriction = {
    id: '-1',
    name: 'All Countries',
    isDefault: true,
    values: [],
    // restrictionType: 'geo-restriction'
}

export const defaultDomainControl: DomainControl = {
    id: '-1',
    name: 'All Referrers',
    isDefault: true,
    values: [],
    // restrictionType: 'domain-restriction'
}


export interface GeoRestriction {
    id: string;
    name: string;
    isDefault: boolean;
    values: string[];
    // restrictionType: 'geo-restriction';
}

export interface DomainControl {
    id: string;
    name: string;
    isDefault: boolean;
    values: string[];
    // restrictionType: 'domain-restriction';
}

export interface PasswordProtectedVideo {
    password: string;
}

export interface VideoScheduling {
    startTime: number;
    startTimezone: string;
    endTime: number;
    endTimezone: string;
}

export interface SecuritySettings {
    passwordProtection?: PasswordProtectedVideo;
    contentScheduling: VideoScheduling;
    geoRestriction?: GeoRestriction[];
    selectedGeoRestriction?: string;
    domainControl?: DomainControl[];
    selectedDomainControl?: string;
    locked?: boolean;
    useAES?: boolean;
}

export const defaultStateSettingsSecurity: SecuritySettings = {
    passwordProtection: {
        password: null
    },
    useAES: null,
    contentScheduling: {
        startTime: 0,
        startTimezone: null,
        endTime: 0,
        endTimezone: null
    },
    geoRestriction: [],
    domainControl: [],
}


export interface ContentSecuritySettings {
    contentId: string;
    securitySettings: SecuritySettings;
}

export interface ContentSecuritySettingsState {
    [contentType: string]: {
        [key: string]: ContentSecuritySettings
    }
};

const defaultStateSecuritySettings: SecuritySettings = {
    passwordProtection: {
        password: ''
    },
    contentScheduling: {
        startTime: 0,
        startTimezone: null,
        endTime: 0,
        endTimezone: null
    },
    geoRestriction: [],
    domainControl: [],
    useAES: null
}

export const defaultStateContentSecuritySettings: ContentSecuritySettingsState = {};
