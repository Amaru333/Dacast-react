import axios from 'axios'
import { EncodingRecipeItem } from './EncodingRecipesTypes';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getEncodingRecipesService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/encoding-recipes',
        {headers: {
            'Authorization': token
        }})
}

const createEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/encoding-recipes',
        {"id": data.id,
        "isDefault": data.isDefault,
        "name": data.name,
        "recipePresets": data.recipePresets
        }, 
        {headers: {
            'Authorization': token
        }}
    )
}

const saveEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/encoding-recipes/' + data.id,
        {"id": data.id,
        "isDefault": data.isDefault,
        "name": data.name,
        "recipePresets": data.recipePresets
        }, 
        {headers: {
            'Authorization': token
        }}
    )
}

const deleteEncodingRecipeService = async (data: EncodingRecipeItem) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/encoding-recipes/' + data.id,
        {headers: {
            'Authorization': token
        }}
    )}

const getUploadWatermarkUrlService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/uploads/signatures/singlepart',
        {'parameters': {
            'userID': userId
        }, 
        'type': 'watermark'},
        {headers: {
            'Authorization': token
        }});
}

const uploadWatermarkService = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteWatermarkService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/company/logo', {headers: {
        'Authorization': token
    }});
}

export const EncodingRecipesServices = {
    getEncodingRecipesService,
    createEncodingRecipeService,
    saveEncodingRecipeService,
    deleteEncodingRecipeService,
    getUploadWatermarkUrlService,
    uploadWatermarkService,
    deleteWatermarkService
}