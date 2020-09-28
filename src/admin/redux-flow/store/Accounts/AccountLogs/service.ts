import axios from 'axios'
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const getAccountLogs = (accountId: string) => {  
    return axiosClient.get('admin/accounts/' + accountId + '/logs')
}

export const AccountLogsService = {
    getAccountLogs
}