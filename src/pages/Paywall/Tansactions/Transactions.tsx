import React from 'react';
import { TransactionsFiltering } from './TransactionsFiltering';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { Pagination } from '../../../components/Pagination/Pagination';
import { TransactionsComponentProps } from '../../../containers/Paywall/Transactions';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { Button } from '../../../components/FormsComponents/Button/Button';

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
                    <Text key={'transactionsTableBodyType' + i} size={14} weight='reg'>{transaction.type}</Text>,
                    <Text key={'transactionsTableBodyContentName' + i} size={14} weight='reg'>{transaction.contentName}</Text>,
                    <Text key={'transactionsTableBodyDate' + i} size={14} weight='reg'>{transaction.date}</Text>,
                    <Text key={'transactionsTableBodyPurchaser' + i} size={14} weight='reg'>{transaction.purchaser}</Text>,
                    <Text key={'transactionsTableBodyViewerCurrency' + i} size={14} weight='reg'>{transaction.currency}</Text>,
                    <Text key={'transactionsTableBodyPrice' + i} size={14} weight='reg'>{transaction.price}</Text>,
                    <Text key='transactionsTableHeaderUSDBalance' size={14} weight='reg'>USD Balance</Text>,
                    <Label label={transaction.usdBalance.toString()} color='green' backgroundColor='green20' />
                ]
            })
        }
    }
    return (
        <div className='flex flex-column'>
            <div>
                <TransactionsFiltering />
                <Button className='mr4 mb2' sizeButton='small' typeButton='secondary' buttonColor='blue'>Export </Button>

            </div>

            <Table id='transactionTable' header={transactionsTableHeader()} body={transactionsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 30, 40]} callback={() => {}} />
        </div>
    )
}