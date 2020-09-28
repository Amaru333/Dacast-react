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
import { useQuery } from '../../../utils/utils'
import { tsToLocaleDate } from '../../../utils/formatUtils'
import { AccountsServices } from '../../redux-flow/store/Accounts/List/services'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'


export const BalancesPage = (props: BalancesComponentProps) => {

    let query = useHistory()
    let qs = useQuery()

    const [accountId, setAccountId] = React.useState<string>(qs.get('salesforceId') || null)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [pagination, setPagination] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 10})


    React.useEffect(() => {
        setContentLoading(true)
        props.getBalances(`page=${pagination.page - 1}&perPage=${pagination.nbResults}` +  (accountId ? `&salesforceId=${accountId}` : ''))
        .then(() => {
            setContentLoading(false)
            query.push(location.pathname + `?page=${pagination.page}&perPage=${pagination.nbResults}` + (accountId ? `&salesforceId=${accountId}` : ''))
        }).catch(() => setContentLoading(false))
    }, [])


    const handleImpersonate = (userIdentifier: string) => {
        AccountsServices.impersonate(userIdentifier)
        .then((response) => {
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.data.token}`}).click();
        })
    }

    const balancesTableHeader = () => {
        return {data: [
            {cell: <Text key='balancesTableHeaderAccountIDCell' size={14} weight='med'>Account ID</Text>},
            {cell: <Text key='balancesTableHeaderDateCell' size={14} weight='med'>Date</Text>},
            {cell: <Text key='balancesTableHeaderTypeCell' size={14} weight='med'>Type</Text>},
            {cell: <Text key='balancesTableHeaderCreditCell' size={14} weight='med'>Credit (USD)</Text>},
            {cell: <Text key='balancesTableHeaderDebitCell' size={14} weight='med'>Debit (USD)</Text>},
            {cell: <Text key='balancesTableHeaderRevenueCell' size={14} weight='med'>Net Revenue</Text>},
        ]}
    }

    const balancesTableBody = () => {
        if(props.balanceInfo) {
            return props.balanceInfo.lines.map((line, key) => {
                return {data: [
                    <a key={'balanceTableBodyAccountIdCell' + key } onClick={() => handleImpersonate(line.salesforceId)}>{line.salesforceId}</a>,
                    <Link key={'balancesTableBodyDateCell' + key }to=''>{tsToLocaleDate(Math.floor(line.date / 1000), DateTime.DATETIME_SHORT)}</Link>,
                    <Text key={'balancesTableBodyTypeCell' + key } size={14}>{line.transactionType || line.lineType}</Text>,
                    <Text key={'balancesTableBodyCreditCell' + key } size={14}>{line.fee ? line.fee >= 0 ? Math.sign(line.fee).toString() + (Math.abs(line.amount * line.conversionRateToAccountCurency-line.fee)).toString() : '' : line.amount > 0 ? line.amount : 0}</Text>,
                    <Text key={'balancesTableBodyDebitCell' + key } size={14}>{line.fee  ? line.fee < 0 ? Math.sign(line.fee).toString() + (Math.abs(line.amount * line.conversionRateToAccountCurency-line.fee)).toString() : '' : line.amount < 0 ? line.amount : 0}</Text>,
                    <Text key={'balancesTableBodyRevenueCell' + key } size={14}>{line.fee || 0}</Text>,
                ]}
            })
        }
    }

    const handleSubmit = (salesforceId: string) => {
        setContentLoading(true)
        const previousPagination = pagination
        setPagination({page: 1, nbResults: pagination.nbResults})
        props.getBalances((`page=0&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : '')))
        .then(() => {
            query.push(location.pathname + `?page=1&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : ''))
            setContentLoading(false)
        })
        .catch(() => {
            setPagination(previousPagination)
            setContentLoading(false)
        })
    }

    const handlePaginationChange = (page: number, nbResults: number) => {
        setPagination({page:page,nbResults:nbResults})
        if(pagination.page && pagination.nbResults && !contentLoading) {
            setContentLoading(true)
            props.getBalances(`page=${page - 1}&perPage=${nbResults}` +  (accountId ? `&salesforceId=${accountId.replace(/,/g, '')}` : ''))
            .then(() => {
                setContentLoading(false)
                query.push(location.pathname + `?page=${page}&perPage=${nbResults}` + (accountId ? `&salesforceId=${accountId.replace(/,/g, '')}` : ''))
            })
            .catch(() => setContentLoading(false))
        }
    }

    return props.balanceInfo ?
        <div>
            <Text className='py1' size={14}>Paywall balances - select an Account to view their transactions and current balance</Text>
            <div className='flex my1 items-center'>
                <Input id='accountIdInput' placeholder='Account ID' defaultValue={accountId} onChange={(event) => setAccountId(event.currentTarget.value)} />
                <Button className='mx2' disabled={!accountId ? true : false} onClick={() => handleSubmit(accountId)} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
                <Text size={14} weight='med'>{props.balanceInfo.balance ? 'Balance: $' + props.balanceInfo.balance : ''}</Text>
            </div>
            <Table contentLoading={contentLoading} className='mt1 mb2' id='balancesTable' headerBackgroundColor='gray-8' header={balancesTableHeader()} body={balancesTableBody()} />
            <Pagination totalResults={props.balanceInfo.total} defaultPage={pagination.page} displayedItemsOptions={[10, 50, 100, 500]} defaultDisplayedOption={pagination.nbResults} callback={(page: number, nbResults: number) => handlePaginationChange(page, nbResults)} />
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>

}