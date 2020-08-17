import axios from 'axios'

const getAccountLogs = (accountId: string) => {  
    return axios.get(process.env.ADMIN_API_BASE_URL   + 'admin/accounts/' + accountId + '/logs')
}

export const AccountLogsService = {
    getAccountLogs
}