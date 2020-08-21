import { axiosClient } from '../../../../utils/adminAxiosClient'

const getAccounts = async (accountId: string, qs: string) => { 
    return await axiosClient.get('/accounts' + (qs ? '?' + qs :  '?perPage=10&page=0'))
}

const impersonate = async (accountId: string) => { 
    return await axiosClient.post('/impersonate',{userIdentifier: accountId})
}

export const AccountsServices = {
    getAccounts,
    impersonate
}