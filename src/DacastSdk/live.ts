import { AssetTypeEndpoint } from "./common";
import { EmbedScalingEndpoint, EmbedTypeEndpoint } from "./settings";

export interface PostEncoderKeyOutput {
    encoder_key: string
}

export interface GetLiveBrandImageUrl {
    liveID: string
}

export interface GetLiveDetailsOutput {
    id: string
    online: boolean
    title: string
    description: string
    folders: string[]
    countdown: {startTime: number | null}
    embedScaling: EmbedScalingEndpoint
    embedSize: number
    embedType: EmbedTypeEndpoint
    encoderKey: string
    folder: boolean | null
    splashscreen: AssetTypeEndpoint
    poster: AssetTypeEndpoint
    thumbnail: AssetTypeEndpoint
    unsecureM3u8Url: string
    paywallEnabled: boolean | null
    recording: boolean
    recordingStatus: string
    rewind: boolean
    backupPublishURL: string
    username: string
    password: string
    primaryPublishURL: string
    provider: string
    streamKeys: string[]
    watchingStatus: boolean
    advancedStreaming: boolean
    advancedStreamingStatus: string
    china: boolean
    cname?: string
}

export type ChannelRegion = 'north-america' | 'asia-pacific' | 'europe'

export interface PostLiveInput {
    title: string
    online: boolean
    region: ChannelRegion
    renditionCount: number
    enabledAdvancedStreaming: boolean
    china: boolean
}

export interface PostLiveOutput {
    id: string
}

export interface PutLiveDetailsInput {
    id: string
    payload: PutLiveDetailsPayload
}

interface PutLiveDetailsPayload {
    title: string
    description: string
    online: boolean
    countdown: {startTime: number | null}
    recording: boolean
    rewind?: boolean
}

export interface GetLiveAssetUploadUrl {
    extension: string
    liveID: string
}