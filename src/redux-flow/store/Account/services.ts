import axios from 'axios'

const urlBase = 'http://www.mocky.io/v2/5db9a87630000074cc5ee51e';

const getCompanyPageDetailsService = () => {
    return axios.get(urlBase);
}

const saveCompanyPageDetailsService = (data: any) => {
    debugger;
    return axios.put(urlBase, {...data})
}


export const AccountServices = {
    getCompanyPageDetailsService,
    saveCompanyPageDetailsService
} 