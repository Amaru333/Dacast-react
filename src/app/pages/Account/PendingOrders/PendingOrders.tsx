import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { ColorsApp } from '../../../../styled/types';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { CustomStepper } from '../../../../components/Stepper/Stepper';
import { CartStep, PaymentStep } from './PendingOrderStepper';
import { PendingOrder } from '../../../redux-flow/store/Account/PendingOrders/types';
import { PendingOrdersComponentProps } from '../../../containers/Account/PendingOrders';
import { tsToLocaleDate } from '../../../../utils/utils';
import { DateTime } from 'luxon';

export const PendingOrdersPage = (props: PendingOrdersComponentProps) => {

    const emptyOrder: PendingOrder = 
    {   id: "-1", 
        items: [{id: "-1", price: 0, description: ""}], 
        dateCreated: "", 
        price: 0, 
        currency: "", 
        status: "", 
        type: ""
    }

    const [purchaseStepperOpen, setPurchaseStepperOpen] = React.useState<boolean>(false)
    const [selectedPendingOrder, setSelectedPendingOrder] = React.useState<PendingOrder>(emptyOrder)
    

    const handlePurchase = (order: PendingOrder) => {
        setSelectedPendingOrder(order)
        selectedPendingOrder ?
            setPurchaseStepperOpen(true) : null
        console.log(selectedPendingOrder)
    }

    const pendingOrdersTableHeader = () => {
        return {data: [
            {cell: <Text key='pendingOrderTableItemCount' size={14} weight='med' color='gray-1'>No. of Items</Text>},
            {cell: <Text key='pendingOrderTableDateCreated' size={14} weight='med' color='gray-1'>Created Date</Text>, sort: 'Created Date'},
            {cell: <Text key='pendingOrderTablePrice' size={14} weight='med' color='gray-1'>Price</Text>},
            {cell: <Text key='pendingOrderTableCurrency' size={14} weight='med' color='gray-1'>Currency</Text>},
            {cell: <Text key='pendingOrderTableStatus' size={14} weight='med' color='gray-1'>Status</Text>},
            {cell: <Text key='pendingOrderTableType' size={14} weight='med' color='gray-1'>Type</Text>},
            {cell: <span key="pendingOrderTablePurchase"></span>}

        ], defaultSort: 'Created Date'}
    }

    const pendingOrdersTableBody = () => {
        return props.pendingOrders.pendingOrders.map((item, i) => {
            const color = item.status === 'paid' ? 'green' : item.status === 'failed' ? 'red' : item.status === 'unpaid' ? 'yellow' : 'gray-1';
            const BackgroundColor: ColorsApp = item.status === 'cancelled' ? 'gray-8' : color + '20' as ColorsApp;
            return {data: [
                <Text key={'pendingOrderTableItemCount'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.items.length}</Text>,
                <Text key={'pendingOrderTableDateCreated'+ i.toString()} size={14} weight='reg' color='gray-1'>{tsToLocaleDate(item.dateCreated, DateTime.DATETIME_SHORT)}</Text>,
                <Text key={'pendingOrderTablePrice'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.price}</Text>,
                <Text key={'pendingOrderTableCurrency'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.currency.toUpperCase()}</Text>,
                <Label key={'pendingOrderTableStatus'+ i.toString()} backgroundColor={BackgroundColor} color={color} label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} />,
                <Text key={'pendingOrderTableType'+ i.toString()} size={14} weight='reg' color='gray-1'>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>,
                item.status === "unpaid" ?
                    <div className="right mr2"><Button sizeButton="xs" onClick={() => handlePurchase(item)}>Purchase</Button></div> : null
                
            ]}
        })
    }

    const purchaseStepList = [CartStep, PaymentStep]


    
    return (
        <React.Fragment>
            <Table id="pendingOrdersTable" headerBackgroundColor="white" header={pendingOrdersTableHeader()} body={pendingOrdersTableBody()} />
            <Pagination totalResults={props.pendingOrders.pendingOrders.length} displayedItemsOptions={[10, 20, 30]} callback={() => {}}></Pagination>
            <CustomStepper
                opened={purchaseStepperOpen}
                stepperHeader="Purchase Pending Order"
                stepList={purchaseStepList}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                stepTitles={["Cart", "Payment"]}
                lastStepButton="Purchase"
                finalFunction={() => {setPurchaseStepperOpen(false); props.updatePendingOrders(selectedPendingOrder)}}
                functionCancel={() => setPurchaseStepperOpen(false)}
                stepperData={selectedPendingOrder}
            />
        </React.Fragment>
    )
}