import { PostAccountTransactionInput } from "../../../../../DacastSdk/admin";
import { Chargeback } from "./types";

export const formatPostChargebackInput = (data: Chargeback): PostAccountTransactionInput => data