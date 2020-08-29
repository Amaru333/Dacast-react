import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table'
import { AccountsComponentProps } from '../../containers/Accounts/Accounts'
import { Link } from 'react-router-dom'
import { Flag } from '../../redux-flow/store/Accounts/List/types'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Pagination } from '../../../components/Pagination/Pagination'
import { IconStyle } from '../../../shared/Common/Icon'
import { DateTime } from 'luxon'
import { tsToLocaleDate, useQuery } from '../../../utils/utils'
import { AccountsServices } from '../../redux-flow/store/Accounts/List/services'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'


export const AccountsPage = (props: AccountsComponentProps) => {

    let query = useHistory()

    let qs = useQuery()



    const [accountId, setAccountId] = React.useState<string>(qs.get('salesforceId') || null)
    const [keyword, setKeyword] = React.useState<string>(qs.get('search') || null)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [pagination, setPagination] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 10})


    React.useEffect(() => {
        setContentLoading(true)
        props.getAccounts(accountId, `page=${pagination.page - 1}&perPage=${pagination.nbResults}` +  (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
        .then(() => {
            setContentLoading(false)
            query.push(location.pathname + `?page=${pagination.page}&perPage=${pagination.nbResults}` + (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
        })
        .catch(() => setContentLoading(false))
    }, [])

    const accountsTableHeader = () => {
        return {data: [
            {cell: <Text key='accountsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='accountsTableHeaderCompanyCell' size={14} weight='med'>Company</Text>},
            {cell: <Text key='accountsTableHeaderNameCell' size={14} weight='med'>Name</Text>},
            {cell: <Text key='accountsTableHeaderPhoneCell' size={14} weight='med'>Phone</Text>},
            {cell: <Text key='accountsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
            {cell: <Text key='accountsTableHeaderPlanCell' size={14} weight='med'>Plan</Text>},
            // {cell: <Text key='accountsTableHeader12MonthsCell' size={14} weight='med'>12 Months</Text>},
            {cell: <Text key='accountsTableHeaderRegiteredCell' size={14} weight='med'>Registered Date</Text>},
            {cell: <Text key='accountsTableHeaderDataCell' size={14} weight='med'>Data (GB)</Text>},
            {cell: <Text key='accountsTableHeaderStorageCell' size={14} weight='med'>Storage (GB)</Text>},
            // {cell: <Text key='accountsTableHeaderFlagsCell' size={14} weight='med'>Flags</Text>},
            {cell: <Text key='accountsTableHeaderEditCell' size={14} weight='med'>Edit</Text>},
            {cell: <Text key='accountsTableHeaderLogCell' size={14} weight='med'>Log</Text>},
            {cell: <Text key='accountsTableHeaderAllowancesCell' size={14} weight='med'>Allowances</Text>},
        ]}
    }

    const renderFlags = (flags: Flag[]) => {
        return flags.map((flag) => {
            return <Text key={'flag' + flag} size={14}>{flag}</Text>
        })
    }

    const handleImpersonate = (userIdentifier: string) => {
        AccountsServices.impersonate(userIdentifier)
        .then((response) => {
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.data.token}`}).click();
        })
    }

    const accountsTableBody = () => {
        if(props.accounts) {
            return props.accounts.users.map((account, key) => {
                return {data: [
                    <a key={'accountsTableBodyAccountIdCell' + key } onClick={() => handleImpersonate(account.salesforceId)}>{account.salesforceId}</a>,
                    <Text key={'accountsTableBodyCompanyNameCell' + key } size={14}>{account.companyName}</Text>,
                    <Text key={'accountsTableBodyUserNameCell' + key } size={14}>{account.firstName + ' ' + account.lastName}</Text>,
                    <Text key={'accountsTableBodyPhoneCell' + key } size={14}>{account.phone}</Text>,
                    <Text key={'accountsTableBodyEmailCell' + key } size={14}>{account.email}</Text>,
                    account.plan ? <Link key={'accountsTableBodyPlanCell' + key } to={`/accounts/${account.userId}/plan`}>{account.plan.charAt(0).toUpperCase() + account.plan.slice(1)}</Link>
                    : <Text key={'accountsTableBodyPlanCell' + key } size={14} weight='med'> Not Activated</Text>,
                    // <Text key={'accountsTableBody12MonthsCell' + key } size={14}>${account.annualAmount ? account.annualAmount.toLocaleString() : ''}</Text>,
                    <Text key={'accountsTableBodyRegisteredDateCell' + key } size={14}>{tsToLocaleDate(account.registeredDate, DateTime.DATETIME_SHORT)}</Text>,
                    <Text key={'accountsTableBodyDataCell' + key } size={14}>{account.data.consumed / 10000000000 + ' / ' + account.data.allocated / 1000000000}</Text>,
                    <Text key={'accountsTableBodyStorageCell' + key } size={14}>{account.storage.consumed / 10000000000 + ' / ' + account.storage.allocated / 1000000000}</Text>,
                    // <div key={'accountsTableBodyFlagsCell' + key} className='flex'>{account.flags && renderFlags(account.flags)}</div>,
                    <Link key={'accountsTableBodyEditCell' + key }to={`/accounts/${account.userId}/edit`}>Edit</Link>,
                    <Link key={'accountsTableBodyLogCell' + key }to={`/accounts/${account.userId}/logs`}>Logs</Link>,
                    <Link key={'accountsTableBodyAllowancesCell' + key }to={`/accounts/${account.userId}/allowances`}>Allowances</Link>, 
                ]}
            })
        }
    }

    const handleSubmit = (salesforceId: string, search: string) => {
        setContentLoading(true)
        const previousPagination = pagination
        setPagination({page: 0, nbResults: pagination.nbResults})
        props.getAccounts(accountId, (`page=0&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId}` : '') + (search ? `&search=${search}` : '')))
        .then(() => {
            query.push(location.pathname + `?page=1&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId}` : '') + (search ? `&search=${search}` : ''))
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
            props.getAccounts(accountId, `page=${page - 1}&perPage=${nbResults}` +  (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
            .then(() => {
                setContentLoading(false)
                query.push(location.pathname + `?page=${page}&perPage=${nbResults}` + (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
            })
            .catch(() => setContentLoading(false))
        }
    }

    return props.accounts ?
        <div>
            <Text className='py1' size={14}>Account management, impersonation, plans, log and allowances</Text>
            <div className='flex my1'>
                <div className='relative flex items-center mr2'>
                    <Input  id='accountIdInput' value={accountId} placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                    <div className={ accountId && accountId.length > 0 ? 'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setAccountId('');handleSubmit('', keyword)}}><IconStyle>close</IconStyle></div>
                </div>
                <div className='relative flex items-center mr2'>
                    <Input  id='keywordInput' value={keyword} placeholder='Keyword' onChange={(event) => setKeyword(event.currentTarget.value)} />
                    <div className={ keyword && keyword.length > 0 ?'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setKeyword('');handleSubmit(accountId, '')}}><IconStyle>close</IconStyle></div>
                </div>
                <Button disabled={!accountId && !keyword ? true : false} onClick={() => {handleSubmit(accountId, keyword)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>
            <Table contentLoading={contentLoading} className='my1' id='accountsTable' headerBackgroundColor='gray-8' header={accountsTableHeader()} body={accountsTableBody()} />
            <Pagination totalResults={props.accounts.total} defaultPage={pagination.page} displayedItemsOptions={[10, 50, 100, 500]} defaultDisplayedOption={pagination.nbResults} callback={(page: number, nbResults: number) => handlePaginationChange(page, nbResults)} />
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>

}