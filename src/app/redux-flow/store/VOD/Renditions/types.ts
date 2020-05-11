export enum ActionTypes {
    GET_VOD_RENDITIONS = "@@vod_renditions/GET_VOD_RENDITIONS",
    ADD_VOD_RENDITIONS = "@@vod_renditions/ADD_VOD_RENDITIONS",
    DELETE_VOD_RENDITIONS = "@@vod_renditions/DELETE_VOD_RENDITIONS"
}

interface VodInfo {
    videoBitrateBytePerSec: number;
    audioBitrateBytePerSec: number;
    durationSec: number;
    width: number;
    height: number;
    rotationMetadataDegrees: number;
    framerate: number;
    videoCodec: string;
    audioCodec: string;
    numberAudioChannel: number;
    fileSize: number;
}

export interface RenditionsList {
    id: string;
    videoInfo: VodInfo;
    presets: Rendition[];
    encodedRenditions: Rendition[];
}

export interface Rendition {
    renditionID: string;
    name: string;
    size: string;
    bitrate: number;
    encoded?: boolean;
}