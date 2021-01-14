import { GetAccountsWithdrawalsOutput } from "../../../../../DacastSdk/admin"
import { WithdrawalsList } from "./types"

export const formatGetWithdrawalsListInput = (data: string): string => data
export const formatGetWithdrawalsListOutput = (data: GetAccountsWithdrawalsOutput): WithdrawalsList => {
    let formattedData: WithdrawalsList = {
        total: data.total,
        withdrawalRequests: data.withdrawalRequests.map(request => {
            return {
                ...request,
                requestedDate: request.requestedDate > 0 ? new Date(request.requestedDate * 1000).toISOString() : '',
                transferDate: request.transferDate > 0 ? new Date(request.transferDate * 1000).toISOString() : ''
            }
        })
    }

    return formattedData
}