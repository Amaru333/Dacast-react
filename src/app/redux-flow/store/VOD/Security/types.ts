import { PasswordProtectedVideo, VideoScheduling, GeoRestriction, DomainControl } from '../../Settings/Security/types';

export enum ActionTypes {
    GET_VOD_SECURITY_SETTINGS = "@@vod_security/GET_VOD_SECURITY_SETTINGS",
    SAVE_VOD_SECURITY_SETTINGS = "@@vod_security/SAVE_VOD_SECURITY_SETTINGS"
}

export interface SecuritySettings {
    passwordProtection: PasswordProtectedVideo;
    contentScheduling: VideoScheduling;
    geoRestriction?: GeoRestriction[];
    selectedGeoRestriction?: string;
    domainControl?: DomainControl[];
    selectedDomainControl?: string;
}

export interface VodSecuritySettings {
    vodId: string;
    securitySettings: SecuritySettings;
}

const defaultStateSecuritySettings: SecuritySettings = {
    passwordProtection: {
        password: ''
    },
    contentScheduling: {
        startTime: 0,
        endTime: 0
    },
    geoRestriction: [],
    domainControl: [],
}

export const defaultStateVodSecuritySettings: VodSecuritySettings = {
    vodId: null,
    securitySettings: defaultStateSecuritySettings
}

