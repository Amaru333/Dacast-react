import React from 'react';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { IconStyle } from '../../../../shared/Common/Icon';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';

export const PurchaseDataCartStep = (props: {stepperData: any; updateStepperData: Function; setStepValidated: Function; }) => {

    const [dataPrice, setDataPrice] = React.useState<number>(props.stepperData? props.stepperData.dataPrice : null)
    const [dataAmount, setDataAmount] = React.useState<number>(props.stepperData? props.stepperData.quantity : null)

    React.useEffect(() => {
        props.setStepValidated(dataAmount && dataAmount < 100000 && dataAmount > 999)
    }, [props.stepperData])

    React.useEffect(() => {
        if(dataAmount <= 4999 ){
            props.updateStepperData({...props.stepperData, code: "eventBw1to4TB", totalPrice: (dataPrice * dataAmount), dataPrice: dataPrice})
        } else if(dataAmount >= 5000 && dataAmount <= 9999){
            props.updateStepperData({...props.stepperData, code: "eventBw5to10TB", totalPrice: (dataPrice * dataAmount), dataPrice: dataPrice})
        } else {
            props.updateStepperData({...props.stepperData, code: "eventBw10to100TB", totalPrice: (dataPrice * dataAmount), dataPrice: dataPrice})
        }
    }, [dataAmount])

    const handleInputError = (dataAmount: number) => {
        if(dataAmount === null) { 
            return null;
        }
        if(dataAmount > 99999) {
            return "Contact us for purchases over 100,000 GB"
        } else if (dataAmount < 1000) {
            return "Purchases must be over 1TB"
        } else {
            return null
        }
    }


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

    const handleDataPrice = (data: number, setDataAmount: Function, setDataPrice: Function) => {
        setDataAmount(data)
        if(data <= 4999 ){
            setDataPrice(0.25)
        } else if(data >= 5000 && data <= 9999){
            setDataPrice(0.12)
        } else if(data >= 10000) {
            setDataPrice(0.09)
        } else {
            setDataPrice(null)
        }
    }

    return (
        <div className="col col-12 flex flex-column">
            <Input defaultValue={dataAmount} type="number" className="col col-6 mb1" label="Amount in Gigabytes (GB)" isError={dataAmount !== null && (dataAmount > 99999 || dataAmount < 1000)} help={handleInputError(dataAmount)} onChange={(event) => {handleDataPrice(parseInt(event.currentTarget.value), setDataAmount, setDataPrice);props.updateStepperData({...props.stepperData, quantity: parseInt(event.currentTarget.value)})}} />
            <div className="col col-12">
            <Table id="PurchaseDataCart" headerBackgroundColor="gray-10" body={cartTableBodyElement()} footer={cartTableFooterElement()} />
            </div>
            <div className="flex mt1">
                <IconStyle style={{marginRight: "10px"}}>info_outlined</IconStyle>
                <Text  size={14} weight="reg">Need help with purchasing additional data? Visit the <a href={getKnowledgebaseLink("Data")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
            </div>
            
        </div>
    )
}

export const PurchaseDataPaymentStep = (props: {stepperData: any; usefulFunctions: { [key: string]: any }; finalFunction: Function;setStepValidated: Function; }) => {

    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.setStepValidated(termsAndConditionsChecked)
    })

    const paymentTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>},
            {cell: <Text className="right mr2"  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">${(props.stepperData.totalPrice).toFixed(2)}</Text>}
        ]}
    }

    return (
        <div>
            <Table id='PurchaseDataPayment' headerBackgroundColor="gray-10" header={paymentTableHeaderElement()}/>
            
            <NewPaymentMethodForm callback={() => {}} actionButton={props.finalFunction} handleThreeDSecureFail={() => {}} billingInfo={props.usefulFunctions['billingInfo']} recurlyFunction={props.usefulFunctions['purchaseProducts']} stepperData={props.stepperData} />
        
            <div className="mt2 mb1">
                <Text className="mt2" size={12} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            </div>
            
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} onChange={() => setTermsAndConditionsChecked(!termsAndConditionsChecked)} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a target="_blank" href="https://www.dacast.com/terms-of-service/">Terms and Conditions.</a></Text>                   
                </div>
            </div>
        </div>
    )
}