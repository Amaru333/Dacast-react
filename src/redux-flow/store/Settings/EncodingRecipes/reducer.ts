import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultEncodingRecipes} from "../EncodingRecipes/EncodingRecipesTypes";
import { EncodingRecipesData } from './EncodingRecipesTypes';

const reducer: Reducer<EncodingRecipesData> = (state = defaultEncodingRecipes , action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ENCODING_RECIPES:
            return {
                ...state, 
                recipes:action.payload.recipes
            }
        case ActionTypes.CREATE_ENCODING_RECIPES:
            let recipes = state.recipes.slice()
            if(action.payload.isDefault) {
                recipes = recipes.map((item) => {return {...item, isDefault: false}})
            }
            recipes.splice(recipes.length, 0, action.payload )
            return {
                recipes  
            }
        case ActionTypes.SAVE_ENCODING_RECIPES:
            if(action.payload.isDefault) {
                recipes = state.recipes.map((item) => {return {...item, isDefault: false}})
            }
            return  {...state, recipes: recipes.map((item, index) => {
                let recipeIndex = recipes.findIndex( item => item.id === action.payload.id)
                if (index !== recipeIndex) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.DELETE_ENCODING_RECIPES:
            let recipeIndex = state.recipes.findIndex( item => item.id === action.payload.id)
            return {...state, recipes: state.recipes.filter((item, index) => index != recipeIndex)}
        default:
            return state;
    }
};

// Named export
export { reducer as EncodingRecipesReducer };
