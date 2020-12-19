import { GetAccountAllowancesOutput, PostAccountAllowancesInput } from "../../../../../DacastSdk/admin"
import { Allowances, PutAllowances } from "./types"

export const formatGetAccountAllowancesInput = (data: string): string => data
export const formatGetAccountAllowancesOutput = (data: GetAccountAllowancesOutput): Allowances => data

export const formatPostAccountAllowancesInput = (data: PutAllowances): PostAccountAllowancesInput => data