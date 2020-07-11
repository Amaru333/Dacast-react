import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { IconStyle } from '../../../../shared/Common/Icon';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { handleDataPrice } from '../../../../utils/utils';

export const PurchaseDataCartStep = (props: {stepperData: any; updateStepperData: Function; setStepValidated: Function}) => {

    const [dataPrice, setDataPrice] = React.useState<number>(null)
    const [dataAmount, setDataAmount] = React.useState<number>(null)

    React.useEffect(() => {
        props.setStepValidated(dataAmount && dataAmount < 100000)
    }, [props.stepperData])

    React.useEffect(() => {
        props.updateStepperData({...props.stepperData, totalPrice: (dataPrice * dataAmount)})
    }, [dataAmount])


    const cartTableBodyElement = () => {
        return [
            {
                data: [
                    <Text size={14}>Price per GB</Text>,
                    <Text className="right pr2" size={14}>{(dataAmount && dataAmount < 100000) ? `$ ${dataPrice}` : null }</Text>
                ]
            }
        ]
    }

    const cartTableFooterElement = () => {
        return [
            <Text size={14} weight="med">Total Pay Now</Text>,
            <Text className="right pr2" weight="med" size={14}>{(dataAmount && dataAmount < 100000) ? `$ ${(dataPrice * dataAmount).toFixed(2)}` : null }</Text>
        ]
    }

    return (
        <div className="col col-12 flex flex-column">
            <Input type="number" className="col col-6 mb1" label="Amount in Gigabytes (GB)" isError={dataAmount > 99999} help={dataAmount > 99999 && "Contact us for purchases over 100,000 GB"} onChange={(event) => {handleDataPrice(parseInt(event.currentTarget.value), setDataAmount, setDataPrice);props.updateStepperData({...props.stepperData, dataAmount: event.currentTarget.value})}} />
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

export const PurchaseDataPaymentStep = (props: {stepperData: any}) => {

    const paymentTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>},
            {cell: <Text className="right mr2"  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">${(props.stepperData.totalPrice).toFixed(2)}</Text>}
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