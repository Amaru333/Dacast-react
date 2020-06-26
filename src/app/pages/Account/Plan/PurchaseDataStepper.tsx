import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { IconStyle } from '../../../../shared/Common/Icon';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';

export const PurchaseDataCartStep = () => {

    const cartTableBodyElement = () => {
        return [
            {
                data: [
                    <Text size={14}>Price per GB</Text>,
                    <Text className="right pr2" size={14}>$0.12</Text>
                ]
            }
        ]
    }

    const cartTableFooterElement = () => {
        return [
            <Text size={14} weight="med">Total Pay Now</Text>,
            <Text className="right pr2" weight="med" size={14}>$720</Text>
        ]
    }

    return (
        <div className="col col-12 flex flex-column">
            <Input className="col col-6 mb1" label="Amount in Gigabytes (GB)" />
            <div className="col col-12">
            <Table id="PurchaseDataCart" headerBackgroundColor="gray-10" body={cartTableBodyElement()} footer={cartTableFooterElement()} />
            </div>
            <div className="flex mt1">
                <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                <Text  size={14} weight="reg">Need help with purchasing additional data? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
            
        </div>
    )
}

export const PurchaseDataPaymentStep = () => {

    const paymentTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>},
            {cell: <Text className="right mr2"  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">$750</Text>}
        ]}
    }

    return (
        <div>
            <Table id='PurchaseDataPayment' headerBackgroundColor="gray-10" header={paymentTableHeaderElement()}/>
            
            <NewPaymentMethodForm callback={() => console.log()} actionButton={() => {}} handleThreeDSecureFail={() => {}} />
        
            <div className="mt2 mb1">
                <Text className="mt2" size={12} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            </div>
            
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={true}  onChange={() => {}} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>                   
                </div>
            </div>
        </div>
    )
}