import { GetAccountsListOutput } from "../../../../../DacastSdk/admin";
import { Account } from './types'

export const formatGetAccountsInput = (qs: string) => {
    return qs || 'perPage=10&page=0'
}

export const formatGetAccountsOutput = (data: GetAccountsListOutput): {users: Account[]; total: number} => data