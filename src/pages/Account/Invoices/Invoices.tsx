import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { ColorsApp } from '../../../styled/types';
import { Table } from '../../../components/Table/Table';
import { Icon } from '@material-ui/core';
import styled from 'styled-components';
import { InvoicesComponentProps } from '../../../containers/Account/Invoices';

export const InvoicesPage = (props: InvoicesComponentProps) => {

    const invoicesTableHeader = () => {
        return [
            <Text key='invoicesTableHeaderRef' size={14} weight='med' color='gray-1'>Ref</Text>,
            <Text key='invoicesTableHeaderDate' size={14} weight='med' color='gray-1'>Date</Text>,
            <Text key='invoicesTableHeaderTotal' size={14} weight='med' color='gray-1'>Total</Text>,
            <Text key='invoicesTableHeaderStatus' size={14} weight='med' color='gray-1'>Status</Text>,
            <span key='invoicesTableEmptyCell'></span>
        ]
    }

    const invoicesTableBody = () => {
        return props.invoices.map((item, i) => {
            const color = item.status === 'Paid' ? 'green' : item.status === 'Failed' ? 'red' : 'yellow';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return [
                <Text key={'invoicesTableBodyRef'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.id}</Text>,
                <Text key={'invoicesTableBodyDate'+i.toString()} size={14} weight='reg' color='gray-1'>{item.date}</Text>,
                <Text key={'invoicesTableBodyTotal'+i.toString()} size={14} weight='reg' color='gray-1'>{'$' + item.total}</Text>,
                <Label key={'invoicesTableBodyStatus'+i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status}  />,
                <IconContainer className="iconAction" key={'invoicesTableBodyActionButtons'+i.toString()}><Icon onClick={(event) => {event.preventDefault()}} >print</Icon><a href="http://localhost:8080/6701903f89c2ee62891b64a90a9b84d7.png" download><Icon>get_app</Icon></a> </IconContainer>

            ]
        })
    }
    return (
        <div>
            <Table id='invoicesTable' header={invoicesTableHeader()} body={invoicesTableBody()} />
        </div>
    )
}

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`