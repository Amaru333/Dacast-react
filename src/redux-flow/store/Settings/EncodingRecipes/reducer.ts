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
            recipes.splice(recipes.length, 0, action.payload )
            
            // state.recipes.push(action.payload)
            return {
                recipes  
            }
            case ActionTypes.SAVE_ENCODING_RECIPES:
                    return  {...state, recipes: state.recipes.map((item, index) => {
                       let recipeIndex = state.recipes.findIndex( item => item.id === action.payload.id)
                        if (index !== recipeIndex) {
                          return item
                        }
                        return {
                          ...item,
                          ...action.payload
                        }
                      })}
                    
            //         let selectedRecipe = state.recipes.filter(item => item.name !== action.payload.name)
            //         selectedRecipe.push(action.payload)
            // return {
            //     ...state,
            //     recipes:selectedRecipe 
            // }
        default:
            return state;
    }
};

// Named export
export { reducer as EncodingRecipesReducer };
