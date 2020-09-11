import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table'
import { BalancesComponentProps } from '../../containers/Paywall/Balances'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory } from 'react-router-dom'
import { Pagination } from '../../../components/Pagination/Pagination'
import { DateTime } from 'luxon'


export const BalancesPage = (props: BalancesComponentProps) => {

    const [accountId, setAccountId] = React.useState<string>(null)
    let query = useHistory()

    const balancesTableHeader = () => {
        return {data: [
            {cell: <Text key='balancesTableHeaderDateCell' size={14} weight='med'>Date (UTC)</Text>},
            {cell: <Text key='balancesTableHeaderTypeCell' size={14} weight='med'>Type</Text>},
            {cell: <Text key='balancesTableHeaderCreditCell' size={14} weight='med'>Credit (USD)</Text>},
            {cell: <Text key='balancesTableHeaderDebitCell' size={14} weight='med'>Debit (USD)</Text>},
            {cell: <Text key='balancesTableHeaderRevenueCell' size={14} weight='med'>Net Revenue</Text>},
        ]}
    }

    const balancesTableBody = () => {
        if(props.balanceInfo) {
            return props.balanceInfo.operations.map((balance, key) => {
                return {data: [
                    <Link key={'balancesTableBodyDateCell' + key }to=''>{DateTime.fromSeconds(balance.date).toFormat("yyyy-LL-dd HH:mm")}</Link>,
                    <Text key={'balancesTableBodyTypeCell' + key } size={14}>{balance.type}</Text>,
                    <Text key={'balancesTableBodyCreditCell' + key } size={14}>{balance.credit}</Text>,
                    <Text key={'balancesTableBodyDebitCell' + key } size={14}>{balance.debit}</Text>,
                    <Text key={'balancesTableBodyRevenueCell' + key } size={14}>{balance.revenue}</Text>,
                ]}
            })
        }
    }

    return (
        <div>
            <Text className='py1' size={14}>Paywall balances - select an Account to view their transactions and current balance</Text>
            <div className='flex my1 items-center'>
                <Input id='accountIdInput' placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                <Button className='mx2' disabled={!accountId ? true : false} onClick={() => {props.getBalances(accountId);query.push(location.pathname + '?accountId=' + accountId)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
                <Text size={14} weight='med'>{props.balanceInfo ? 'Balance: $' + props.balanceInfo.accountBalance : ''}</Text>
            </div>
            <Table className='mt1 mb2' id='balancesTable' headerBackgroundColor='gray-8' header={balancesTableHeader()} body={balancesTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[25, 50, 100, 250, 1000]} defaultDisplayedOption={100} callback={() => {}} />
        </div>
    )
}