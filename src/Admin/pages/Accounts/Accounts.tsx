import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table'
import { AccountsComponentProps } from '../../containers/Accounts/Accounts'
import { Link } from 'react-router-dom'
import { Flag } from '../../redux-flow/store/Accounts'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory } from 'react-router-dom'

// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
//   }


export const AccountsPage = (props: AccountsComponentProps) => {

    const [accountId, setAccountId] = React.useState<string>(null)
    let query = useHistory()

    React.useEffect(() => {
        console.log(query)
    }, [query])

    const accountsTableHeader = () => {
        return {data: [
        {cell: <Text key='accountsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
        {cell:<Text key='accountsTableHeaderCompanyCell' size={14} weight='med'>Company</Text>},
        {cell: <Text key='accountsTableHeaderNameCell' size={14} weight='med'>Name</Text>},
        {cell:<Text key='accountsTableHeaderPhoneCell' size={14} weight='med'>Phone</Text>},
        {cell:<Text key='accountsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
        {cell:<Text key='accountsTableHeaderPlanCell' size={14} weight='med'>Plan</Text>},
        {cell:<Text key='accountsTableHeader12MonthsCell' size={14} weight='med'>12 Months</Text>},
        {cell:<Text key='accountsTableHeaderRegiteredCell' size={14} weight='med'>Registered Date</Text>},
        {cell:<Text key='accountsTableHeaderDataCell' size={14} weight='med'>Data</Text>},
        {cell:<Text key='accountsTableHeaderStorageCell' size={14} weight='med'>Storage</Text>},
        {cell: <Text key='accountsTableHeaderEncodingCell' size={14} weight='med'>Encoding</Text>},
        {cell:<Text key='accountsTableHeaderFlagsCell' size={14} weight='med'>Flags</Text>},
        {cell:<Text key='accountsTableHeaderEditCell' size={14} weight='med'>Edit</Text>},
        {cell:<Text key='accountsTableHeaderLogCell' size={14} weight='med'>Log</Text>},
        {cell:<Text key='accountsTableHeaderAllowancesCell' size={14} weight='med'>Allowances</Text>},

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
                    <Link key={'accountsTableBodyPlanCell' + key } to=''>{account.plan}</Link>,
                    <Text key={'accountsTableBody12MonthsCell' + key } size={14}>{account.annualAmount}</Text>,
                    <Text key={'accountsTableBodyRegisteredDateCell' + key } size={14}>{account.registeredDate}</Text>,
                    <Text key={'accountsTableBodyDataCell' + key } size={14}>{account.data}</Text>,
                    <Text key={'accountsTableBodyStorageCell' + key } size={14}>{account.storage}</Text>,
                    <Text key={'accountsTableBodyEncodingCell' + key } size={14}>{account.encoding}</Text>,
                    <div key={'accountsTableBodyFlagsCell' + key} className='flex'>{renderFlags(account.flags)}</div>,
                    <Link key={'accountsTableBodyEditCell' + key }to=''>Edit</Link>,
                    <Link key={'accountsTableBodyLogCell' + key }to=''>Logs</Link>,
                    <Link key={'accountsTableBodyAllowancesCell' + key }to=''>Allowances</Link>,
    
    
                ]}
            })
        }

    }

    return (
        <div>
            <Text className='py1' size={14}>Account management, impersonation, plans, log and allowances</Text>
            <div className='flex my1'>
                <Input id='accountIdInput' placeholder='Account ID' onChange={(event) => setAccountId(event.currentTarget.value)} />
                <Button disabled={!accountId ? true : false} onClick={() => {props.getAccounts(accountId);query.push(location.pathname + '?accountId=' + accountId)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
            </div>

            <Table className='mt1 mb2' id='accountsTable' headerBackgroundColor='gray-8' header={accountsTableHeader()} body={accountsTableBody()} />
            {/* <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} /> */}
        </div>
    )
}