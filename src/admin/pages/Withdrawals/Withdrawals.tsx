import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Tab } from '../../../components/Tab/Tab'
import { makeRoute } from '../../utils/utils'
import { Table } from '../../../components/Table/Table'
import { Pagination } from '../../../components/Pagination/Pagination'
import { WithdrawalsComponentsProps } from '../../containers/Withdrawals/Withdrawals'
import { Link, useRouteMatch } from 'react-router-dom'
import { DateTime } from 'luxon'
import { tsToLocaleDate } from '../../../utils/utils'

export const WithdrawalsPage = (props: WithdrawalsComponentsProps) => {

    let {url} = useRouteMatch()

    const withdrawalsTableHeader = () => {
        return {data: [
            {cell: <Text key='withdrawalsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='withdrawalsTableHeaderAmountCell' size={14} weight='med'>Amount</Text>},
            {cell: <Text key='withdrawalsTableHeaderRequestedDateCell' size={14} weight='med'>Requested Date</Text>},
            {cell: <Text key='withdrawalsTableHeaderCompletedDateCell' size={14} weight='med'>Completed date</Text>},
            {cell: <Text key='withdrawalsTableHeaderMethodCell' size={14} weight='med'>Method</Text>},
            {cell: <Text key='withdrawalsTableHeaderRecurlyCell' size={14} weight='med'>Recurly</Text>},
            {cell: <Text key='withdrawalsTableHeaderStatusCell' size={14} weight='med'>Status</Text>},
        ]}
    }

    const withdrawalsTableBody = () => {
        if(props.withdrawals && props.withdrawals.withdrawalRequests) {
            return props.withdrawals.withdrawalRequests.map((withdrawal, key) => {
                return {data: [
                    <Link key={'withdrawalsTableBodyAccountIdCell' + key }to=''>{withdrawal.accountSalesforceId}</Link>,
                    <Link key={'withdrawalsTableBodyAmountCell' + key } to={`/balances?accountId=${withdrawal.id}`}>{withdrawal.currency + withdrawal.amount}</Link>,
                    <Text key={'withdrawalsTableBodyRequestedDateCell' + key } size={14}>{tsToLocaleDate(withdrawal.requestedDate, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={'withdrawalsTableBodyCompletedDateCell' + key } size={14}>{tsToLocaleDate(withdrawal.transferDate, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={'withdrawalsTableBodyMethodCell' + key } size={14}>{withdrawal.method.charAt(0).toUpperCase() + withdrawal.method.slice(1)}</Text>,
                    <a key={'withdrawalsTableBodyRecurlyIdCell' + key } target="_blank" href={`https://dacast.recurly.com/accounts/${withdrawal.recurlyId}`}>{withdrawal.recurlyId}</a>,
                    <Link key={'withdrawalsTableBodyStatusCell' + key }to={`${url}/${withdrawal.id}/edit`}>{withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}</Link>,
                ]}
            })
        }
    }

    return (
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Customer requests for withdrawals from their paywall</Text>
            <Tab className='my1 col col-3' orientation='horizontal' callback={() => {}} list={[makeRoute('All'), makeRoute('Completed'), makeRoute('Pending'), makeRoute('Cancelled')]} />
            <Table className='my1' id='withdrawalsTable' headerBackgroundColor='gray-8' header={withdrawalsTableHeader()} body={withdrawalsTableBody()} />
            <Pagination totalResults={props.withdrawals.total} displayedItemsOptions={[25, 50, 100, 250, 1000]} defaultDisplayedOption={100} callback={() => {}} />

        </div>
    )
}