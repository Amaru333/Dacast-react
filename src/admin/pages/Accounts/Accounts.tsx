import React from 'react'
import { Text } from '../../../components/Typography/Text'
import { Table } from '../../../components/Table/Table'
import { AccountsComponentProps } from '../../containers/Accounts/Accounts'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { useHistory } from 'react-router-dom'
import { Pagination } from '../../../components/Pagination/Pagination'
import { IconGreyContainer, IconStyle } from '../../../shared/Common/Icon'
import { DateTime } from 'luxon'
import { useQuery, capitalizeFirstLetter } from '../../../utils/utils'
import { tsToLocaleDate } from '../../../utils/formatUtils'
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { Tooltip } from '../../../components/Tooltip/Tooltip'
import { Account } from '../../redux-flow/store/Accounts/List/types'
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes'
import { DropdownCheckbox } from '../../../components/FormsComponents/Dropdown/DropdownCheckbox'
import { dacastSdk } from '../../utils/services/axios/adminAxiosClient'
import { formatPostImpersonateInput } from '../../utils/utils'

export const AccountsPage = (props: AccountsComponentProps) => {

    let query = useHistory()

    let qs = useQuery()
    const tableColumnsDefault = {
        account: true,
        company: true,
        name: true,
        phone: true,
        email: true,
        plan: true,
        date: true,
        data: true,
        storage: true,
        flags: true,
        edit: true,
        allowances: true
    }


    const [accountId, setAccountId] = React.useState<string>(qs.get('salesforceId') || null)
    const [keyword, setKeyword] = React.useState<string>(qs.get('search') || null)
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [pagination, setPagination] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 10})
    const [tableColumn, setTableColumn] = React.useState<{
        account: boolean;
        company: boolean;
        name: boolean;
        phone: boolean;
        email: boolean;
        plan: boolean;
        date: boolean;
        data: boolean;
        storage: boolean;
        flags: boolean;
        edit: boolean;
        allowances: boolean;
    }>(tableColumnsDefault)

    React.useEffect(() => {
        if(!contentLoading) {
            setContentLoading(true)
            props.getAccounts(`page=${pagination.page - 1}&perPage=${pagination.nbResults}` +  (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
            .then(() => {
                setContentLoading(false)
                query.push(location.pathname + `?page=${pagination.page}&perPage=${pagination.nbResults}` + (accountId ? `&salesforceId=${accountId}` : '') + (keyword ? `&search=${keyword}` : ''))
            })
            .catch(() => setContentLoading(false))
        }
    }, [])

    const accountsTableHeader = () => {
        return {data: [
            tableColumn.account && {cell: <Text key='accountsTableHeaderAccountCell' size={14} weight='med'>Account</Text>},
            tableColumn.company && {cell: <Text key='accountsTableHeaderCompanyCell' size={14} weight='med'>Company</Text>},
            tableColumn.name && {cell: <Text key='accountsTableHeaderNameCell' size={14} weight='med'>Name</Text>},
            tableColumn.phone && {cell: <Text key='accountsTableHeaderPhoneCell' size={14} weight='med'>Phone</Text>},
            tableColumn.email &&{cell: <Text key='accountsTableHeaderEmailCell' size={14} weight='med'>Email</Text>},
            tableColumn.plan && {cell: <Text key='accountsTableHeaderPlanCell' size={14} weight='med'>Plan</Text>},
            tableColumn.date && {cell: <Text key='accountsTableHeaderRegiteredCell' size={14} weight='med'>Registered Date</Text>},
            tableColumn.data && {cell: <Text key='accountsTableHeaderDataCell' size={14} weight='med'>Data (GB)</Text>},
            tableColumn.storage && {cell: <Text key='accountsTableHeaderStorageCell' size={14} weight='med'>Storage (GB)</Text>},
            tableColumn.flags &&{cell: <Text key='accountsTableHeaderFlagsCell' size={14} weight='med'>Flags</Text>},
            tableColumn.edit && {cell: <Text key='accountsTableHeaderEditCell' size={14} weight='med'>Edit</Text>},
            tableColumn.allowances && {cell: <Text key='accountsTableHeaderAllowancesCell' size={14} weight='med'>Allowances</Text>},
        ].filter(p => p)}
    }


    const renderFlags = (item: Account): JSX.Element[] => {
        var element = []
        if (item.isBanned) {
            element.push(
                <IconGreyContainer key={'bannedFlag' + item.userId} className="mr1" >
                    <IconStyle fontSize="small" id={"bannedFlag" + item.userId} coloricon='gray-3'>block</IconStyle>
                    <Tooltip target={"bannedFlag" + item.userId}>Banned</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.isPlaybackBlocked) {
            element.push(
                <IconGreyContainer key={'playbackBlockedFlag' + item.userId} className="mr1" >
                    <IconStyle fontSize="small" id={"playbackBlockedFlag" + item.userId} coloricon='gray-3'>videocam_off</IconStyle>
                    <Tooltip target={"playbackBlockedFlag" + item.userId}>Playback blocked</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.isTest) {
            element.push(
                <IconGreyContainer key={'testFlag' + item.userId} className="mr1" >
                    <IconStyle fontSize="small" id={"testFlag" + item.userId} coloricon='gray-3'>build</IconStyle>
                    <Tooltip target={"testFlag" + item.userId}>Test</Tooltip>
                </IconGreyContainer>
            )
        }
        if (item.isAdult) {
            element.push(
                <IconGreyContainer key={'adultFlag' + item.userId} className="mr1" >
                    <IconStyle fontSize="small" id={"adultFlag" + item.userId} coloricon='gray-3'>visibility_off</IconStyle>
                    <Tooltip target={"adultFlag" + item.userId}>Adult</Tooltip>
                </IconGreyContainer>
            )
        }
        return element
    }

    const handleImpersonate = (userIdentifier: string) => {
        dacastSdk.postImpersonateAccount(formatPostImpersonateInput(userIdentifier))
        .then((response) => {
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.token}&identifier=${userIdentifier}`}).click();
        })
    }

    const accountsTableBody = () => {
        if(props.accounts) {
            return props.accounts.users.map((account, key) => {
                return {data: [
                    tableColumn.account && <a key={'accountsTableBodyAccountIdCell' + key } onClick={() => handleImpersonate(account.salesforceId)}>{account.salesforceId}</a>,
                    tableColumn.company && <Text key={'accountsTableBodyCompanyNameCell' + key } size={14}>{account.companyName}</Text>,
                    tableColumn.name && <Text key={'accountsTableBodyUserNameCell' + key } size={14}>{account.firstName + ' ' + account.lastName}</Text>,
                    tableColumn.phone && <Text key={'accountsTableBodyPhoneCell' + key } size={14}>{account.phone}</Text>,
                    tableColumn.email &&<Text key={'accountsTableBodyEmailCell' + key } size={14}>{account.email}</Text>,
                    tableColumn.plan && (account.plan ? <Link key={'accountsTableBodyPlanCell' + key } to={`/accounts/${account.userId}/plan`}>{capitalizeFirstLetter(account.plan)}</Link>
                    : <Text key={'accountsTableBodyPlanCell' + key } size={14} weight='med'> Not Activated</Text>),
                    tableColumn.date  && <Text key={'accountsTableBodyRegisteredDateCell' + key } size={14}>{account.registeredDate ? tsToLocaleDate(account.registeredDate, DateTime.DATETIME_SHORT) : ''}</Text>,
                    tableColumn.data && <Text key={'accountsTableBodyDataCell' + key } size={14}>{account.data.consumed / 1000000000 + ' / ' + account.data.allocated / 1000000000}</Text>,
                    tableColumn.storage && <Text key={'accountsTableBodyStorageCell' + key } size={14}>{account.storage.consumed / 1000000000 + ' / ' + account.storage.allocated / 1000000000}</Text>,
                    tableColumn.flags && <div key={'accountsTableBodyFlagsCell' + key } className='flex'>{renderFlags(account)}</div>,
                    tableColumn.edit && <Link key={'accountsTableBodyEditCell' + key }to={`/accounts/${account.userId}/edit`}>Edit</Link>,
                    tableColumn.allowances && <Link key={'accountsTableBodyAllowancesCell' + key }to={`/accounts/${account.userId}/allowances`}>Allowances</Link>, 
                ].filter(p => p)}
            })
        }
    }

    const handleSubmit = (salesforceId: string, search: string) => {
        if(!contentLoading) {
            setContentLoading(true)
            const previousPagination = pagination
            setPagination({page: 1, nbResults: pagination.nbResults})
            props.getAccounts((`page=0&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : '') + (search ? `&search=${search}` : '')))
            .then(() => {
                query.push(location.pathname + `?page=1&perPage=${pagination.nbResults}` + (salesforceId ? `&salesforceId=${salesforceId.replace(/,/g, '')}` : '') + (search ? `&search=${search}` : ''))
                setContentLoading(false)
            })
            .catch(() => {
                setPagination(previousPagination)
                setContentLoading(false)
            })
        }
    }

    const handlePaginationChange = (page: number, nbResults: number) => {
        if(pagination.page && pagination.nbResults && !contentLoading) {
            setPagination({page:page,nbResults:nbResults})
            setContentLoading(true)
            props.getAccounts(`page=${page - 1}&perPage=${nbResults}` +  (accountId ? `&salesforceId=${accountId.replace(/,/g, '')}` : '') + (keyword ? `&search=${keyword}` : ''))
            .then(() => {
                setContentLoading(false)
                query.push(location.pathname + `?page=${page}&perPage=${nbResults}` + (accountId ? `&salesforceId=${accountId.replace(/,/g, '')}` : '') + (keyword ? `&search=${keyword}` : ''))
            })
            .catch(() => setContentLoading(false))
        }
    }

    return props.accounts ?
        <div>
            <Text className='py1' size={14}>Account management, impersonation, plans, log and allowances</Text>
            <div className='flex items-center my1'>
                    <div className='relative flex items-center mr2'>
                        <Input  
                            id='accountIdInput' 
                            value={accountId} 
                            placeholder='Account ID' 
                            onChange={(event) => setAccountId(event.currentTarget.value)} 
                            onKeyDown={(event) => {if(event.key === 'Enter' || event.key === 'NumpadEnter') {handleSubmit(accountId, keyword)}}}    
                        />
                        <div className={ accountId && accountId.length > 0 ? 'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setAccountId('');handleSubmit('', keyword)}}><IconStyle>close</IconStyle></div>
                    </div>
                    <div className='relative flex items-center mr2'>
                        <Input  
                            id='keywordInput' 
                            value={keyword} 
                            placeholder='Keyword' 
                            onChange={(event) => setKeyword(event.currentTarget.value)} 
                            onKeyDown={(event) => {if(event.key === 'Enter' || event.key === 'NumpadEnter') {handleSubmit(accountId, keyword)}}}    
                        />
                        <div className={ keyword && keyword.length > 0 ?'absolute right-0 pointer pr2' : 'hide'} onClick={() => {setKeyword('');handleSubmit(accountId, '')}}><IconStyle>close</IconStyle></div>
                    </div>
                    <div className='flex-auto'>
                        <Button disabled={!accountId && !keyword ? true : false} onClick={() => {handleSubmit(accountId, keyword)}} sizeButton='large' typeButton='primary' buttonColor='blue'>Search</Button>
                    </div>

                <DropdownCheckbox id='manageColumnsDropdown' dropdownTitle='Manage Columns' callback={(value: DropdownListType) => setTableColumn(value)} list={tableColumn} />

            </div>

            <Table contentLoading={contentLoading} className='my1' id='accountsTable' headerBackgroundColor='gray-8' header={accountsTableHeader()} body={accountsTableBody()} />
            <Pagination totalResults={props.accounts.total} defaultPage={pagination.page} displayedItemsOptions={[10, 50, 100, 500]} defaultDisplayedOption={pagination.nbResults} callback={(page: number, nbResults: number) => handlePaginationChange(page, nbResults)} />
        </div>
        : <SpinnerContainer><LoadingSpinner size='medium' color='violet'></LoadingSpinner></SpinnerContainer>

}