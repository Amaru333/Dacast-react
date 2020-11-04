import { PostUploadUrlInput } from '../../../../../DacastSdk/common';
import { EncodingRecipe, EncodingRecipeDetails, EncodingRecipeId, GetEncodingRecipePresetsOutput, GetEncodingRecipesOutput } from '../../../../../DacastSdk/settings';
import { EncodingRecipeItem, RecipePreset } from './EncodingRecipesTypes';

export const formatGetEncodingRecipesOutput = (data: GetEncodingRecipesOutput): EncodingRecipeItem[] => {
    let formattedData: EncodingRecipeItem[] = data.recipes

    return formattedData
}

export const formatGetEncodingRecipePresetsOutput = (data: GetEncodingRecipePresetsOutput): RecipePreset[] => {
    let formattedData: RecipePreset[] = data.presets

    return formattedData
}

export const formatPostEncodingRecipeInput = (data: EncodingRecipeItem): EncodingRecipeDetails => {
    let formattedData: EncodingRecipeDetails = {
        isDefault: data.isDefault,
        name: data.name,
        recipePresets: data.recipePresets,
        watermarkFileID: data.watermarkFileID,
        watermarkFilename: data.watermarkFilename,
        watermarkPositioningLeft: data.watermarkPositioningLeft,
        watermarkPositioningRight: data.watermarkPositioningRight
    }

    return formattedData
}

export const formatPostEncodingRecipeOutput = (endpointResponse: EncodingRecipeId, dataReact: EncodingRecipeItem): EncodingRecipeItem => {
    let formattedData: EncodingRecipeItem = {
        ...dataReact, 
        id: endpointResponse.id
    }

    return formattedData
}

export const formatPutEncodingRecipeInput = (data: EncodingRecipeItem): EncodingRecipe => {
    let formattedData: EncodingRecipe = {
        id: data.id,
        isDefault: data.isDefault,
        name: data.name,
        recipePresets: data.recipePresets,
        watermarkFileID: data.watermarkFileID,
        watermarkFilename: data.watermarkFilename,
        watermarkPositioningLeft: data.watermarkPositioningLeft,
        watermarkPositioningRight: data.watermarkPositioningRight
    }

    return formattedData
}

export const formatDeleteEncodingRecipeInput = (data: EncodingRecipeItem): string => data.id

export const formatPostWatermarkInput = (): PostUploadUrlInput => {
    let formattedData: PostUploadUrlInput = {
        uploadType: 'transcoding-watermark',
        uploadRequestBody: null
    }
    return formattedData
}

export const formatDeleteWatermarkInput = (data: EncodingRecipeItem): EncodingRecipe => {
    let formattedData: EncodingRecipe = {
        id: data.id,
        isDefault: data.isDefault,
        name: data.name,
        recipePresets: data.recipePresets,
        watermarkFileID: null
    }

    return formattedData
}
