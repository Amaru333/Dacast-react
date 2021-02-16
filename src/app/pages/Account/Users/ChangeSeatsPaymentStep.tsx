import React from 'react';
import { Plan } from '../../../redux-flow/store/Account/Upgrade/types';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';

export const ChangeSeatsPaymentStep = (props: {stepperData: Plan; updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; planData: Plan; billingInfo: BillingPageInfos; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>;}) => {

    const extraSeatsPurchased = props.stepperData.seatChange > 0

    React.useEffect(() => {
        if(extraSeatsPurchased){
            props.setStepValidated(props.stepperData.termsAndConditions)
        }
    }, [props.stepperData.termsAndConditions])

    

    const paymentTotalHeaderElement = () => {
        return {
            data: [
                { cell: <Text key={"paymentTotalheaderText"} size={14} weight={extraSeatsPurchased ? "med" : "reg"} color="gray-1">{extraSeatsPurchased ? "Total Pay Now" : "Refund for Next Billing Cycle" }</Text> },
                { cell: <Text key={"paymentTotalheaderNumber"} className='right mr2' size={14} weight={extraSeatsPurchased ? "med" : "reg"} color={extraSeatsPurchased ? "dark-violet" : "gray-1"}>${props.stepperData.seatChange * 120}</Text> }
            ]
        }
    }

    const billingBodyElement = () => {
        return [
            {
                data: [
                    <Text key="totalDueNow" size={14} weight="med" color="gray-1">Total Due Now</Text>,
                    <Text className="right pr2" key="totalDueNowValue" size={14} weight="med" color="dark-violet">$0</Text>
                ]
            },
            {
                data: [
                    <Text key="annualBill" size={14} weight="med" color="gray-1">Annual Bill From 2nd Sep 2020</Text>,
                    <Text className="right pr2" key="annualBillValue" size={14} weight="med" color="gray-1">${(props.stepperData.price/100) + (120 * props.stepperData.seatChange)}</Text>
                ]
            }
        ]
    }

    return (
        <div>
            {
            extraSeatsPurchased ?
                <React.Fragment>
                    <Table id="paymentTotalTable" header={paymentTotalHeaderElement()} headerBackgroundColor="gray-10" />
                    <NewPaymentMethodForm callback={() => {}} actionButton={() => {}} recurlyFunction={() => {}} purchasePlan3Ds={() => {}} handleThreeDSecureFail={() => {}} stepperData={props.stepperData} billingInfo={props.billingInfo} />
                    <div className="mt2 mb1">
                        <Text className="mt2" size={12} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
                    </div>
                    <div className='py2 col col-12 flex flex-auto'>
                        <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={props.stepperData.termsAndConditions} onChange={() => { props.updateStepperData({ ...props.stepperData, termsAndConditions: !props.stepperData.termsAndConditions }) }} />
                        <div className='col col-11 flex'>
                            <Text size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a target="_blank" href="https://www.dacast.com/terms-of-service/">Terms and Conditions.</a></Text>
                        </div>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <Table id="refundTotalTable" header={paymentTotalHeaderElement()} headerBackgroundColor="white" />
                    <Table id="seatsBillingTable" body={billingBodyElement()} headerBackgroundColor="gray-10" />
                </React.Fragment>
            }
        </div>
        
    )
}