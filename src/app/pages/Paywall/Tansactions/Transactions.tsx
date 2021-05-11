import React from 'react';
import { TransactionsFiltering, FilteringTransactionsState } from './TransactionsFiltering';
import { Table } from '../../../../components/Table/Table';
import { Text } from '../../../../components/Typography/Text';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { TransactionsComponentProps } from '../../../containers/Paywall/Transactions';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { handleCurrencySymbol, useQuery } from '../../../../utils/utils';
import { IconStyle } from '../../../../shared/Common/Icon';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { exportCSVFile } from '../../../../utils/services/csv/csvService';
import { formatGetPaywallTransactionsCsvInput } from '../../../redux-flow/store/Paywall/Transactions/viewModel';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { userToken } from '../../../utils/services/token/tokenService';

export const TransactionsPage = (props: TransactionsComponentProps) => {

    let qs = useQuery()
    let history = useHistory()


    const formatFilters = () => {
        let filters: FilteringTransactionsState = {
            type: qs.get('type'),
            currency: {
                aud: qs.toString().indexOf('aud') > -1,
                gbp: qs.toString().indexOf('gbp') > -1,
                usd: qs.toString().indexOf('usd') > -1,
                eur: qs.toString().indexOf('eur') > -1,
            },
            startDate: parseInt(qs.get('startDate')) || false,
            endDate: parseInt(qs.get('endDate')) || false,
        }
        return filters
    }

    const [qsParams, setQsParams] = React.useState<string>(qs.toString() || 'page=1&perPage=20&sortBy=created-at-desc')
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [sort, setSort] = React.useState<string>(qs.get('sortBy') || 'created-at-desc')
    const [searchString, setSearchString] = React.useState<string>(qs.get('keyword') || null)
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 20})
    const [selectedFilters, setSelectedFilter] = React.useState<FilteringTransactionsState>(formatFilters())
    const [fetchContent, setFetchContent] = React.useState<boolean>(false)

    const formatFiltersToQueryString = (filters: FilteringTransactionsState, pagination: {page: number; nbResults: number}, sortValue: string, keyword: string, ) => {
        let returnedString= `page=${pagination.page}&perPage=${pagination.nbResults}`
        if(filters) {

            if(filters.type) {
                returnedString += '&type=' + filters.type
            }

            if(filters.currency) {
                returnedString += '&currency=' + (filters.currency.aud ? 'aud' : '') + (filters.currency.gbp ? ',gbp' : '') + (filters.currency.usd ? ',usd' : '') + (filters.currency.eur ? ',eur' : '')
            }

            if(filters.startDate) {
                returnedString += `&startDate=${filters.startDate}`
            }

            if(filters.endDate) {
                returnedString += `&endDate=${filters.endDate}`
            }
        }
        if(keyword) {
            returnedString += `&keyword=${keyword}`
        }
        if(sortValue) {
            returnedString += `&sortBy=${sortValue}`
        }

        if(returnedString.indexOf('type=&') > -1) {
            returnedString = returnedString.replace('type=&','')
        }

        if(returnedString.indexOf('currency=&') > -1) {
            returnedString = returnedString.replace('currency=&','')

        }
        returnedString = returnedString.replace('currency=,','currency=')

        // if(returnedString.indexOf('currency') === -1) {
        //     returnedString += 'currency=aud,gbp,usd,eur'
        // }


        setQsParams(returnedString)
    }

    React.useEffect(() => {
        if(!fetchContent) {
            setFetchContent(true)
        }
    }, [qsParams])

    React.useEffect(() => {
        if (props.associatePrivilege.some(p => userToken.isUnauthorized(p))) {
            return
        }
        if(fetchContent) {
            setContentLoading(true)
            props.getTransactions(qsParams).then(() => {
                // props.syncTransactions()
                setContentLoading(false)
                setFetchContent(false)
                history.push(`${location.pathname}?${qsParams}`)
            }).catch(() => {
                setContentLoading(false)
                setFetchContent(false)
            })
        }
    }, [fetchContent])

    const transactionsTableHeader = () => {
        return {
            data: [
                {cell: <Text key='transactionsTableHeaderType' size={14} weight='med'>Type</Text>},
                {cell: <Text key='transactionsTableHeaderContentName' size={14} weight='med'>Content Name</Text>},
                {cell: <Text key='transactionsTableHeaderDate' size={14} weight='med'>Created Date</Text>, sort: 'Created Date'},
                {cell: <Text key='transactionsTableHeaderPurchaser' size={14} weight='med'>Purchaser</Text>},
                {cell: <Text key='transactionsTableHeaderViewerCurrency' size={14} weight='med'>Currency</Text>},
                {cell: <Text key='transactionsTableHeaderPrice' size={14} weight='med'>Price</Text>},
                {cell: <Text key='transactionsTableHeaderCredit' size={14} weight='med'>Credit</Text>},
                {cell: <Text key='transactionsTableHeaderDebit' size={14} weight='med'>Debit</Text>},
            ],
            defaultSort: 'Created Date',
            sortCallback: (value: string) => {setSort(value); formatFiltersToQueryString(selectedFilters, paginationInfo, value, searchString)}
        }
    }

    const transactionsTableBody = () => {
        if(props.transactionsInfo && props.transactionsInfo.transactionsList) {
            return props.transactionsInfo.transactionsList.map((transaction, i) => {
                return {data: [
                    <Text key={'transactionsTableBodyType' + i} size={14} weight='reg'>{transaction.type}</Text>,
                    <Text key={'transactionsTableBodyContentName' + i} size={14} weight='reg'>{transaction.contentName}</Text>,
                    <Text key={'transactionsTableBodyDate' + i} size={14} weight='reg'>{transaction.date}</Text>,
                    <Text key={'transactionsTableBodyPurchaser' + i} size={14} weight='reg'>{transaction.purchaser}</Text>,
                    <Text key={'transactionsTableBodyViewerCurrency' + i} size={14} weight='reg'>{transaction.currency}</Text>,
                    <Text key={'transactionsTableBodyPrice' + i} size={14} weight='reg'>{handleCurrencySymbol(transaction.currency) + transaction.price}</Text>,
                    transaction.credit ? <Label label={transaction.credit.toLocaleString()} color='green' backgroundColor='green20' /> : <span></span>,
                    transaction.debit ? <Label label={transaction.debit.toLocaleString()} color='red' backgroundColor='red20' /> : <span></span>,
                ]}
            })
        }
    }

    const handleExportClick = () => {
        dacastSdk.getPaywallTransactionsCsv(formatGetPaywallTransactionsCsvInput(qsParams))
        .then((response) => {
            exportCSVFile(response as string, 'transactions')
        })
    }

    return (
        <div className='flex flex-column'>
            <div style={{alignItems: 'center'}} className='col col-12 flex justify-end'>
                <div className='flex items-center flex-auto'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={searchString ? [searchString] : []} callback={(value: string[]) => {setSearchString(value[0]);formatFiltersToQueryString(selectedFilters, paginationInfo, sort, value[0])}}   />
                </div>
                <Button className=' mr2 right' sizeButton='small' typeButton='secondary' buttonColor='gray' onClick={handleExportClick}>Export </Button>
                <TransactionsFiltering defaultFilters={selectedFilters} setSelectedFilter={(filters) => {setSelectedFilter(filters);formatFiltersToQueryString(filters, paginationInfo, sort, searchString)}} />
            </div>

            <Table id='transactionTable' contentLoading={contentLoading} headerBackgroundColor="white" header={transactionsTableHeader()} body={transactionsTableBody()} />
            <Pagination className='mb3' totalResults={props.transactionsInfo ? props.transactionsInfo.total : 0} defaultPage={props.transactionsInfo ? props.transactionsInfo.page : 1} defaultDisplayedOption={props.transactionsInfo ? props.transactionsInfo.perPage : 0} displayedItemsOptions={[20, 50, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults});formatFiltersToQueryString(selectedFilters, {page:page,nbResults:nbResults}, sort, searchString)}} />
        </div>
    )
}
