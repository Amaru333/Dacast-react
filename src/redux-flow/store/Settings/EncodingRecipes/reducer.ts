import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultEncodingRecipes} from "../EncodingRecipes/EncodingRecipesTypes";
import { EncodingRecipesData } from './EncodingRecipesTypes';

const reducer: Reducer<EncodingRecipesData> = (state = defaultEncodingRecipes , action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_ENCODING_RECIPES:
            return {...state, recipes:action.payload.recipes};
        default:
            return state;
    }
};

// Named export
export { reducer as EncodingRecipesReducer };
