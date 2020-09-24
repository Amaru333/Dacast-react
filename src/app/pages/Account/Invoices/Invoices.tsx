import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { InvoicesComponentProps } from '../../../containers/Account/Invoices';
import { InputTags } from '../../../../components/FormsComponents/Input/InputTags';
import { InvoicesFiltering } from './InvoicesFiltering';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { tsToLocaleDate } from '../../../../utils/utils';
import { DateTime } from 'luxon';
import { axiosClient } from '../../../utils/services/axios/axiosClient';
import { Link } from 'react-router-dom';

export const InvoicesPage = (props: InvoicesComponentProps) => {

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
        return {data: [
            {cell: <Text key='invoicesTableHeaderRef' size={14} weight='med' color='gray-1'>Ref</Text>},
            {cell: <Text key='invoicesTableHeaderDate' size={14} weight='med' color='gray-1'>Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key='invoicesTableHeaderTotal' size={14} weight='med' color='gray-1'>Total</Text>},
            {cell: <Text key='invoicesTableHeaderStatus' size={14} weight='med' color='gray-1'>Status</Text>},
            {cell: <span key='invoicesTableEmptyCell'></span>}
        ], defaultSort: 'Created Date'}
    }

    const invoicesTableBody = () => {
        return props.invoices.map((item, i) => {
            const color = item.status === 'paid' ? 'green' : item.status === 'failed' ? 'red' : 'yellow';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return {data: [
                <Text key={'invoicesTableBodyRef'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.id}</Text>,
                <Text key={'invoicesTableBodyDate'+i.toString()} size={14} weight='reg' color='gray-1'>{tsToLocaleDate(item.date, DateTime.DATETIME_SHORT)}</Text>,
                <Text key={'invoicesTableBodyTotal'+i.toString()} size={14} weight='reg' color='gray-1'>{'$' + item.total}</Text>,
                <Label key={'invoicesTableBodyStatus'+i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}  />,
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
                <div className='flex items-center flex-auto mb2'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />   
                </div>
                <InvoicesFiltering className="mb2" />
            </div>
            {
                props.invoices && props.invoices.length > 0 ?
                <Table hasContainer id='invoicesTable' headerBackgroundColor="white" header={invoicesTableHeader()} body={invoicesTableBody()} />
                : <Table hasContainer id='invoicesEmptyTable' headerBackgroundColor="white" header={emptyInvoicesTableHeader()} body={emptyInvoicesTableBody()} />

            }
            <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
        </div>
    )
}