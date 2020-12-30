import { GetPirateInfoOutput } from "../../../../../DacastSdk/admin"
import { PirateData } from "./types"

export const formatGetPirateInput = (data: string): string => data
export const formatGetPirateOutput = (data: GetPirateInfoOutput): PirateData => data