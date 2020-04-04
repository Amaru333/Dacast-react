export enum ActionTypes {
    GET_ENCODING_RECIPES = "@@settings_encoding/GET_ENCODING_RECIPES",
    CREATE_ENCODING_RECIPES = "@@settings_encoding/CREATE_ENCODING_RECIPES",
    SAVE_ENCODING_RECIPES = "@@settings_encoding/SAVE_ENCODING_RECIPES",
    DELETE_ENCODING_RECIPES = "@@settings_encoding/DELETE_ENCODING_RECIPES",
    GET_UPLOAD_WATERMARK_URL = "@@settings_encoding/GET_UPLOAD_WATERMARK_URL",
    UPLOAD_WATERMARK = "@@settings_encoding/UPLOAD_WATERMARK",
    DELETE_WATERMARK = "@@settings_encoding/DELETE_WATERMARK",
}

export interface EncodingRecipeOptionType {
    [key: string]:  string | boolean | number | object; 
}

export interface EncodingRecipeItem {
    id: string;
    name: string;
    isDefault: boolean;
    watermarkFileID?: string;
    watermarkPositioningLeft?: number;
    watermarkPositioningRight?: number;
    recipePresets: string[];
}

export interface EncodingRecipesData {
    recipes: EncodingRecipeItem[];
    uploadWatermarkUrl?: string
}

export const defaultEncodingRecipes: EncodingRecipesData = {
    recipes: []
}