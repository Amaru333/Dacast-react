import { ActionTypes } from "../EncodingRecipes/EncodingRecipesTypes";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../toasts';
import { EncodingRecipesData } from './EncodingRecipesTypes';
import { EncodingRecipesServices } from './services';

export interface GetEncodingRecipeDetails {
    type: ActionTypes.GET_ENCODING_RECIPES;
    payload: EncodingRecipesData;
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


export type Action = GetEncodingRecipeDetails;