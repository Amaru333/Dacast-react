import React from 'react';
import { TransactionsFiltering } from './TransactionsFiltering';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { TransactionsComponentProps } from '../../../containers/Paywall/Transactions';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { tsToLocaleDate } from '../../../../utils/utils';
import { DateTime } from 'luxon';
import { IconStyle } from '../../../../shared/Common/Icon';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';

export const TransactionsPage = (props: TransactionsComponentProps) => {

    const transactionsTableHeader = () => {
        return {data: [
            {cell: <Text key='transactionsTableHeaderType' size={14} weight='med'>Type</Text>},
            {cell: <Text key='transactionsTableHeaderContentName' size={14} weight='med'>Content Name</Text>},
            {cell: <Text key='transactionsTableHeaderDate' size={14} weight='med'>Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key='transactionsTableHeaderPurchaser' size={14} weight='med'>Purchaser</Text>},
            {cell: <Text key='transactionsTableHeaderViewerCurrency' size={14} weight='med'>Currency</Text>},
            {cell: <Text key='transactionsTableHeaderPrice' size={14} weight='med'>Price</Text>},
            {cell: <Text key='transactionsTableHeaderPrice' size={14} weight='med'>Credit</Text>},
            {cell: <Text key='transactionsTableHeaderPrice' size={14} weight='med'>Debit</Text>},
        ], defaultSort: 'Created Date'}
    }

    const handleCurrencySymbol = (currency: string) => {
        switch(currency) {
            case 'USD':
                return '$'
            case 'AUD':
                return 'AU$'
            case 'GBP': 
                return '£'
            default:
                return
        }
    }

    const transactionsTableBody = () => {
        if(props.transactionsInfos) {
            return props.transactionsInfos.map((transaction, i) => {
                return {data: [
                    <Text key={'transactionsTableBodyType' + i} size={14} weight='reg'>{transaction.type}</Text>,
                    <Text key={'transactionsTableBodyContentName' + i} size={14} weight='reg'>{transaction.contentName}</Text>,
                    <Text key={'transactionsTableBodyDate' + i} size={14} weight='reg'>{transaction.date ? tsToLocaleDate(transaction.date, DateTime.DATETIME_SHORT) : ""}</Text>,
                    <Text key={'transactionsTableBodyPurchaser' + i} size={14} weight='reg'>{transaction.purchaser}</Text>,
                    <Text key={'transactionsTableBodyViewerCurrency' + i} size={14} weight='reg'>{transaction.currency}</Text>,
                    <Text key={'transactionsTableBodyPrice' + i} size={14} weight='reg'>{handleCurrencySymbol(transaction.currency) + transaction.price}</Text>,
                    <Label label={transaction.usdBalance.toString()} color='green' backgroundColor='green20' />,
                    <span></span>
                ]}
            })
        }
    }
    return (
        <div className='flex flex-column'>
            <div style={{alignItems: 'center'}} className='col col-12 flex justify-end'>
                <div className='flex items-center flex-auto'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />   
                </div>
                <Button className=' mr2 right' sizeButton='small' typeButton='secondary' buttonColor='gray'>Export </Button>
                <TransactionsFiltering />
            </div>

            <Table id='transactionTable' headerBackgroundColor="white" header={transactionsTableHeader()} body={transactionsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 30, 40]} callback={() => {}} />
        </div>
    )
}