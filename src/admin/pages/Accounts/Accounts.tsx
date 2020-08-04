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


export const AccountsPage = (props: AccountsComponentProps) => {

    const [accountId, setAccountId] = React.useState<string>('')
    const [contentLoading, setContentLoading] = React.useState<boolean>(true)
    let query = useHistory()
    let {url} = useRouteMatch()

    const accountsTableHeader = () => {
        return {data: [
            {cell: <Text key='accountsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            {cell: <Text key='accountsTableHeaderCompanyCell' size={14} weight='med'>Company</Text>},
            {cell: <Text key='accountsTableHeaderNameCell' size={14} weight='med'>Name</Text>},
            {cell: <Text key='accountsTableHeaderPhoneCell' size={14} weight='med'>Phone</Text>},
            {cell: <Text key='accountsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
            {cell: <Text key='accountsTableHeaderPlanCell' size={14} weight='med'>Plan</Text>},
            {cell: <Text key='accountsTableHeader12MonthsCell' size={14} weight='med'>12 Months</Text>},
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

    const accountsTableBody = () => {
        if(props.accounts) {
            return props.accounts.map((account, key) => {
                return {data: [
                    <Link key={'accountsTableBodyAccountIdCell' + key }to=''>{account.id}</Link>,
                    <Text key={'accountsTableBodyCompanyNameCell' + key } size={14}>{account.companyName}</Text>,
                    <Text key={'accountsTableBodyUserNameCell' + key } size={14}>{account.userName}</Text>,
                    <Text key={'accountsTableBodyPhoneCell' + key } size={14}>{account.phone}</Text>,
                    <Text key={'accountsTableBodyEmailCell' + key } size={14}>{account.email}</Text>,
                    <Link key={'accountsTableBodyPlanCell' + key } to={`${url}/${account.id}/plan`}>{account.plan ? account.plan.charAt(0).toUpperCase() + account.plan.slice(1) : ''}</Link>,
                    <Text key={'accountsTableBody12MonthsCell' + key } size={14}>${account.annualAmount ? account.annualAmount.toLocaleString() : ''}</Text>,
                    <Text key={'accountsTableBodyRegisteredDateCell' + key } size={14}>{account.registeredDate}</Text>,
                    <Text key={'accountsTableBodyDataCell' + key } size={14}>{account.data}</Text>,
                    <Text key={'accountsTableBodyStorageCell' + key } size={14}>{account.storage}</Text>,
                    <div key={'accountsTableBodyFlagsCell' + key} className='flex'>{account.flags ? renderFlags(account.flags) : null}</div>,
                    <Link key={'accountsTableBodyEditCell' + key }to={`${url}/${account.id}/edit`}>Edit</Link>,
                    <Link key={'accountsTableBodyLogCell' + key }to={`${url}/${account.id}/logs`}>Logs</Link>,
                    <Link key={'accountsTableBodyAllowancesCell' + key }to={`${url}/${account.id}/allowances`}>Allowances</Link>, 
                ]}
            })
        }
    }

    const handleSubmit = () => {
        query.push(location.pathname + '?accountId=' + accountId)
        setContentLoading(true)
        props.getAccounts(accountId).then(() => setContentLoading(false))
    }
    return (
        <div>
            <Text className='py1' size={14}>Account management, impersonation, plans, log and allowances</Text>
            <div className='flex my1'>
                <div className='relative flex items-center mr2'>
                    <Input  id='accountIdInput' value={accountId} placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                    <div className={ accountId.length > 0 ?'absolute right-0 pointer pr2' : 'hide'} onClick={() => setAccountId('')}><IconStyle>close</IconStyle></div>
                </div>
                <Button disabled={!accountId ? true : false} onClick={() => {handleSubmit()}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>
            <Table contentLoading={contentLoading} className='my1' id='accountsTable' headerBackgroundColor='gray-8' header={accountsTableHeader()} body={accountsTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[25, 50, 100, 250, 1000]} defaultDisplayedOption={100} callback={() => {}} />
        </div>
    )
}