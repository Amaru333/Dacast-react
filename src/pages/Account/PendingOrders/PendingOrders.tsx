import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { ColorsApp } from '../../../styled/types';
import { Label } from '../../../components/FormsComponents/Label/Label';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Pagination } from '../../../components/Pagination/Pagination';

export const PendingOrdersPage = () => {

    const pendingOrderData = [
        {id: "1", itemCount: 1, dateCreated: "10:34:00 05/04/2019", price: 175, currency: "usd", status: "unpaid", type: "event"},
        {id: "2", itemCount: 2, dateCreated: "10:55:23 05/22/2019", price: 300, currency: "usd", status: "failed", type: "event"},
        {id: "3", itemCount: 1, dateCreated: "14:23:20 06/12/2019", price: 12, currency: "gbp", status: "cancelled", type: "event"},
        {id: "4", itemCount: 1, dateCreated: "10:55:23 06/17/2019", price: 400, currency: "usd", status: "paid", type: "event"}
    ]

    const pendingOrdersTableHeader = () => {
        return [
            <Text key='pendingOrderTableItemCount' size={14} weight='med' color='gray-1'>No. of Items</Text>,
            <Text key='pendingOrderTableDateCreated' size={14} weight='med' color='gray-1'>Date Created</Text>,
            <Text key='pendingOrderTablePrice' size={14} weight='med' color='gray-1'>Price</Text>,
            <Text key='pendingOrderTableCurrency' size={14} weight='med' color='gray-1'>Currency</Text>,
            <Text key='pendingOrderTableStatus' size={14} weight='med' color='gray-1'>Status</Text>,
            <Text key='pendingOrderTableType' size={14} weight='med' color='gray-1'>Type</Text>,
            <span key="pendingOrderTablePurchase"></span>

        ]
    }

    const pendingOrdersTableBody = () => {
        return pendingOrderData.map((item, i) => {
            const color = item.status === 'paid' ? 'green' : item.status === 'failed' ? 'red' : item.status === 'unpaid' ? 'yellow' : 'gray-1';
            const BackgroundColor: ColorsApp = item.status === 'cancelled' ? 'gray-8' : color + '20' as ColorsApp;
            return [
                <Text key={'pendingOrderTableItemCount'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.itemCount}</Text>,
                <Text key={'pendingOrderTableDateCreated'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.dateCreated}</Text>,
                <Text key={'pendingOrderTablePrice'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.price}</Text>,
                <Text key={'pendingOrderTableCurrency'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.currency}</Text>,
                <Label key={'pendingOrderTableStatus'+ i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status} />,
                <Text key={'pendingOrderTableType'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.type}</Text>,
                <div className="iconAction right mr2"><Button sizeButton="xs">Purchase</Button></div>
                
            ]
        })
    }

    return (
        <React.Fragment>
            <Table id="pendingOrdersTable" header={pendingOrdersTableHeader()} body={pendingOrdersTableBody()} />
            <Pagination totalResults={pendingOrderData.length} displayedItemsOptions={[10, 20, 30]} callback={() => {}}></Pagination>
        </React.Fragment>
    )
}