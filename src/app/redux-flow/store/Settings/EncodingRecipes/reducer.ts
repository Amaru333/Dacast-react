import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultEncodingRecipes} from "../EncodingRecipes/EncodingRecipesTypes";
import { EncodingRecipesData } from './EncodingRecipesTypes';
const reducer: Reducer<EncodingRecipesData> = (state = defaultEncodingRecipes , action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ENCODING_RECIPES:
            return {
                ...state, 
                recipes: action.payload.data.recipes.map(recipe => {
                    return {
                        id: recipe.id,
                        name: recipe.name,
                        isDefault: recipe.isDefault,
                        watermarkFileID: recipe.watermarkFileID,
                        watermarkPositioningLeft: recipe.watermarkPositioningLeft,
                        watermarkPositioningRight: recipe.watermarkPositioningRight,
                        recipePresets: recipe.recipe.map(s => s.name)
                    }
                })
            }
        case ActionTypes.GET_ENCODING_RECIPES_PRESETS:
            return {
                ...state, 
                defaultRecipePresets: action.payload.data.presets
            }
        case ActionTypes.CREATE_ENCODING_RECIPES:   
            let recipes = state.recipes.slice()
            if(action.payload.data.isDefault) {
                recipes = recipes.map((item) => {return {...item, isDefault: false}})
            }
            recipes.splice(recipes.length, 0, action.payload.data )
            return {...state,
                recipes  
            }
        case ActionTypes.SAVE_ENCODING_RECIPES:
            if(action.payload.isDefault) {  
                recipes = state.recipes.map((item) => {return {...item, isDefault: false}})
            }
            return  {...state, recipes: recipes.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.DELETE_ENCODING_RECIPES:
            return {...state, recipes: state.recipes.filter((item) => item.id != action.payload.id)}

        case ActionTypes.GET_UPLOAD_WATERMARK_URL:   
            return {
                ...state,
                uploadWatermarkUrl: action.payload.data.presignedURL,
                isUploading: true
            }
        case ActionTypes.UPLOAD_WATERMARK:
            return {
                ...state,
                isUploading: false
            }
        case ActionTypes.DELETE_WATERMARK:
            return {
                ...state,
            }
        default:
            return state;
    }
};

// Named export
export { reducer as EncodingRecipesReducer };
