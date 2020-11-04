export interface EmbedSettings {
    'embed-type': 'iframe' | 'script'
    'embed-scaling': 'fixed' | 'responsive'
    'embed-size': number
}

export interface RecipePresetEndpoint {
    name: string
    description: string
    size: string
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

export type EncodingRecipe = EncodingRecipeDetails & EncodingRecipeId

export interface GetEncodingRecipesOutput {
    recipes: EncodingRecipe[]
}

export interface AdEnpoint {
    "ad-type": string;
    timestamp: number;
    url: string;
}

export interface AdsSettingsEndpoint {
    adsEnabled: boolean
    ads: AdEnpoint[]
    locked: boolean
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

export interface EngagementSettingsEndoint {
    adsSettings: AdsSettingsEndpoint
    brandTextSettings: BrandTextEndpoint
    brandImageSettings: BrandImageEndpoint
    endScreenSettings: EndScreenEndpoint
}

