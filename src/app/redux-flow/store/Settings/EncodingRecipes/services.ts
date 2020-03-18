import axios from 'axios'
import { EncodingRecipeItem } from './EncodingRecipesTypes';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getEncodingRecipesService = () => {
    return axios.get(urlBase + 'encoding-recipe');
}

const createEncodingRecipeService = (data: EncodingRecipeItem) => {
    return axios.post(urlBase + 'encoding-recipe', {...data});
}

const saveEncodingRecipeService = (data: EncodingRecipeItem) => {
    return axios.put(urlBase + 'encoding-recipe', {...data});
}

const deleteEncodingRecipeService = (data: EncodingRecipeItem) => {
    return axios.delete(urlBase + 'encoding-recipe', {data:{...data}});
}

export const EncodingRecipesServices = {
    getEncodingRecipesService,
    createEncodingRecipeService,
    saveEncodingRecipeService,
    deleteEncodingRecipeService
}