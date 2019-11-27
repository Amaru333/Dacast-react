export interface  SettingsState {
    encodingRecipes: false | EncodingRecipesData;
}

export enum ActionTypes {
    GET_ENCODING_RECIPES = "@@settings_encoding/GET_ENCODING_RECIPES",
}

export interface EncodingRecipeOptionType {
    [key: string]:  string | boolean | number | object; 
}

export interface EncodingRecipeItem {
    name: string,
    isDefault: boolean,
    watermarkFile?: string,
    watermarkPositioningLeft?: number,
    watermarkPositioningRight?: number,
    recipePresets: string[], 
}

export interface EncodingRecipesData {
    recipes: EncodingRecipeItem[]
}

export const defaultEncodingRecipes: EncodingRecipesData = {
    recipes: []
}