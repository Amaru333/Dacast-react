import axios from 'axios'

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getEncodingRecipesService = () => {
    return axios.get(urlBase + 'encoding-recipe');
}

// const saveSettingsIntegrationService = (data: EncodingRecipesData) => {
//     return axios.post(urlBase + 'getSettingsIntegration', {...data})
// }


export const EncodingRecipesServices = {
    getEncodingRecipesService
    // saveSettingsIntegrationService
}