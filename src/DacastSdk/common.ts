import { GetExpoAssetUploadUrl } from "./expo"
import { GetLiveAssetUploadUrl, GetLiveBrandImageUrl } from "./live"
import { PaywallThemeEndpoints, PriceEndpoints, PriceSettingsEndpoints } from "./paywall"
import { GetPlaylistAssetUploadUrl } from "./playlist"
import { EngagementSettingsEndpoint, GetSecuritySettingsOutput, PutAdInput, PutSecuritySettingsInput, ThemeEndpoint, ThemeSettings } from "./settings"
import { GetVideoAssetUploadUrl, GetVideoSubtitleUploadUrl, GetVodBrandImageUrl } from "./video"

export interface GetCompanyLogoUploadUrl {
    userID: string
}

export interface GetUserBrandImageUploadUrl {
    userID: string
}

export type ContentUploadType = 'subtitle' | 'vod-thumbnail' | 'vod-splashscreen' | 'vod-poster' | 'live-thumbnail' | 'live-splashscreen' | 'live-poster' | 'playlist-thumbnail' | 'playlist-splashscreen' | 'playlist-poster' | 'expo-poster'

export type PostUploadUrlInput = {
    uploadType: 'company-logo' | 'transcoding-watermark' | 'player-watermark' | ContentUploadType
    uploadRequestBody: GetCompanyLogoUploadUrl | GetUserBrandImageUploadUrl | GetVodBrandImageUrl | GetLiveBrandImageUrl | GetExpoAssetUploadUrl | GetLiveAssetUploadUrl | GetPlaylistAssetUploadUrl | GetVideoAssetUploadUrl | GetVideoSubtitleUploadUrl | null
}

export interface PostUploadUrlOutput {
    presignedURL: string
    fileID?: string
    targetID?: string
}

export interface PutUploadFileInput {
    uploadUrl: string
    data: File
}

export interface FeaturesList {
    paywall?: boolean;
    recording?: boolean;
    playlist?: boolean;  
    rewind?: boolean;
    advertising?: boolean;
    folder?: boolean;
}

export interface AssetEndpoint {
    ownerID: string;
    objectID: string;
    createdAt: number;
    title: string;
    type: 'expo' | 'vod' | 'channel' | 'playlist';
    status: 'deleted' | 'offline' | 'online' | 'processing';
    featuresList: FeaturesList;
    size?: number;
    duration?: number;
    thumbnail?: string;
    views?: number;
    channelType?: string;
}

export interface GetSearchContentOutput {
    totalResults: number;
    results: AssetEndpoint[];
    perPage: number;
    page: number;
}

export interface BulkActionItem {
    contentType: 'rendition' | 'vod' | 'channel' | 'playlist' | 'expos';
    id?: string;
    name?: string;
}

export interface PostBulkActionInput {
    action: 'delete' | 'theme' | 'online' | 'paywall' | 'create';
    items: BulkActionItem[];
    targetValue?: string | boolean;
}

interface BulkItemAdditionResponseField {
    status: number;
    error?: string;
}

type BulkActionReponseItem = BulkActionItem & BulkItemAdditionResponseField

export interface PostBulkActionOutput {
    attempted: number;
    action: string;
    errors: boolean;
    items: BulkActionReponseItem[]
}

export type PutContentEngagementSettingsInput = EngagementSettingsEndpoint & {id: string}

export interface PutContentLockEngagementSettingsInput {
    id: string;
    section: 'brand-image' | 'ads' | 'brand-text' | 'end-screen-text';
    action: 'lock' | 'unlock';
}

export type PutContentAdsInput = {data: PutAdInput} & {id: string}

export interface AssetTypeEndpoint {
    url?: string
    targetID?: string
    targetType?: 'splashscreen' | 'thumbnail' | 'poster'
    assetId?: string
}

export interface DeleteContentImageAssetIdInput {
    id: string
    targetId: string
}

export interface GetContentPaywallInfoOutput {
    introVodId: string
    paywallEnabled: boolean
    selectedTheme: string
    themes: PaywallThemeEndpoints[]
}

export interface PutContentPaywallInfoInput {
    id: string
    payload: {
        introVodId: string
        paywallEnabled: boolean
        selectedTheme: string
    }
}

export interface GetContentPricesOutput {
    prices: {
        id: string
        currency: string
        description: string
        price: number
        settings: PriceSettingsEndpoints
        type: 'individual'
    }[]
}

export interface PostContentPriceInput {
    contentId: string
    prices: PriceEndpoints[]
    settings: PriceSettingsEndpoints
}

export interface PostContentPriceOutput {
    id: string
}

export interface PutContentPriceInput {
    id: string
    contentId: string
    price: PriceEndpoints
    settings: PriceSettingsEndpoints
}

export interface DeleteContentPriceInput {
    id: string
    contentId: string
}

interface ContentSecurityExtraFields {
    locked: boolean
    selectedGeoRestriction?: string
    selectedDomainControl?: string 
}

export type GetContentSecuritySettingsOutput = GetSecuritySettingsOutput & ContentSecurityExtraFields

export type PutContentSecuritySettingsInput = {
    id: string
    payload: PutSecuritySettingsInput & ContentSecurityExtraFields
}

export interface GetContentThemeOutput {
    contentThemeID: string
    themes: ThemeEndpoint[]
}

export interface PostContentCustomThemeInput {
    contentId: string
    payload: ThemeSettings
}

export interface PutContentThemeInput {
    contentId: string
    actionWord: '/set' | ''
    payload: ThemeEndpoint
}

export interface GetWebSocketOutput {
    endpoint: string
}