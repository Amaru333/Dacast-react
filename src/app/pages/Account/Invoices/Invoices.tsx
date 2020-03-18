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

export const InvoicesPage = (props: InvoicesComponentProps) => {

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
            const color = item.status === 'Paid' ? 'green' : item.status === 'Failed' ? 'red' : 'yellow';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return {data: [
                <Text key={'invoicesTableBodyRef'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.id}</Text>,
                <Text key={'invoicesTableBodyDate'+i.toString()} size={14} weight='reg' color='gray-1'>{item.date}</Text>,
                <Text key={'invoicesTableBodyTotal'+i.toString()} size={14} weight='reg' color='gray-1'>{'$' + item.total}</Text>,
                <Label key={'invoicesTableBodyStatus'+i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status}  />,
                <IconContainer className="iconAction" key={'invoicesTableBodyActionButtons'+i.toString()}><IconStyle onClick={(event) => {event.preventDefault()}} >print</IconStyle><a href="http://localhost:8080/6701903f89c2ee62891b64a90a9b84d7.png" download><IconStyle>get_app</IconStyle></a> </IconContainer>

            ]}
        })
    }
    return (
        <div>
            <div className='flex mb2'>
                <div className='flex items-center flex-auto'>
                    <IconStyle coloricon='gray-3'>search</IconStyle>
                    <InputTags oneTag noBorder={true} placeholder="Search..." style={{display: "inline-block"}} defaultTags={[]}   />   
                </div>
                <InvoicesFiltering />
            </div>
            <Table id='invoicesTable' headerBackgroundColor="white" header={invoicesTableHeader()} body={invoicesTableBody()} />
            <Pagination totalResults={290} displayedItemsOptions={[10, 20, 100]} callback={() => {}} />
        </div>
    )
}