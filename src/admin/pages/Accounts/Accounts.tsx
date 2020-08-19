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
import { tsToLocaleDate } from '../../../utils/utils'
import { AccountsServices } from '../../redux-flow/store/Accounts/List/services'


export const AccountsPage = (props: AccountsComponentProps) => {

    const [accountId, setAccountId] = React.useState<string>(null)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [pagination, setPagination] = React.useState<{page: number; nbResults: number}>({page:1,nbResults:10})

    let query = useHistory()
    let {url} = useRouteMatch()

    React.useEffect(() => {
        if(pagination) {
            setContentLoading(true)
            props.getAccounts(accountId, `page=${pagination.page - 1}&perPage=${pagination.nbResults}`)
            .then(() => setContentLoading(false))
            .catch(() => setContentLoading(false))
        }
    }, [pagination])

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
            {cell: <Text key='accountsTableHeaderFlagsCell' size={14} weight='med'>Flags</Text>},
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
                    <Link key={'accountsTableBodyPlanCell' + key } to={`/${account.userId}/plan`}>{account.plan ? account.plan.charAt(0).toUpperCase() + account.plan.slice(1) : ''}</Link>,
                    // <Text key={'accountsTableBody12MonthsCell' + key } size={14}>${account.annualAmount ? account.annualAmount.toLocaleString() : ''}</Text>,
                    <Text key={'accountsTableBodyRegisteredDateCell' + key } size={14}>{tsToLocaleDate(account.registeredDate)}</Text>,
                    <Text key={'accountsTableBodyDataCell' + key } size={14}>{account.data.consumed / 10000000000 + ' / ' + account.data.allocated / 1000000000}</Text>,
                    <Text key={'accountsTableBodyStorageCell' + key } size={14}>{account.storage.consumed / 10000000000 + ' / ' + account.storage.allocated / 1000000000}</Text>,
                    <div key={'accountsTableBodyFlagsCell' + key} className='flex'>{account.flags ? renderFlags(account.flags) : null}</div>,
                    <Link key={'accountsTableBodyEditCell' + key }to={`/accounts/${account.userId}/edit`}>Edit</Link>,
                    <Link key={'accountsTableBodyLogCell' + key }to={`/accounts/${account.userId}/logs`}>Logs</Link>,
                    <Link key={'accountsTableBodyAllowancesCell' + key }to={`/accounts/${account.userId}/allowances`}>Allowances</Link>, 
                ]}
            })
        }
    }

    const handleSubmit = () => {
        query.push(location.pathname + '?accountId=' + accountId)
        setContentLoading(true)
        props.getAccounts(accountId, `page=${pagination.page}&perPage=${pagination.nbResults}`)
        .then(() => setContentLoading(false))
        .catch(() => setContentLoading(false))
    }
    return (
        <div>
            <Text className='py1' size={14}>Account management, impersonation, plans, log and allowances</Text>
            <div className='flex my1'>
                <div className='relative flex items-center mr2'>
                    <Input  id='accountIdInput' value={accountId} placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                    <div className={ accountId && accountId.length > 0 ?'absolute right-0 pointer pr2' : 'hide'} onClick={() => setAccountId('')}><IconStyle>close</IconStyle></div>
                </div>
                <Button disabled={!accountId ? true : false} onClick={() => {handleSubmit()}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>
            <Table contentLoading={contentLoading} className='my1' id='accountsTable' headerBackgroundColor='gray-8' header={accountsTableHeader()} body={accountsTableBody()} />
            <Pagination totalResults={props.accounts.total} displayedItemsOptions={[10, 50, 100, 500]} defaultDisplayedOption={pagination.nbResults} callback={(page: number, nbResults: number) => {setPagination({page:page,nbResults:nbResults})}} />
        </div>
    )
}