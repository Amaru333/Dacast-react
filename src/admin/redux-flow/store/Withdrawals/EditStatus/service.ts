import axios from 'axios'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getWithdrawalInfo = (withdrawalId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/withdrawal/' + withdrawalId + '/info')
}

const saveWithdrawalStatus = (withdrawalId: string, withdrawalStatus: string) => {  
    return axios.post(adminApiUrlBase   + 'admin/withdrawal/' + withdrawalId + '/info' , {data: withdrawalStatus})
}

export const EditWithdrawalServices = {
    getWithdrawalInfo,
    saveWithdrawalStatus
}