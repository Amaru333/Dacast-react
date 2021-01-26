import { GetAccountsListOutput } from "../../../../../DacastSdk/admin";
import { Account } from './types'

export const formatGetAccountsInput = (qs: string) => {
    return qs || 'perPage=10&page=0'
}

export const formatGetAccountsOutput = (data: GetAccountsListOutput): {users: Account[]; total: number} => {
    let formattedData: {users: Account[]; total: number} = {
        total: data.total,
        users: data.users.map(user => {
            return {
                ...user,
                registeredDate: user.registeredDate > 0 ? new Date(user.registeredDate * 1000).toISOString() : ''
            }
        })
    }

    return formattedData
}