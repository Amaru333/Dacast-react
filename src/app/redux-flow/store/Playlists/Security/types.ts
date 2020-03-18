import { PasswordProtectedVideo, GeoRestriction, DomainControl } from '../../Settings/Security/types';

export enum ActionTypes {
    GET_PLAYLIST_SECURITY_SETTINGS = "@@playlist_security/GET_PLAYLIST_SECURITY_SETTINGS",
    SAVE_PLAYLIST_SECURITY_SETTINGS = "@@playlist_security/SAVE_PLAYLIST_SECURITY_SETTINGS"
}

export interface SecuritySettings {
    passwordProtectedVideo: PasswordProtectedVideo;
    geoRestriction?: GeoRestriction[];
    selectedGeoRestriction?: string;
    domainControl?: DomainControl[];
    selectedDomainControl?: string;
}

export interface PlaylistSecuritySettings {
    playlistId: string;
    securitySettings: SecuritySettings;
}

const defaultStateSecuritySettings: SecuritySettings = {
    passwordProtectedVideo: {
        enabled: false
    },
    geoRestriction: [],
    domainControl: [],
}

export const defaultStatePlaylistSecuritySettings: PlaylistSecuritySettings = {
    playlistId: null,
    securitySettings: defaultStateSecuritySettings
}

