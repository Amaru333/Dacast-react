import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultEncodingRecipes} from "../EncodingRecipes/EncodingRecipesTypes";
import { EncodingRecipesData } from './EncodingRecipesTypes';
const reducer: Reducer<EncodingRecipesData> = (state = defaultEncodingRecipes , action: Action) => {
    let recipes = null
    switch (action.type) {
        case ActionTypes.GET_ENCODING_RECIPES:
            return {
                ...state, 
                recipes: action.payload.data.recipes
            }
        case ActionTypes.GET_ENCODING_RECIPES_PRESETS:
            return {
                ...state, 
                defaultRecipePresets: action.payload.data.presets
            }
        case ActionTypes.CREATE_ENCODING_RECIPES:   
            recipes = state.recipes.slice()
            if(action.payload.isDefault) {
                recipes = recipes.map((item) => {return {...item, isDefault: false}})
            }
            recipes.splice(recipes.length, 0, action.payload )
            return {...state,
                recipes  
            }
        case ActionTypes.SAVE_ENCODING_RECIPES:
            recipes = state.recipes.slice()
            return  {...state, recipes: recipes.map((item) => {
                if (item.id !== action.payload.id && item.name === 'Standard') {
                    return {
                        ...item,
                        isDefault: (!action.payload.isDefault && state.recipes.filter(f => f.id === action.payload.id)[0].isDefault) ? true : item.isDefault
                    }
                }
                if(item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload
                    }
                }
                return {
                    ...item,
                    isDefault: action.payload.isDefault ? false : item.isDefault
                }

            })}
        case ActionTypes.DELETE_ENCODING_RECIPES:
            recipes = state.recipes.filter((item) => item.id != action.payload.id)
            if(action.payload.isDefault) {
                recipes = recipes.map(recipe => {
                    if(recipe.name === 'Standard') {
                        return {
                            ...recipe,
                            isDefault: true
                        }
                    }
                    return recipe
                })
            }
            return {...state, recipes: recipes}

        case ActionTypes.GET_UPLOAD_WATERMARK_URL:   
            return {
                ...state,
                uploadWatermarkUrl: action.payload.data.presignedURL,
                watermarkFileID: action.payload.data.fileID,
                isUploading: true
            }
        case ActionTypes.UPLOAD_WATERMARK:
            return {
                ...state,
                isUploading: false
            }
        case ActionTypes.DELETE_WATERMARK:
            return  {...state, recipes: state.recipes.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...action.payload,
                    watermarkFileID: null,
                    watermarkFilename: null,
                    watermarkPositioningLeft: null,
                    watermarkPositioningRight: null
                }
            })}
        default:
            return state;
    }
};

// Named export
export { reducer as EncodingRecipesReducer };
