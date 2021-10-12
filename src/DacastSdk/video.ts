import { AssetTypeEndpoint } from "./common";
import { EmbedScalingEndpoint, EmbedTypeEndpoint, RecipePresetEndpoint } from "./settings";

export interface GetVodBrandImageUrl {
    vodID: string
}

type SubtitleEndpoint = AssetTypeEndpoint & {
    languageLongName: string
    languageShortName: string
    name: string
}

interface VideoInfo {
    audioBitrateBytePerSec: number
    audioCodec: string
    durationSec: number
    fileSize: number
    framerate: number
    height: number
    numberAudioChannel: number
    rotationMetadataDegrees: number
    videoBitrateBytePerSec: number
    videoCodec: string
    width: number
}

export interface GetVideoDetailsOutput {
    id: string
    description: string
    embedScaling: EmbedScalingEndpoint
    embedSize: number
    embedType: EmbedTypeEndpoint
    fileLocation: string
    folders: string[]
    online: boolean
    paywallEnabled: boolean | null
    poster: AssetTypeEndpoint
    splashscreen: AssetTypeEndpoint
    thumbnail: AssetTypeEndpoint
    subtitles: SubtitleEndpoint[]
    title: string
    videoInfo: VideoInfo
    vodStorageID: string
    unsecureM3u8Url: string
    cname?: string
}

export interface PutVideoDetailsInput {
    id: string
    payload: PutVideoDetailsPayload
}

interface PutVideoDetailsPayload {
    title: string
    description: string
    online: boolean
}

export interface GetVideoAssetUploadUrl {
    extension: string
    vodID: string
}

export interface GetVideoSubtitleUploadUrl {
    vodID: string
    name: string
    languageLongName: string
    languageShortName: string
    convertToUTF8: boolean
}

export interface PostUploadImageFromVideoInput {
    id: string
    imageType: string
    payload: {
        time: number
    }
}

export interface GetDownloadVodUrlOuput {
    url: string
}

interface VodEncodedRendition {
    bitrate: number
    fileLocation: string
    height: number
    name: string
    renditionID: string
    size: number
    transcodingJobID: string
    width: number
}

export interface GetVodRenditionsOutput {
    id: string
    presets: RecipePresetEndpoint[]
    encodedRenditions: VodEncodedRendition[]
    storageRemaining: number
    videoInfo: VideoInfo
}

interface ChapterMarkerEndpoint {
    start: number
    text: string
}

export interface GetVodChapterMarkersOutput {
    chapterMarkers: ChapterMarkerEndpoint[]
}

export interface PutVodChapterMarkersInput {
    id: string
    payload: {
        chapterMarkers: ChapterMarkerEndpoint[]
    }
}