import { GetAccountDetailsOutput, PutAccountDetailsInput } from "../../../../../DacastSdk/admin";
import { AccountInfo, PutAccountInfo } from "./types";

export const formatGetAccountDetailsInput = (data: string): string => data
export const formatGetAccountDetailsOutput = (data: GetAccountDetailsOutput): AccountInfo => data

export const formatPutAccountDetailsInput = (data: PutAccountInfo): PutAccountDetailsInput => data