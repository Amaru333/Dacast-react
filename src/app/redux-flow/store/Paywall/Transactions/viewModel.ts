import { TransactionsInfo } from './types'
import { tsToLocaleDate } from '../../../../../utils/formatUtils'
import { DateTime } from 'luxon'
import { GetPaywallTransactionsOutput } from '../../../../../DacastSdk/paywall'

export const formatGetPaywallTransactionsInput = (qs: string) => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page - 1}&per-page=${objectFromQs.perPage}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&note-contains=${objectFromQs.keyword}` : '') + (objectFromQs.type ? `&action-type=${objectFromQs.type}` : '') + (objectFromQs.currency ? `&currencies=${objectFromQs.currency}` : '')
    if(objectFromQs.startDate) {
        endpointsQs+= `&start-date=${objectFromQs.startDate}`
    }

    if(objectFromQs.endDate) {
        endpointsQs+= `&end-date=${objectFromQs.endDate}`
    }

    return endpointsQs
}

export const formatGetPaywallTransactionsOutput = (data: GetPaywallTransactionsOutput): TransactionsInfo => {
    let formattedData: TransactionsInfo = {
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        transactionsList: data.transactionsList.map(transaction => {
            let creditLine = null
            let debitLine = null
            if(transaction.dacastFee >= 0) {
                creditLine = Math.sign(transaction.dacastFee === 0 ? 1 : transaction.dacastFee) * (Math.abs(transaction.decimalValue || transaction.price)-transaction.dacastFee)
            } else {
                debitLine = Math.sign(transaction.dacastFee) * (Math.abs(transaction.decimalValue || transaction.price)-transaction.dacastFee)
            }

            if (transaction.actionType === 'refund') {
                debitLine = creditLine
                creditLine = null
            }

            return {
                id: transaction.id,
                type: transaction.decimalValue ? transaction.note : transaction.actionType,
                contentName: transaction.contentName,
                date: transaction.decimalValue ? tsToLocaleDate(transaction.timestamp / 1000, DateTime.DATETIME_SHORT) : transaction.date,
                purchaser: transaction.purchaser,
                currency: transaction.currency || 'USD',
                price: transaction.decimalValue ? transaction.decimalValue : transaction.price,
                credit: creditLine,
                debit: debitLine
            }
        })
    }

    return formattedData
}

export const formatGetPaywallTransactionsCsvInput = (qs: string): string => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = ''
    if(objectFromQs.startDate) {
        endpointsQs+= `start-date=${objectFromQs.startDate}`
    }

    if(objectFromQs.endDate) {
        endpointsQs+= `&end-date=${objectFromQs.endDate}`
    }

    return endpointsQs
}