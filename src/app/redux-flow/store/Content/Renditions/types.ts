import { RecipePreset } from "../../Settings/EncodingRecipes/EncodingRecipesTypes";

export enum ActionTypes {
    GET_CONTENT_RENDITIONS = "@@content_renditions/GET_CONTENT_RENDITIONS",
    ADD_CONTENT_RENDITIONS = "@@content_renditions/ADD_CONTENT_RENDITIONS",
    DELETE_CONTENT_RENDITIONS = "@@content_renditions/DELETE_CONTENT_RENDITIONS"
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
    presets: RecipePreset[];
    encodedRenditions: Rendition[];
    storageRemaining: number;
}

export interface RenditionsListState { 
    [key: string]: {
        [key: string]: RenditionsList 
    }
}

export interface Rendition {
    renditionID: string;
    transcodingJobID: string;
    name: string;
    size: number;
    bitrate: number;
    width: number;
    height: number;
    fileLocation: string;
}