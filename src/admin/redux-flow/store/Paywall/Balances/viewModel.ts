import { GetAccountsTransactionsOutput } from "../../../../../DacastSdk/admin"
import { AccountBalanceInfo } from "./types"

export const formatGetBalancesInput = (data: string): string => data
export const formatGetBalancesOutput = (data: GetAccountsTransactionsOutput): AccountBalanceInfo => {
    let formattedData: AccountBalanceInfo = {
        total: data.total,
        balance: data.balance,
        lines: data.lines.map(line => {
            return {
                ...line,
                date: line.date > 0 ? new Date(line.date).toISOString() : ''
            }
        })
    }

    return formattedData
}