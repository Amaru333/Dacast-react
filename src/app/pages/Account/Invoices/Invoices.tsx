import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { InvoicesComponentProps } from '../../../containers/Account/Invoices';
import { InvoicesFiltering, FilteringInvoicesState } from './InvoicesFiltering';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { tsToLocaleDate, capitalizeFirstLetter, useQuery } from '../../../../utils/utils';
import { DateTime } from 'luxon';
import { axiosClient } from '../../../utils/axiosClient';
import { Link, useHistory } from 'react-router-dom';

export const InvoicesPage = (props: InvoicesComponentProps) => {

    let qs = useQuery()
    let history = useHistory()

    const formatFilters = () => {
        let filters: FilteringInvoicesState = {
            status: {
                paid: qs.toString().indexOf('paid') > -1,
                pending: qs.toString().indexOf('pending') > -1,
                failed: qs.toString().indexOf('failed') > -1,
            },
            startDate: parseInt(qs.get('startDate')) || false,
            endDate: parseInt(qs.get('endDate')) || false,
        }
        return filters
    }

    const [qsParams, setQsParams] = React.useState<string>(qs.toString() || 'page=1&perPage=20&sortBy=created-at-desc')
    const [contentLoading, setContentLoading] = React.useState<boolean>(false)
    const [sort, setSort] = React.useState<string>(qs.get('sortBy') || 'created-at-desc')
    const [paginationInfo, setPaginationInfo] = React.useState<{page: number; nbResults: number}>({page: parseInt(qs.get('page')) || 1, nbResults: parseInt(qs.get('perPage')) || 20})
    const [selectedFilters, setSelectedFilter] = React.useState<FilteringInvoicesState>(formatFilters())
    const [fetchContent, setFetchContent] = React.useState<boolean>(false)

    const formatFiltersToQueryString = (filters: FilteringInvoicesState, pagination: {page: number; nbResults: number}, sortValue: string) => {
        let returnedString= `page=${pagination.page}&perPage=${pagination.nbResults}`
        if(filters) {

            if(filters.status) {
                returnedString += '&status=' + (filters.status.paid ? 'paid' : '') + (filters.status.pending ? ',pending' : '') + (filters.status.failed ? ',failed' : '')
            }

            if(filters.startDate) {
                returnedString += `&startDate=${filters.startDate}`
            }

            if(filters.endDate) {
                returnedString += `&endDate=${filters.endDate}`
            }
        }

        if(sortValue) {
            returnedString += `&sortBy=${sortValue}`
        }

        setQsParams(returnedString)
    }

    React.useEffect(() => {
        if(!fetchContent) {
            setFetchContent(true)
        }
    }, [qsParams])

    React.useEffect(() => {
        if(fetchContent) {
            setContentLoading(true)
            props.getInvoices(qsParams).then(() => {
                setContentLoading(false)
                setFetchContent(false)
                history.push(`${location.pathname}?${qsParams}`)
            }).catch(() => {
                setContentLoading(false)
                setFetchContent(false)
            })  
        }
    }, [fetchContent])

    function saveFile(url: string, filename: string) {
        axiosClient.get(url, {authRequired: false}
        ).then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            if (navigator.msSaveBlob) {
                //This is to support fucking IE 
                navigator.msSaveBlob(blob, filename);
            } else {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        })

        }

    const invoicesTableHeader = () => {
        return {
            data: [
                {cell: <Text key='invoicesTableHeaderRef' size={14} weight='med' color='gray-1'>Ref</Text>},
                {cell: <Text key='invoicesTableHeaderDate' size={14} weight='med' color='gray-1'>Created Date</Text>, sort: 'Created Date'},
                {cell: <Text key='invoicesTableHeaderTotal' size={14} weight='med' color='gray-1'>Total</Text>},
                {cell: <Text key='invoicesTableHeaderStatus' size={14} weight='med' color='gray-1'>Status</Text>},
                {cell: <span key='invoicesTableEmptyCell'></span>}
            ], 
            defaultSort: 'Created Date',
            sortCallback: (value: string) => {setSort(value); formatFiltersToQueryString(selectedFilters, paginationInfo, value)}
        }
    }

    const invoicesTableBody = () => {
        return props.invoicesInfo.invoices.map((item, i) => {
            const color = item.status === 'paid' ? 'green' : item.status === 'failed' ? 'red' : 'yellow';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return {data: [
                <Text key={'invoicesTableBodyRef'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.id}</Text>,
                <Text key={'invoicesTableBodyDate'+i.toString()} size={14} weight='reg' color='gray-1'>{tsToLocaleDate(item.date, DateTime.DATETIME_SHORT)}</Text>,
                <Text key={'invoicesTableBodyTotal'+i.toString()} size={14} weight='reg' color='gray-1'>{'$' + item.total}</Text>,
                <Label key={'invoicesTableBodyStatus'+i.toString()} backgroundColor={BackgroundColor} color={color} label={capitalizeFirstLetter(item.status)}  />,
                <IconContainer className="iconAction" key={'invoicesTableBodyActionButtons'+i.toString()}><a className="noTransition" href={item.downloadLink} target='_blank'><IconStyle>print</IconStyle></a><IconStyle onClick={() => saveFile(item.downloadLink, item.id + '.pdf')}>get_app</IconStyle></IconContainer>

            ]}
        })
    }

    const emptyInvoicesTableHeader = () => {
        return {
            data: [
                { cell: <span key='invoicesTableEmptyHeaderCell'></span> }
            ]
        }
    }


    const emptyInvoicesTableBody = () => {
        return [{
            data: [
                <div key='invoicesBodyEmptyTable' className='center'>
                    <Text size={14} weight='reg' color='gray-3'>You have no invoices. </Text>
                    <Link to='/account/upgrade'  >Click here</Link>
                    <Text size={14} weight='reg' color='gray-3'> to upgrade your plan.</Text>
                </div>
            ]
        }]
    }

    return (
        <div>
            <div className='flex'>
                <InvoicesFiltering defaultFilters={selectedFilters} setSelectedFilter={(filters) => {setSelectedFilter(filters);formatFiltersToQueryString(filters, paginationInfo, sort)}} />
            </div>
            {
                props.invoicesInfo && props.invoicesInfo.invoices && props.invoicesInfo.invoices.length > 0 ?
                <Table contentLoading={contentLoading} hasContainer id='invoicesTable' headerBackgroundColor="white" header={invoicesTableHeader()} body={invoicesTableBody()} />
                : <Table hasContainer id='invoicesEmptyTable' headerBackgroundColor="white" header={emptyInvoicesTableHeader()} body={emptyInvoicesTableBody()} />

            }
            <Pagination totalResults={props.invoicesInfo.total} defaultPage={props.invoicesInfo.page} defaultDisplayedOption={props.invoicesInfo.perPage} displayedItemsOptions={[20, 50, 100]} callback={(page: number, nbResults: number) => {setPaginationInfo({page:page,nbResults:nbResults});formatFiltersToQueryString(selectedFilters, {page:page,nbResults:nbResults}, sort)}} />
        </div>
    )
}