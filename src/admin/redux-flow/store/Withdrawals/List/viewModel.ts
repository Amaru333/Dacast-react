import { GetAccountsWithdrawalsOutput } from "../../../../../DacastSdk/admin"
import { WithdrawalsList } from "./types"

export const formatGetWithdrawalsListInput = (data: string): string => data
export const formatGetWithdrawalsListOutput = (data: GetAccountsWithdrawalsOutput): WithdrawalsList => data