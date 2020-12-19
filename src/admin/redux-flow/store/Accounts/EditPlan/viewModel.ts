import { GetAccountPlanOutput, PutAccountPlanInput } from "../../../../../DacastSdk/admin"
import { PlanInfo, PlanInfoPut } from "./types"

export const formatGetAccountPlanInput = (data: string): string => data
export const formatGetAccountPlanOutput = (data: GetAccountPlanOutput): PlanInfo => data
export const formatPutAccountPlanInput = (data: PlanInfoPut): PutAccountPlanInput => data