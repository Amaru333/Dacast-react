export interface  SettingsState {
    encodingRecipes: false | EncodingRecipesData;
}

export enum ActionTypes {
    GET_ENCODING_RECIPES = "@@settings_encoding/GET_ENCODING_RECIPES",
    CREATE_ENCODING_RECIPES = "@@settings_encoding/CREATE_ENCODING_RECIPES",
    SAVE_ENCODING_RECIPES = "@@settings_encoding/SAVE_ENCODING_RECIPES",
    DELETE_ENCODING_RECIPES = "@@settings_encoding/DELETE_ENCODING_RECIPES"
}

export interface EncodingRecipeOptionType {
    [key: string]:  string | boolean | number | object; 
}

export interface EncodingRecipeItem {
    id: string,
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