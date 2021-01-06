import { GetAccountsTransactionsOutput } from "../../../../../DacastSdk/admin"
import { AccountBalanceInfo } from "./types"

export const formatGetBalancesInput = (data: string): string => data
export const formatGetBalancesOutput = (data: GetAccountsTransactionsOutput): AccountBalanceInfo => data