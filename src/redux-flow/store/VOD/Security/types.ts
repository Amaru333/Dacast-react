import { PasswordProtectedVideo, VideoScheduling, GeoRestriction, DomainControl } from '../../Settings/Security/types';

export enum ActionTypes {
    GET_VOD_SECURITY_SETTINGS = "@@vod_security/GET_VOD_SECURITY_SETTINGS",
    SAVE_VOD_SECURITY_SETTINGS = "@@vod_security/SAVE_VOD_SECURITY_SETTINGS"
}

export interface SecuritySettings {
    privateVideo: boolean;
    passwordProtectedVideo: PasswordProtectedVideo;
    videoScheduling: VideoScheduling;
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

export const defaultStateVodSecuritySettings: VodSecuritySettings = {
    vodId: null,
    securitySettings: defaultStateSecuritySettings
}

