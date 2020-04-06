import { ActionTypes, EncodingRecipeItem, RecipePreset } from "../EncodingRecipes/EncodingRecipesTypes";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { EncodingRecipesData } from './EncodingRecipesTypes';
import { EncodingRecipesServices } from './services';

export interface GetEncodingRecipeDetails {
    type: ActionTypes.GET_ENCODING_RECIPES;
    payload: {data: any};
}

export interface GetEncodingRecipePresets {
    type: ActionTypes.GET_ENCODING_RECIPES_PRESETS;
    payload: {data: {presets: RecipePreset[]}};
}

export interface CreateEncodingRecipeDetails {
    type: ActionTypes.CREATE_ENCODING_RECIPES;
    payload: {data: EncodingRecipeItem};
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
    payload: {data: {presignedURL: string}};
}

export interface UploadWatermark {
    type: ActionTypes.UPLOAD_WATERMARK;
    payload: File;
}

export interface DeleteWatermark {
    type: ActionTypes.DELETE_WATERMARK;
    payload: File;
}

export const getEncodingRecipesAction = (): ThunkDispatch<Promise<void>, {}, GetEncodingRecipeDetails> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetEncodingRecipeDetails> ) => {
        await EncodingRecipesServices.getEncodingRecipesService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_ENCODING_RECIPES, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getEncodingRecipesPresetsAction = (): ThunkDispatch<Promise<void>, {}, GetEncodingRecipePresets> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetEncodingRecipePresets> ) => {
        await EncodingRecipesServices.getEncodingRecipesPresetsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_ENCODING_RECIPES_PRESETS, payload: response.data} );
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const createEncodingRecipesAction = (data: EncodingRecipeItem): ThunkDispatch<Promise<void>, {}, CreateEncodingRecipeDetails> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateEncodingRecipeDetails> ) => {
        await EncodingRecipesServices.createEncodingRecipeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_ENCODING_RECIPES, payload: response.data} );
                dispatch(showToastNotification(`${response.data.name} created`, 'fixed', "success"));
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const saveEncodingRecipesAction = (data: EncodingRecipeItem): ThunkDispatch<Promise<void>, {}, SaveEncodingRecipeDetails> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveEncodingRecipeDetails> ) => {
        await EncodingRecipesServices.saveEncodingRecipeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.SAVE_ENCODING_RECIPES, payload: response.data} );
                dispatch(showToastNotification(`${response.data.name} has been updated`, 'fixed', "success"));
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteEncodingRecipesAction = (data: EncodingRecipeItem): ThunkDispatch<Promise<void>, {}, DeleteEncodingRecipeDetails> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteEncodingRecipeDetails> ) => {
        await EncodingRecipesServices.deleteEncodingRecipeService(data)
            .then( () => {
                dispatch( {type: ActionTypes.DELETE_ENCODING_RECIPES, payload: data} );
                dispatch(showToastNotification(`${data.name} has been deleted`, 'fixed', "success"));
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getUploadWatermarkUrl = (): ThunkDispatch<Promise<void>, {}, GetUploadWatermarkUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetUploadWatermarkUrl> ) => {
        await EncodingRecipesServices.getUploadWatermarkUrlService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_UPLOAD_WATERMARK_URL, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const uploadWatermark = (data: File, uploadUrl: string): ThunkDispatch<Promise<void>, {}, UploadWatermark> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, UploadWatermark> ) => {
        await EncodingRecipesServices.uploadWatermarkService(data, uploadUrl)
            .then( response => {
                dispatch( {type: ActionTypes.UPLOAD_WATERMARK, payload: response.data} );
                dispatch(showToastNotification("Watermark file has been uploaded", 'flexible', "success"));
            }).catch((error) => {
                dispatch( {type: ActionTypes.UPLOAD_WATERMARK, payload: error} );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteWatermark = (recipeId: string): ThunkDispatch<Promise<void>, {}, DeleteWatermark> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteWatermark> ) => {
        await EncodingRecipesServices.deleteWatermarkService(recipeId)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_WATERMARK, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = 
GetEncodingRecipeDetails | 
GetEncodingRecipePresets |
CreateEncodingRecipeDetails | 
SaveEncodingRecipeDetails | 
DeleteEncodingRecipeDetails |
GetUploadWatermarkUrl |
UploadWatermark |
DeleteWatermark;