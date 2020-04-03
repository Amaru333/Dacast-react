import React from 'react';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Table } from '../../../components/Table/Table';
import { Text } from '../../../components/Typography/Text';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { NewPaymentMethodForm } from '../../shared/Billing/NewPaymentMethodForm';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../public/assets/paypal_logo.svg');
import { RecurlyProvider, Elements } from '@recurly/react-recurly';

export const PurchaseStepperCartStep = () => {

    const purchaseStepperCartTableBody = () => {
        return [
            {data: [
                <Text size={14} weight="reg">GBs</Text>,
                <Text size={14} weight="reg">60</Text>,
            ]},
            {data: [
                <Text size={14} weight="reg">Price per GB</Text>,
                <Text size={14} weight="reg">$2.25</Text>,
            ]}
        ]
    }

    const purchaseStepperCartTableFooter = () => {
        return [
            
            <Text size={14} weight="med">Total Pay Now</Text>,
            <Text size={14} weight="med">$135</Text>,
            
        ]
    }

    return(
        <div className="col col-12">
            <DropdownSingle className="col col-6 mb2" id="purchaseStepperAmountDropdown" dropdownTitle="Amount" list={{"10 GB": false, "20 GB": false, "60 GB": false}} />
            <div className="col col-12">
                <Table id="purchaseStepperCartTable" headerBackgroundColor="gray-10" body={purchaseStepperCartTableBody()} footer={purchaseStepperCartTableFooter()}  />
            </div>
            
        </div>
    )
}

export const PurchaseStepperPaymentStep = (props: {stepperData: string, callback: Function, finalFunction: Function}) => {

    const purchaseStepperPaymentTotalHeader = () => {
        return  {data: [
            {cell: <Text  key={"purchaseStepperPaymentTotalHeaderText"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>},
            {cell: <Text  key={"purchaseStepperPaymentTotalHeaderNumber"} className='right mr2' size={14}  weight="med" color="gray-1">$135</Text>}
        ]}    
    }

    const purchaseStepperPaymentMethodHeader = () => {
        switch (props.stepperData) {
            case "card":
                return {data: [
                    {cell: <Text  key={"purchaseStepperPaymentMethodHeaderText"} size={14}  weight="med" color="gray-1">Paying by Card</Text>},
                    {cell: <img key={"purchaseStepperPaymentMethodHeaderImg"} className='right mr2' src={CardLogo} />}
                ]}
            case "paypal":
                return {data: [
                    {cell: <Text  key={"purchaseStepperPaymentMethodHeaderText"} size={14}  weight="med" color="gray-1">Paying with PayPal</Text>},
                    {cell: <img key={"purchaseStepperPaymentMethodHeaderImg"} className='right mr2' src={PaypalLogo} />}
                ]}
        }
    }

    const purchaseStepperPaymentMethodBody = () => {
        switch (props.stepperData) {
            case "card":
                return [{data: [
                    <Text  key={"step2PCreditCardBodyText"} size={14}  weight="med" color="gray-1">Card ending with 0009</Text>,
                    <Text  className='right mr2' key={"step2PCreditCardBodyTextExpiry"} size={14}  weight="med" color="gray-1">03/2020</Text>
                ]}]
            case "paypal":
                return [{data: [
                    <Text  key={"step2PCreditCardBodyText"} size={14}  weight="reg" color="gray-1">When you click purchase, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast.</Text>,
                    <></>
                ]}]
        }
        
    }

    return(
        <div className="col col-12">
            <div>
                <Table id="purchaseStepperPaymentTotalTable" headerBackgroundColor="gray-10" header={purchaseStepperPaymentTotalHeader()} />
            </div>
            
            {
                props.stepperData === "none" ? 
                <RecurlyProvider publicKey="ewr1-hgy8aq1eSuf8LEKIOzQk6T">
                    <Elements>
                    <NewPaymentMethodForm callback={props.callback} actionButton={props.finalFunction} />
                    </Elements>
                </RecurlyProvider>              
                    : 
                    <div>
                        <Table id="purchaseStepperPaymentMethodTable" headerBackgroundColor="gray-10" header={purchaseStepperPaymentMethodHeader()} body={purchaseStepperPaymentMethodBody()} />
                        <Text size={12}>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
                    </div>
            }
            
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>                   
                </div>
            </div>
        </div>
    )
}