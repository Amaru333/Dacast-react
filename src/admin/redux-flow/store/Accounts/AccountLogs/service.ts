import axios from 'axios'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getAccountLogs = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/accounts/' + accountId + '/logs')
}

export const AccountLogsService = {
    getAccountLogs
}