import axios from 'axios'
import { EncodingRecipeItem } from './EncodingRecipesTypes';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getEncodingRecipesService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/settings/encoding-recipes',
        {headers: {
            'Authorization': token
        }})
}

const getEncodingRecipesPresetsService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/settings/encoding-recipes/presets',
        {headers: {
            'Authorization': token
        }})
}

const createEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/settings/encoding-recipes',
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const saveEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/settings/encoding-recipes/' + data.id,
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

const deleteEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/settings/encoding-recipes/' + data.id,
        {headers: {
            'Authorization': token
        }}
    )}

const getUploadWatermarkUrlService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/uploads/signatures/singlepart/watermark',
        {headers: {
            'Authorization': token
        }});
}

const uploadWatermarkService = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteWatermarkService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/settings/encoding-recipes/' + data.id,
        {"id": data.id,
            "isDefault": data.isDefault,
            "name": data.name,
            "recipePresets": data.recipePresets,
            "watermarkFileID": null
        }, 
        {headers: {
            'Authorization': token
        }}
    )
}

export const EncodingRecipesServices = {
    getEncodingRecipesService,
    getEncodingRecipesPresetsService,
    createEncodingRecipeService,
    saveEncodingRecipeService,
    deleteEncodingRecipeService,
    getUploadWatermarkUrlService,
    uploadWatermarkService,
    deleteWatermarkService
}