import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan';

export const PurchaseDataPaymentStep = (props: {stepperData: any; finalFunction: Function;setStepValidated: Function; handleThreeDSecureFail: () => void; billingInfo: BillingPageInfos; purchaseProducts: (recurlyToken: string, callback: Function) => Promise<void>; purchaseProducts3Ds: (recurlyToken: string, threeDSecureResultToken: string) => Promise<void>}) => {

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
            
            <NewPaymentMethodForm callback={() => {}} actionButton={props.finalFunction} handleThreeDSecureFail={props.handleThreeDSecureFail} billingInfo={props.billingInfo} recurlyFunction={props.purchaseProducts} purchasePlan3Ds={props.purchaseProducts3Ds} stepperData={props.stepperData} />
        
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