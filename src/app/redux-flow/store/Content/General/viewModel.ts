import { AssetTypeEndpoint, ContentUploadType, DeleteContentImageAssetIdInput, PostUploadUrlInput, PostUploadUrlOutput, PutUploadFileInput } from "../../../../../DacastSdk/common";
import { GetExpoDetailsOutput, PutExpoDetailsInput } from "../../../../../DacastSdk/expo";
import { GetLiveDetailsOutput, PostEncoderKeyOutput, PutLiveDetailsInput } from "../../../../../DacastSdk/live";
import { GetPlaylistDetailsOutput, PutPlaylistDetailsInput } from "../../../../../DacastSdk/playlist";
import { GetVideoDetailsOutput, PostUploadImageFromVideoInput, PutVideoDetailsInput } from "../../../../../DacastSdk/video";
import { ContentType } from "../../Common/types";
import { AssetType, ExpoDetails, LiveDetails, PlaylistDetails, SubtitleInfo, VodDetails } from "./types";

const formatAssetType = (asset: AssetTypeEndpoint): AssetType => {
    if(!asset.targetID) {
        return {}
    }
    let formattedAsset: AssetType = {
        targetID: asset.targetID,
        targetType: asset.targetType,
        url: asset.url
    }

    return formattedAsset
}

export const formatGetContentDetailsInput = (data: string): string => data

export const formatGetVideoDetailsOutput = (contentType: ContentType) => (data: GetVideoDetailsOutput): VodDetails & {contentType: ContentType} => {
    let formattedData: VodDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        subtitles: data.subtitles,
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutVideoDetailsInput = (data: VodDetails): PutVideoDetailsInput => {
    let formattedData: PutVideoDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online
        }
    }

    return formattedData
}

export const formatPutVideoDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: VodDetails): VodDetails & {contentType: ContentType} => {
    let formattedData: VodDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetLiveDetailsOutput = (contentType: ContentType) => (data: GetLiveDetailsOutput): LiveDetails & {contentType: ContentType} => {
    let formattedData: LiveDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        unsecureM3u8Url: data.unsecureM3u8Url,
        countdown: data.countdown,
        recording: data.recording,
        rewind: data.rewind,
        backupPublishURL: data.backupPublishURL,
        username: data.username,
        password: data.password,
        primaryPublishURL: data.primaryPublishURL,
        streamKeys: data.streamKeys,
        encoderKey: data.encoderKey,
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutLiveDetailsInput = (data: LiveDetails): PutLiveDetailsInput => {
    let formattedData: PutLiveDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online,
            countdown: data.countdown,
            recording: data.recording
        }
    }

    return formattedData
}

export const formatPutLiveDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: LiveDetails): LiveDetails & {contentType: ContentType} => {
    let formattedData: LiveDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetPlaylistDetailsOutput = (contentType: ContentType) => (data: GetPlaylistDetailsOutput): PlaylistDetails & {contentType: ContentType} => {
    let formattedData: PlaylistDetails & {contentType: ContentType} = {
        id: data.id,
        title: data.title,
        description: data.description,
        online: data.online,
        folders: data.folders,
        embedScaling: data.embedScaling,
        embedSize: data.embedSize,
        embedType: data.embedType,
        splashscreen: formatAssetType(data.splashscreen),
        thumbnail: formatAssetType(data.thumbnail),
        poster: formatAssetType(data.poster),
        uploadurl: null,
        contentType: contentType
    }

    return formattedData
}

export const formatPutPlaylistDetailsInput = (data: PlaylistDetails): PutPlaylistDetailsInput => {
    let formattedData: PutPlaylistDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            online: data.online
        }
    }

    return formattedData
}

export const formatPutPlaylistDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: PlaylistDetails): PlaylistDetails & {contentType: ContentType} => {
    let formattedData: PlaylistDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatGetExpoDetailsOutput = (contentType: ContentType) => (data: GetExpoDetailsOutput): ExpoDetails & {contentType: ContentType} => {
    let formattedData: ExpoDetails & {contentType: ContentType} = {
        ...data,
        contentType: contentType,
        appearance: {
            darkModeEnable: data.appearance.darkMode,
            coverBackgroundEnable: data.appearance.cover ? true : false,
            coverBackgroundUrl: data.appearance.cover && data.appearance.cover.url ? data.appearance.cover.url : null,
            coverBackgroundColor: data.appearance.cover && data.appearance.cover.headerColor ? data.appearance.cover.headerColor : null,
            contentDescriptions: data.appearance.showContentsDescription,
            featuredContentEnable: data.appearance.featuredContentId ? true : false,
            featuredContentId: data.appearance.featuredContentId

        }
    }

    return formattedData
}

export const formatPutExpoDetailsInput = (data: ExpoDetails): PutExpoDetailsInput => {
    let formattedData: PutExpoDetailsInput = {
        id: data.id,
        payload: {
            title: data.title,
            description: data.description,
            appearance: data.appearance,
            online: data.online,
            poster: data.poster ? {
                assetId: data.poster.assetId,
                url: data.poster.url
            } : null
        }
    }
    return formattedData
}

export const formatPutExpoDetailsOutput = (contentType: ContentType) => (endpointResponse: null, data: ExpoDetails): ExpoDetails & {contentType: ContentType} => {
    let formattedData: ExpoDetails & {contentType: ContentType} = {
        ...data, 
        contentType: contentType
    }

    return formattedData
}

export const formatPostVodAssetUploadUrlInput = (data: {assetType: ContentUploadType, contentId: string, extension: string, subtitleInfo?: SubtitleInfo}): PostUploadUrlInput => {
    
    console.log('view model data', data)

    if (data.subtitleInfo) {
        let formattedData: PostUploadUrlInput = {
            uploadType: 'subtitle',
            uploadRequestBody: {
                vodID: data.contentId,
                name: data.subtitleInfo.name,
                languageLongName: data.subtitleInfo.languageLongName,
                languageShortName: data.subtitleInfo.languageShortName,
                convertToUTF8: data.subtitleInfo.convertToUTF8
            }
        }

        return formattedData
    }

    let formattedData: PostUploadUrlInput = {
        uploadType: data.assetType,
        uploadRequestBody: {
            extension: data.extension,
            vodID: data.contentId
        }
    }

    return formattedData
}

export const fomatPostVodAssetUploadOutput = (contentType: ContentType) => (endpointResponse: PostUploadUrlOutput, dataReact: { contentId: string; subtitleInfo?: SubtitleInfo }): {contentId: string; url: string, contentType: ContentType, subtitleInfo?: SubtitleInfo} => {
    let formattedData: {contentId: string; url: string, contentType: ContentType, subtitleInfo?: SubtitleInfo} = {
        contentId: dataReact.contentId,
        url: endpointResponse.presignedURL,
        contentType: contentType
    }

    if(endpointResponse.fileID) {
        formattedData.subtitleInfo = {
            ...dataReact.subtitleInfo,
            targetID: endpointResponse.fileID
        }
    }

    return formattedData
}

export const formatPostLiveAssetUploadUrlInput = (data: {assetType: ContentUploadType, contentId: string, extension: string}): PostUploadUrlInput => {

    let formattedData: PostUploadUrlInput = {
        uploadType: data.assetType,
        uploadRequestBody: {
            extension: data.extension,
            liveID: data.contentId
        }
    }
    return formattedData
}

export const fomatPostLiveAssetUploadOutput = (contentType: ContentType) => (endpointResponse: PostUploadUrlOutput, dataReact: { contentId: string; data?: SubtitleInfo }): {contentId: string; url: string, contentType: ContentType} => {
    let formattedData: {contentId: string; url: string, contentType: ContentType} = {
        contentId: dataReact.contentId,
        url: endpointResponse.presignedURL,
        contentType: contentType
    }

    return formattedData
}

export const formatPostPlaylistAssetUploadUrlInput = (data: {assetType: ContentUploadType, contentId: string, extension: string}): PostUploadUrlInput => {

    let formattedData: PostUploadUrlInput = {
        uploadType: data.assetType,
        uploadRequestBody: {
            extension: data.extension,
            playlistID: data.contentId
        }
    }
    return formattedData
}

export const fomatPostPlaylistAssetUploadOutput = fomatPostLiveAssetUploadOutput

export const formatPostExpoAssetUploadUrlInput = (data: {assetType: ContentUploadType, contentId: string, extension: string}): PostUploadUrlInput => {

    let formattedData: PostUploadUrlInput = {
        uploadType: data.assetType,
        uploadRequestBody: {
            extension: data.extension,
            expoID: data.contentId
        }
    }
    return formattedData
}

export const fomatPostExpoAssetUploadOutput = fomatPostLiveAssetUploadOutput

export const formatPostEncoderKeyInput = (data: string): string => data

export const formatPostEncoderKeyOutput = (contentType: ContentType) => (endpointResponse: PostEncoderKeyOutput, dataReact: string): {encoderKey: string, contentId: string; contentType: ContentType} => {
    let formattedData: {encoderKey: string, contentId: string; contentType: ContentType} = {
        encoderKey: endpointResponse.encoder_key,
        contentId: dataReact,
        contentType: contentType
    }

    return formattedData
}

export const formatPostUploadImageFromVideoInput = (data: {id: string; imageType: string; time: number}): PostUploadImageFromVideoInput => {
    let formattedData: PostUploadImageFromVideoInput = {
        id: data.id,
        imageType: data.imageType.split('-')[1],
        payload: {
            time: data.time
        }
    }

    return formattedData
}

export const formatDeleteContentImageAssetInput = (data: {id: string; contentId: string;}): DeleteContentImageAssetIdInput => {
    let formattedData: DeleteContentImageAssetIdInput = {
        id: data.contentId,
        targetId: data.id
    }

    return formattedData
}

export const formatDeleteContentImagesAssetOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: {id: string; contentId: string;}): {id: string; contentId: string;} & {contentType: ContentType} => {
    let formattedData: {id: string; contentId: string;} & {contentType: ContentType} = {
        ...dataReact,
        contentType: contentType
    }

    return formattedData
}

export const formatPutUploadFileOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: {data: File, uploadUrl: string, contentId: string}): {contentId: string} & {contentType: ContentType} => {
    let formattedData: {contentId: string} & {contentType: ContentType} = {
        contentId: dataReact.contentId,
        contentType: contentType
    }

    return formattedData
}

export const formatPutSubtitleInput = (data: {data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string}): PutUploadFileInput => {
    let formattedData: PutUploadFileInput = {
        data: data.data,
        uploadUrl: data.uploadUrl
    }

    return formattedData
}

export const formatPutSubtitleOutput = (contentType: ContentType) => (endpointResponse: null, data: {data: File, uploadUrl: string, subtitleInfo: SubtitleInfo, contentId: string}): {data: SubtitleInfo, contentId: string} & {contentType: ContentType} => {
    let formattedData: {data: SubtitleInfo, contentId: string} & {contentType: ContentType} = {
        contentId: data.contentId, 
        contentType: contentType, 
        data: {...data.subtitleInfo, url: data.subtitleInfo.targetID ? `https://universe-files.dacast.com/${data.subtitleInfo.targetID}` : null}}

    return formattedData
}