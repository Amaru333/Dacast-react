import { ActionTypes, EncodingRecipeItem, RecipePreset } from "../EncodingRecipes/EncodingRecipesTypes";
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { applyViewModel } from '../../../../utils/utils';
import { formatDeleteEncodingRecipeInput, formatDeleteWatermarkInput, formatGetEncodingRecipePresetsOutput, formatGetEncodingRecipesOutput, formatPostEncodingRecipeInput, formatPostEncodingRecipeOutput, formatPostWatermarkInput, formatPutEncodingRecipeInput } from './viewModel';
import { PostUploadUrlOutput } from '../../../../../DacastSdk/common';
import { formatPutUploadFileInput } from '../../Common/viewModel';

export interface GetEncodingRecipeDetails {
    type: ActionTypes.GET_ENCODING_RECIPES;
    payload: EncodingRecipeItem[];
}

export interface GetEncodingRecipePresets {
    type: ActionTypes.GET_ENCODING_RECIPES_PRESETS;
    payload: RecipePreset[];
}

export interface CreateEncodingRecipeDetails {
    type: ActionTypes.CREATE_ENCODING_RECIPES;
    payload: EncodingRecipeItem;
}

export interface SaveEncodingRecipeDetails {
    type: ActionTypes.SAVE_ENCODING_RECIPES;
    payload: EncodingRecipeItem;
}

export interface DeleteEncodingRecipeDetails {
    type: ActionTypes.DELETE_ENCODING_RECIPES;
    payload: EncodingRecipeItem;
}

export interface GetUploadWatermarkUrl {
    type: ActionTypes.GET_UPLOAD_WATERMARK_URL;
    payload: {presignedURL: string; fileID: string};
}

export interface UploadWatermark {
    type: ActionTypes.UPLOAD_WATERMARK;
    payload: File;
}

export interface DeleteWatermark {
    type: ActionTypes.DELETE_WATERMARK;
    payload: EncodingRecipeItem;
}

export type Action = GetEncodingRecipeDetails | GetEncodingRecipePresets |CreateEncodingRecipeDetails | SaveEncodingRecipeDetails | DeleteEncodingRecipeDetails |GetUploadWatermarkUrl |UploadWatermark | DeleteWatermark


export const getEncodingRecipesAction = applyViewModel(dacastSdk.getEncodingRecipes, undefined, formatGetEncodingRecipesOutput, ActionTypes.GET_ENCODING_RECIPES, null, 'Couldn\'t get encoding recipes')
export const getEncodingRecipesPresetsAction = applyViewModel(dacastSdk.getEncodingRecipePresets, undefined, formatGetEncodingRecipePresetsOutput, ActionTypes.GET_ENCODING_RECIPES_PRESETS, null, 'Couldn\'t get encoding recipe presets')
export const createEncodingRecipesAction = applyViewModel(dacastSdk.postEncodingRecipe, formatPostEncodingRecipeInput, formatPostEncodingRecipeOutput, ActionTypes.CREATE_ENCODING_RECIPES, 'Encoding recipe has been created', 'Couldn\'t create encoding recipe')
export const saveEncodingRecipesAction = applyViewModel(dacastSdk.putEncodingRecipe, formatPutEncodingRecipeInput, undefined, ActionTypes.SAVE_ENCODING_RECIPES, 'Encoding recipe has been saved', 'Couldn\'t save encoding recipe')
export const deleteEncodingRecipesAction = applyViewModel(dacastSdk.deleteEncodingRecipe, formatDeleteEncodingRecipeInput, undefined, ActionTypes.DELETE_ENCODING_RECIPES, 'Encoding recipe has been deleted', 'Couldn\'t delete encoding recipe')

export const getUploadWatermarkUrl = applyViewModel(dacastSdk.postUploadUrl, formatPostWatermarkInput, (data: PostUploadUrlOutput) => data, ActionTypes.GET_UPLOAD_WATERMARK_URL, null, 'Couldn\'t upload watermark')
export const uploadWatermark = applyViewModel(dacastSdk.putUploadFile, formatPutUploadFileInput, undefined, ActionTypes.UPLOAD_WATERMARK, 'Watermark has been uploaded', 'Couldn\'t upload watermark')
export const deleteWatermark = applyViewModel(dacastSdk.putEncodingRecipe, formatDeleteWatermarkInput, undefined, ActionTypes.DELETE_WATERMARK, 'Watermark file has been deleted', 'Couldn\'t delete watermark file')