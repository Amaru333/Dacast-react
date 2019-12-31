import React from 'react';
import { Text } from '../../../Typography/Text';
import { Label } from '../../../FormsComponents/Label/Label';
import { ColorsApp } from '../../../../styled/types';
import { Table } from '../../../Table/Table';


const invoicesData = [
    {
        id: 62055,
        date: '10:34:00 05/04/2019',
        total: 165,
        status: 'Pending'
    },
    {
        id: 61603,
        date: '10:55:23 05/22/2019',
        total: 165,
        status: 'Failed'
    },
    {
        id: 61238,
        date: '14:23:20 06/12/2019',
        total: 165,
        status: 'Paid'
    },    
    {
        id: 61233,
        date: '10:55:23 06/17/2019',
        total: 165,
        status: 'Paid'
    },
    {
        id: 61232,
        date: '10:34:00 07/30/2019',
        total: 165,
        status: 'Paid'
    },
    {
        id: 61231,
        date: '14:23:20 08/01/2019',
        total: 165,
        status: 'Paid'
    },
    {
        id: 61226,
        date: '10:34:00 05/04/2019',
        total: 165,
        status: 'Paid'
    },
    {
        id: 61225,
        date: '10:55:23 05/22/2019',
        total: 165,
        status: 'Paid'
    }
]

export const Invoices = () => {

    const invoicesTableHeader = () => {
        return [
            <Text key='invoicesTableHeaderRef' size={14} weight='med' color='gray-1'>Ref</Text>,
            <Text key='invoicesTableHeaderDate' size={14} weight='med' color='gray-1'>Date</Text>,
            <Text key='invoicesTableHeaderTotal' size={14} weight='med' color='gray-1'>Total</Text>,
            <Text key='invoicesTableHeaderStatus' size={14} weight='med' color='gray-1'>Status</Text>,
        ]
    }

    const invoicesTableBody = () => {
        return invoicesData.map((item, i) => {
            const color = item.status === 'Paid' ? 'green' : item.status === 'Failed' ? 'red' : 'yellow';
            const BackgroundColor: ColorsApp = color + '20' as ColorsApp;
            return [
                <Text key={'invoicesTableBodyRef'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.id}</Text>,
                <Text key={'invoicesTableBodyDate'+i.toString()} size={14} weight='reg' color='gray-1'>{item.date}</Text>,
                <Text key={'invoicesTableBodyTotal'+i.toString()} size={14} weight='reg' color='gray-1'>{'$' + item.total}</Text>,
                <Label key={'invoicesTableBodyStatus'+i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status}  />
            ]
        })
    }
    return (
        <div>
            <Table id='invoicesTable' header={invoicesTableHeader()} body={invoicesTableBody()} />
        </div>
    )
}