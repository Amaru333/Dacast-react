import { TransactionsInfo } from './types'
import { tsToLocaleDate } from '../../../../../utils/formatUtils'
import { DateTime } from 'luxon'
import { GetPaywallTransactionsOutput } from '../../../../../DacastSdk/paywall'

export const formatGetPaywallTransactionsInput = (qs: string) => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page - 1}&per-page=${objectFromQs.perPage}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&note-contains=${objectFromQs.keyword}` : '') + (objectFromQs.type ? `&action-type=${objectFromQs.type}` : '') + (objectFromQs.currency ? `&currencies=${objectFromQs.currency}` : '')
    if(objectFromQs.afterDate || objectFromQs.beforeDate) {
        endpointsQs+= `&created-at=${objectFromQs.afterDate ? objectFromQs.afterDate : ''},${objectFromQs.beforeDate ? objectFromQs.beforeDate : ''}`
    }

    return endpointsQs
}

export const formatGetPaywallTransactionsOutput = (data: GetPaywallTransactionsOutput): TransactionsInfo => {
    let formattedData: TransactionsInfo = {
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        transactionsList: data.transactionsList.map(transaction => {
            return {
                id: transaction.id,
                type: transaction.decimalValue ? transaction.note : transaction.actionType,
                contentName: transaction.contentName,
                date: transaction.decimalValue ? tsToLocaleDate(transaction.timestamp / 1000, DateTime.DATETIME_SHORT) : transaction.date,
                purchaser: transaction.purchaser,
                currency: transaction.currency || 'USD',
                price: transaction.decimalValue ? transaction.decimalValue : transaction.price,
                credit: transaction.dacastFee >= 0 ? Math.sign(transaction.dacastFee) * (Math.abs(transaction.decimalValue ? transaction.decimalValue : transaction.price)-transaction.dacastFee) : null,
                debit: transaction.dacastFee < 0 ? Math.sign(transaction.dacastFee) * (Math.abs(transaction.decimalValue ? transaction.decimalValue : transaction.price)-transaction.dacastFee) : null
            }
        })
    }

    return formattedData
}