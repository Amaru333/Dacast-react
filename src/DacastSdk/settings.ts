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

