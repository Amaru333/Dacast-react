import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Tab } from '../../../components/Tab/Tab'
import { makeRoute } from '../../utils/utils'
import { Table } from '../../../components/Table/Table'
import { Pagination } from '../../../components/Pagination/Pagination'
import { WithdrawalsComponentsProps } from '../../containers/Withdrawals/Withdrawals'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { DateTime } from 'luxon'
import { useQuery, capitalizeFirstLetter } from '../../../utils/utils'
import { tsToLocaleDate } from '../../../utils/formatUtils'
import { AccountsServices } from '../../redux-flow/store/Accounts/List/services'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { IconStyle } from '../../../shared/Common/Icon'
import { Button } from '../../../components/FormsComponents/Button/Button'

export const WithdrawalsPage = (props: WithdrawalsComponentsProps) => {

    let {url} = useRouteMatch()
    let qs = useQuery()
    let query = useHistory()

    const [status, setStatus] = React.useState<string>(qs.get('status') ? capitalizeFirstLetter(qs.get('status')) : 'All')
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [pagination, setPagination] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 10})
    const [accountId, setAccountId] = React.useState<string>(qs.get('salesforceId') || null)

    const handleImpersonate = (userIdentifier: string) => {
        AccountsServices.impersonate(userIdentifier)
        .then((response) => {
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.data.token}&identifier=${userIdentifier}`}).click();
        })
    }

    React.useEffect(() => {
        setContentLoading(true)
        props.getWithdrawals(`page=${pagination.page - 1}&perPage=${pagination.nbResults}` +  (status !== 'All' ? `&requestStatus=${status.toLowerCase()}` : ''))
        .then(() => {
            setContentLoading(false)
            query.push(location.pathname + `?page=${pagination.page}&perPage=${pagination.nbResults}` +  (status !== 'All' ? `&status=${status.toLowerCase()}` : ''))
        })
        .catch(() => setContentLoading(false))
    }, [])

    const withdrawalsTableHeader = () => {
        return {data: [
            {cell: <Text key='withdrawalsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='withdrawalsTableHeaderAmountCell' size={14} weight='med'>Amount</Text>},
            {cell: <Text key='withdrawalsTableHeaderTotalBalanceCell' size={14} weight='med'>Total Balance</Text>},
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
                    <a key={'withdrawalsTableBodyAccountIdCell' + key } onClick={() => handleImpersonate(withdrawal.accountSalesforceId)}>{withdrawal.accountSalesforceId}</a>,
                    <Link key={'withdrawalsTableBodyAmountCell' + key } to={`/balances?&page=1&perPage=10&salesforceId=${withdrawal.accountSalesforceId}`}>{withdrawal.currency + withdrawal.amount.toLocaleString()}</Link>,
                    <Text key={'withdrawalsTableBodyTotalBalanceCell' + key } size={14}>${withdrawal.totalBalance.toLocaleString()}</Text>,
                    <Text key={'withdrawalsTableBodyRequestedDateCell' + key } size={14}>{tsToLocaleDate(withdrawal.requestedDate, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={'withdrawalsTableBodyCompletedDateCell' + key } size={14}>{withdrawal.transferDate > 0 ? tsToLocaleDate(withdrawal.transferDate, DateTime.DATETIME_SHORT) : ''}</Text>,
                    <Text key={'withdrawalsTableBodyMethodCell' + key } size={14}>{capitalizeFirstLetter(withdrawal.method)}</Text>,
                    <a key={'withdrawalsTableBodyRecurlyIdCell' + key } target="_blank" href={`https://vzaar.recurly.com/accounts/${withdrawal.recurlyId}`}>{withdrawal.recurlyId}</a>,
                    <Link key={'withdrawalsTableBodyStatusCell' + key }to={`${url}/${withdrawal.id}/edit`}>{capitalizeFirstLetter(withdrawal.status)}</Link>,
                ]}
            })
        }
    }

    const handlePaginationChange = (page: number, nbResults: number) => {
        setPagination({page:page,nbResults:nbResults})
        if(pagination.page && pagination.nbResults && !contentLoading) {
            setContentLoading(true)
            props.getWithdrawals(`page=${page - 1}&perPage=${nbResults}` +  (status !== 'All' ? `&requestStatus=${status.toLowerCase()}` : ''))
            .then(() => {
                setContentLoading(false)
                query.push(location.pathname + `?page=${page}&perPage=${nbResults}` +  (status !== 'All' ? `&status=${status.toLowerCase()}` : ''))
            })
            .catch(() => setContentLoading(false))
        }
    }

    const handleStatusChange = (newStatus: string) => {
        const previousPagination = pagination
        setPagination({page: 1, nbResults: pagination.nbResults}) 
        if(pagination.page && pagination.nbResults && !contentLoading) {
            setContentLoading(true)
            props.getWithdrawals(`page=0&perPage=${pagination.nbResults}` +  (newStatus !== 'All' ? `&requestStatus=${newStatus.toLowerCase()}` : ''))
            .then(() => {
                setStatus(newStatus)
                setContentLoading(false)
                query.push(location.pathname + `?page=${pagination.page}&perPage=${pagination.nbResults}` +  (newStatus !== 'All' ? `&status=${newStatus.toLowerCase()}` : ''))
            })
            .catch(() => {
                setContentLoading(false)
                setPagination(previousPagination)
            })
        }
    }

    const handleStatusDefaultValue = () => {
        switch(status) {
            case 'All':
                return 0
            case 'Completed': 
                return 1
            case 'Pending': 
                return 2
            case 'Cancelled':
                return 3
            default:
                return 0
        }
    }

    const handleSubmit = (salesforceId: string) => {
        if(!contentLoading) {
            setContentLoading(true)
            const previousPagination = pagination
            setPagination({page: 1, nbResults: pagination.nbResults})
            props.getWithdrawals(`page=0&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : ''))
            .then(() => {
                query.push(location.pathname + `?page=1&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : ''))
                setContentLoading(false)
            })
            .catch(() => {
                setPagination(previousPagination)
                setContentLoading(false)
            })
        }
    }

    return props.withdrawals ? 
        <div className='flex flex-column'>
            <Text size={16} weight='med'>Customer requests for withdrawals from their paywall</Text>
            <Tab className='my1 col col-3' orientation='horizontal' tabDefaultValue={handleStatusDefaultValue()} callback={(value: string) => handleStatusChange(value)} list={[makeRoute('All'), makeRoute('Completed'), makeRoute('Pending'), makeRoute('Cancelled')]} />
            <div className='flex my1'>
                <div className='relative flex items-center mr2'>
                    <Input  id='accountIdInput' value={accountId} placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                    <div className={ accountId && accountId.length > 0 ? 'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setAccountId('');handleSubmit('')}}><IconStyle>close</IconStyle></div>
                </div>
                <Button disabled={!accountId ? true : false} onClick={() => {handleSubmit(accountId)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>
            <Table contentLoading={contentLoading} id='withdrawalsTable' headerBackgroundColor='gray-8' header={withdrawalsTableHeader()} body={withdrawalsTableBody()} />
            <Pagination totalResults={props.withdrawals.total} defaultPage={pagination.page} displayedItemsOptions={[10, 50, 100, 500]} defaultDisplayedOption={pagination.nbResults} callback={(page: number, nbResults: number) => handlePaginationChange(page, nbResults)} />
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>
}