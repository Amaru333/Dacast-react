import { ActionTypes, EncodingRecipeItem } from "../EncodingRecipes/EncodingRecipesTypes";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { EncodingRecipesData } from './EncodingRecipesTypes';
import { EncodingRecipesServices } from './services';

export interface GetEncodingRecipeDetails {
    type: ActionTypes.GET_ENCODING_RECIPES;
    payload: EncodingRecipesData;
}

export interface CreateEncodingRecipeDetails {
    type: ActionTypes.CREATE_ENCODING_RECIPES;
    payload: EncodingRecipeItem;
}

export interface SaveEncodingRecipeDetails {
    type: ActionTypes.SAVE_ENCODING_RECIPES;
    payload: EncodingRecipeItem;
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

export const createEncodingRecipesAction = (data: EncodingRecipeItem): ThunkDispatch<Promise<void>, {}, CreateEncodingRecipeDetails> => {

    return async (dispatch: ThunkDispatch<ApplicationState , {}, CreateEncodingRecipeDetails> ) => {
        await EncodingRecipesServices.createEncodingRecipeService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CREATE_ENCODING_RECIPES, payload: response.data} );
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
            }).catch(error => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

// export const postWebHooks = (): ThunkDispatch<Promise<void>, {}, GetSettingsIntegrationDetails> => {
//     return async (dispatch: ThunkDispatch<ApplicationState , {}, GetSettingsIntegrationDetails> ) => {
//         await SettingsIntegrationServices.getSettingsIntegrationService()
//             .then( response => {
//                 dispatch( {type: ActionTypes.GET_SETTINGS_INTEGRATIONS_INFOS, payload: response.data} );
//             }).catch(error => {
//                 dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
//             })
//     };
// }


export type Action = GetEncodingRecipeDetails | CreateEncodingRecipeDetails | SaveEncodingRecipeDetails;