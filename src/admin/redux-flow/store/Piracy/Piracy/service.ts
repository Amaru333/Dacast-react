import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const getPirate = (url: string) => {  
    return axiosClient.get('/identify-cdn-url?url=' + url)
}

export const PirateServices = {
    getPirate
}