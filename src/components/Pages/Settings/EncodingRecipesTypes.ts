export interface EncodingRecipeItem {
    name: string,
    isDefault: boolean,
    watermarkFile?: string,
    watermarkPositioningLeft?: number,
    watermarkPositioningRight?: number,
    recipePresets: string[], 
}

export interface EncodingRecipes {
    recipes: EncodingRecipeItem[]
}