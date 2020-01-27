import React from 'react';
import { TransactionsFiltering } from './TransactionsFiltering';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { Pagination } from '../../../components/Pagination/Pagination';
import { TransactionsComponentProps } from '../../../containers/Paywall/Transactions';


export const TransactionsPage = (props: TransactionsComponentProps) => {

    const transactionsTableHeader = () => {
        return [
            <Text key='transactionsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='transactionsTableHeaderContentName' size={14} weight='med'>Content Name</Text>,
            <Text key='transactionsTableHeaderDate' size={14} weight='med'>Date(UTC)</Text>,
            <Text key='transactionsTableHeaderPurchaser' size={14} weight='med'>Purchaser</Text>,
            <Text key='transactionsTableHeaderViewerCurrency' size={14} weight='med'>Viewer Currency</Text>,
            <Text key='transactionsTableHeaderPrice' size={14} weight='med'>Price</Text>,
            <Text key='transactionsTableHeaderUSDBalance' size={14} weight='med'>USD Balance</Text>
        ]
    }

    const transactionsTableBody = () => {
        if(props.transactionsInfos) {
            return props.transactionsInfos.map((transaction, i) => {
                return [
                    <Text key={'transactionsTableBodyType' + i} size={14} weight='med'>{transaction.type}</Text>,
                    <Text key={'transactionsTableBodyContentName' + i} size={14} weight='med'>{transaction.contentName}</Text>,
                    <Text key={'transactionsTableBodyDate' + i} size={14} weight='med'>{transaction.date}</Text>,
                    <Text key={'transactionsTableBodyPurchaser' + i} size={14} weight='med'>{transaction.purchaser}</Text>,
                    <Text key={'transactionsTableBodyViewerCurrency' + i} size={14} weight='med'>{transaction.currency}</Text>,
                    <Text key={'transactionsTableBodyPrice' + i} size={14} weight='med'>{transaction.price}</Text>,
                    <Text key='transactionsTableHeaderUSDBalance' size={14} weight='med'>USD Balance</Text>
                ]
            })
        }
    }
    return (
        <div className='flex flex-column'>
            <TransactionsFiltering />
            <Table id='transactionTable' header={transactionsTableHeader()} body={transactionsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 30, 40]} callback={() => {}} />
        </div>
    )
}