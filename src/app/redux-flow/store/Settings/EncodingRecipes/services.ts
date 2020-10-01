import { EncodingRecipeItem } from './EncodingRecipesTypes';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getEncodingRecipesService = async () => {
    return await axiosClient.get('/settings/encoding-recipes')
}

const getEncodingRecipesPresetsService = async () => {
    return await axiosClient.get('/settings/encoding-recipes/presets')
}

const createEncodingRecipeService = async (data: EncodingRecipeItem) => {
    return await axiosClient.post('/settings/encoding-recipes',
        {
            ...data
        }
    )
}

const saveEncodingRecipeService = async (data: EncodingRecipeItem) => {
    return await axiosClient.put('/settings/encoding-recipes/' + data.id,
        {
            ...data
        }
    )
}

const deleteEncodingRecipeService = async (data: EncodingRecipeItem) => {
    return await axiosClient.delete('/settings/encoding-recipes/' + data.id)
}

const getUploadWatermarkUrlService = async () => {
    return await axiosClient.post('/uploads/signatures/singlepart/transcoding-watermark',
        {}
    )
}

const uploadWatermarkService = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteWatermarkService = async (data: EncodingRecipeItem) => {
    return await axiosClient.put('/settings/encoding-recipes/' + data.id,
        {
            id: data.id,
            isDefault: data.isDefault,
            name: data.name,
            recipePresets: data.recipePresets,
            watermarkFileID: null
        }
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