import React from 'react';
import { Text } from "../../../components/Typography/Text"
import { Table } from '../../../components/Table/Table';
import { PendingOrder } from '../../../containers/Account/PendingOrders';

export const CartStep = (stepperData: PendingOrder) => {

    const cartTableBodyElement = () => {
        return stepperData.items.map((order) => {
            return [
                <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{order.description}</Text>,
                 <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">{order.price}</Text>
             ]
        })
        
    }

    const cartTableFooterElement = () => {
        return [
            <Text  key={"cartTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="med" color="gray-1">{stepperData.price}</Text>
        ]
    }

    return (
        <React.Fragment>
            <Table id="cartStepTable" body={cartTableBodyElement()} footer={cartTableFooterElement()}></Table>
        </React.Fragment>
    )
}

export const PaymentStep = (stepperData: PendingOrder) => {
    return (
        <p>this is the payment step</p>
    )
}