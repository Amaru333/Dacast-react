import { PasswordProtectedVideo, VideoScheduling, GeoRestriction, DomainControl } from '../../Settings/Security/types';

export enum ActionTypes {
    GET_LIVE_SECURITY_SETTINGS = "@@live_security/GET_LIVE_SECURITY_SETTINGS",
    SAVE_LIVE_SECURITY_SETTINGS = "@@live_security/SAVE_LIVE_SECURITY_SETTINGS"
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

export interface LiveSecuritySettings {
    liveId: string;
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

export const defaultStateLiveSecuritySettings: LiveSecuritySettings = {
    liveId: null,
    securitySettings: defaultStateSecuritySettings
}