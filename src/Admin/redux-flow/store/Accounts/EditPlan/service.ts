import axios from 'axios'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getPlan = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/plan?accountId=' + accountId)
}

export const PlansServices = {
    getPlan
}