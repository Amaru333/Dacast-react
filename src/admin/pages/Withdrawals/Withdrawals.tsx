import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Tab } from '../../../components/Tab/Tab'
import { makeRoute } from '../../utils/utils'
import { Table } from '../../../components/Table/Table'
import { Pagination } from '../../../components/Pagination/Pagination'
import { WithdrawalsComponentsProps } from '../../containers/Withdrawals/Withdrawals'
import { Link } from 'react-router-dom'

export const WithdrawalsPage = (props: WithdrawalsComponentsProps) => {

    const withdrawalsTableHeader = () => {
        return {data: [
            {cell: <Text key='withdrawalsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='withdrawalsTableHeaderAmountCell' size={14} weight='med'>Amount</Text>},
            {cell: <Text key='withdrawalsTableHeaderRequestedDateCell' size={14} weight='med'>Requested Date</Text>},
            {cell: <Text key='withdrawalsTableHeaderPreviousDateCell' size={14} weight='med'>Previous Date</Text>},
            {cell: <Text key='withdrawalsTableHeaderCompletedDateCell' size={14} weight='med'>Completed date</Text>},
            {cell: <Text key='withdrawalsTableHeaderMethodCell' size={14} weight='med'>Method</Text>},
            {cell: <Text key='withdrawalsTableHeaderRecurlyCell' size={14} weight='med'>Recurly</Text>},
            {cell: <Text key='withdrawalsTableHeaderStatusCell' size={14} weight='med'>Status</Text>},
        ]}
    }

    const withdrawalsTableBody = () => {
        if(props.withdrawals) {
            return props.withdrawals.map((withdrawal, key) => {
                return {data: [
                    <Link key={'withdrawalsTableBodyAccountIdCell' + key }to=''>{withdrawal.accountId}</Link>,
                    <Text key={'withdrawalsTableBodyAmountCell' + key } size={14}>{withdrawal.amount}</Text>,
                    <Text key={'withdrawalsTableBodyRequestedDateCell' + key } size={14}>{withdrawal.requestedDate}</Text>,
                    <Text key={'withdrawalsTableBodyPreviousDateCell' + key } size={14}>{withdrawal.previous}</Text>,
                    <Text key={'withdrawalsTableBodyCompletedDateCell' + key } size={14}>{withdrawal.completedDate}</Text>,
                    <Text key={'withdrawalsTableBodyMethodCell' + key } size={14}>{withdrawal.method}</Text>,
                    <Link key={'withdrawalsTableBodyRecurlyIdCell' + key }to=''>{withdrawal.recurlyId}</Link>,
                    <Link key={'withdrawalsTableBodyStatusCell' + key }to=''>{withdrawal.status}</Link>,
                ]}
            })
        }
    }

    return (
        <div>
            <Text size={16} weight='med'>Customer requests for withdrawals from their paywall</Text>
            <Tab className='my1' orientation='horizontal' callback={() => {}} list={[makeRoute('All'), makeRoute('Completed'), makeRoute('Pending'), makeRoute('Cancelled')]} />
            <Table className='my1' id='withdrawalsTable' headerBackgroundColor='white' header={withdrawalsTableHeader()} body={withdrawalsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />

        </div>
    )
}