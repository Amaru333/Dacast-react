import { PostAccountTransactionInput } from "../../../../../DacastSdk/admin";
import { Chargeback } from "./types";

export const formatPostChargebackInput = (data: Chargeback): PostAccountTransactionInput => {
    let formattedData: PostAccountTransactionInput = {
        type: data.type,
        amount: data.type === 'Credit' ? Math.abs(data.amount) : -Math.abs(data.amount),
        salesforceId: data.salesforceId
    }

    return formattedData
}