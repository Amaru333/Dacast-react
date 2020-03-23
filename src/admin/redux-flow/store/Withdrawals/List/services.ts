import axios from 'axios'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getWithdrawals = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/' + accountId + '/withdrawals')
}

export const WithdrawalsServices = {
    getWithdrawals
}