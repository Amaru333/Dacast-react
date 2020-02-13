import React from 'react';
import { Text } from "../../../components/Typography/Text"
import { Table } from '../../../components/Table/Table';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { PendingOrder } from '../../../redux-flow/store/Account/PendingOrders/types';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');

export const CartStep = (stepperData: PendingOrder) => {

    React.useEffect(() => {}, [stepperData])

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

export const PaymentStep = (stepperData: PendingOrder, setStepValidated: Function) => {

    React.useEffect(() => {
        setStepValidated(false)
    }, [])

    const paymentStepheader = () => {
        return  [
            <Text  key={"paymentStepheaderText"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text  key={"paymentStepheaderNumber"} className='right mr2' size={14}  weight="med" color="gray-1">{'$' + stepperData.price}</Text>
        ]
    }

    const paymentStepCreditCardTableHeader = () => {
        return [
            <Text  key={"paymentStepPCardTableHeaderText"} size={14}  weight="med" color="gray-1">Paying by Card</Text>,
            <img key={"paymentStepCardTableHeaderImg"} className='right mr2' src={CardLogo} />
        ]
    }
    const paymentStepCreditCardTableBody = () => {
        return [[
            <Text  key={"paymentStepPCreditCardBodyText"} size={14}  weight="med" color="gray-1">Card ending with 0009</Text>,
            <Text  className='right mr2' key={"paymentStepPCreditCardBodyTextExpiry"} size={14}  weight="med" color="gray-1">03/2020</Text>,

        ]]
    }
    return (
        <div>
            <Table className='my2' id='paymentStepTotalTable' header={paymentStepheader()}/>
            <Table className='my2' id='paymentStepPaymentMethodTable' header={paymentStepCreditCardTableHeader()} body={paymentStepCreditCardTableBody()} />
            <Text size={14} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            <div className='py2 col col-12'>
                <InputCheckbox className='col col-1' id={'chekboxTC'} key={'chekboxTC'}  />
                <Text className='col col-11' size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>
            </div>
        </div>
    )
}