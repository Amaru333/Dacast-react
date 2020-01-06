import { PasswordProtectedVideo, VideoScheduling, GeoRestriction, DomainControl } from '../../Settings/Security/types';

export enum ActionTypes {
    GET_VOD_SECURITY_SETTINGS = "@@vod_security/GET_VOD_SECURITY_SETTINGS"
}

interface SecuritySettings {
    privateVideo: boolean;
    passwordProtectedVideo: PasswordProtectedVideo;
    videoScheduling: VideoScheduling;
    geoRestriction?: GeoRestriction[];
    domainControl?: DomainControl[];
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

