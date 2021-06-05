export type EmbedScalingEndpoint = 'fixed' | 'responsive'
export type EmbedTypeEndpoint = 'iframe' | 'script'

export interface EmbedSettings {
    'embed-type': EmbedTypeEndpoint
    'embed-scaling': EmbedScalingEndpoint
    'embed-size': number
}

export interface RecipePresetEndpoint {
    name: string
    description: string
    size: number
    bitrate: number
}

export interface GetEncodingRecipePresetsOutput {
    presets: RecipePresetEndpoint[]
}

export interface EncodingRecipeDetails {
    isDefault: boolean
    name: string
    recipePresets: string[]
    watermarkFileID?: string
    watermarkFilename?: string
    watermarkPositioningLeft?: number
    watermarkPositioningRight?: number
    recipeGroupID?: string
}

export interface EncodingRecipeId {
    id: string;
}

export type EncodingRecipe = EncodingRecipeDetails & EncodingRecipeId;

export interface GetEncodingRecipesOutput {
    recipes: EncodingRecipe[]
}

export type AdTypeEndpoint = 'pre-roll' | 'mid-roll' | 'post-roll';

export interface AdEnpoint {
    "ad-type": AdTypeEndpoint;
    timestamp: number;
    url: string;
}

export interface AdsSettingsEndpoint {
    adsEnabled: boolean;
    ads: AdEnpoint[];
    locked: boolean;
}

export interface BrandTextEndpoint {
    brandText: string;
    brandTextLink: string;
    isBrandTextAsTitle: boolean;
    locked: boolean;
}

export interface BrandImageEndpoint {
    brandImagePadding: number;
    brandImageSize: number;
    brandImagePosition: string;
    brandImageLink: string;
    locked: boolean;
    brandImageURL: string;
}

export interface EndScreenEndpoint {
    endScreenText: string;
    endScreenTextLink: string;
    locked: boolean;
}

export interface GoogleAnalyticsEndpoint {
    isEnabled: boolean;
    trackingID: string;
    locked: boolean;
}

export interface EngagementSettingsEndpoint {
    adsSettings: AdsSettingsEndpoint;
    brandTextSettings: BrandTextEndpoint;
    brandImageSettings: BrandImageEndpoint;
    endScreenSettings: EndScreenEndpoint;
    googleAnalyticsSettings: GoogleAnalyticsEndpoint;
}

export interface PutAdInput {
    ads: AdEnpoint[];
}

export interface GeoRestrictionDetails {
    name: string;
    isDefault: boolean;
    values: string[];
    restrictionType: 'geo-restriction';
}

export interface GeoRestrictionId {
    id: string;
}

export type GeoRestrictionEndpoint = GeoRestrictionDetails & GeoRestrictionId

export interface DomainControlDetails {
    name: string;
    isDefault: boolean;
    values: string[];
    restrictionType: 'domain-restriction';
}

export interface DomainControlId {
    id: string;
}

export type DomainControlEndpoint = DomainControlDetails & DomainControlId

export interface PasswordProtection {
    password: string;
}

export interface ContentScheduling {
    startTime: number;
    startTimezone: string;
    endTime: number;
    endTimezone: string;
}

export interface GetSecuritySettingsOutput {
    passwordProtection: PasswordProtection | null;
    contentScheduling: ContentScheduling | null;
    geoRestriction: GeoRestrictionEndpoint[] | null;
    domainControl: DomainControlEndpoint[] | null;
}

export interface PutSecuritySettingsInput {
    passwordProtection: PasswordProtection;
    contentScheduling: ContentScheduling;
}

export interface ThemeSettings {
    themeName: string;
    isDefault: boolean;
    isCustom: boolean;
    playerControls: boolean;
    bigPlayButton: 'visible' | 'hidden';
    scrubbingThumbnail: boolean;
    thumbnailPosition: string;
    isViewerCounterEnabled: boolean;
    viewerCounterLimit: number;
    downloadButton: boolean;
    socialSharing: boolean;
    embedCode: boolean;
    customOverlayColor: string;
    customMenuColor: string;
    autoplay: boolean;
    startVideoMuted: boolean;
    looping: boolean;
    continuousPlay: boolean;
    skipVideos: boolean;
    offlineMessage: string;
    offlineMessagePosition: string;
    showFullTimeCode: boolean;
    createdDate: number;
    // deliveryMethod: 'compatible' | 'secure';
    // regionSettings: 'standard' | 'premium';
}

export interface ThemeId {
    id: string;
}

export type ThemeEndpoint = ThemeSettings & ThemeId

export interface GetThemeSettingsOutput {
    themes: ThemeEndpoint[]
}

interface AclEndpoint {
    folder: number
    live: number
    playlist: number
    vod: number
}

export interface ApiKeyEndpoint {
    name: string
    key: string
    status: string
    created_at: number
    updated_at: number
    resource_id: string
    resource_type: string
    acl: AclEndpoint
}

export type GetApiKeysOutput = ApiKeyEndpoint[]

export interface PostApiKeyInput {
    name: string
}

export type PostApiKeyOutput = ApiKeyEndpoint

export interface PatchApiKeyInput {
    id: string
    payload: {
        name: string
    }
}

export type PatchApiKeyOutput = ApiKeyEndpoint