import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Currency, Plan } from '../../../redux-flow/store/Account/Upgrade/types';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { calculateDiscount, handleCurrencySymbol } from '../../../../utils/utils';
import { segmentService } from '../../../utils/services/segment/segmentService';
import { userToken } from '../../../utils/services/token/tokenService';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiCurrencyDropdown } from '../../../shared/Billing/MultiCurrencyDropdown';
import { calcTotalFeatures } from '../../../utils/utils';

interface UpgradePaymentStepProps { 
    stepperData: Plan; 
    billingInfo: BillingPageInfos;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; 
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; 
    finalFunction: () => void; 
    purchasePlan: (recurlyToken: string, threeDSecureToken: string, callback: React.Dispatch<React.SetStateAction<string>>) => Promise<void>; 
    purchasePlan3Ds: (recurlyToken: string, threeDSecureResultToken: string) => Promise<void>; 
    handleThreeDSecureFail: () => void; 
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const UpgradePaymentStep = (props: UpgradePaymentStepProps) => {

    segmentService.track('Upgrade Form Completed', {
        action: 'Cart Form Submitted',
        'user_id': userToken.getUserInfoItem('user-id'),
        'plan_name': props.stepperData.name,
        step: 3,
    })  
    const planPrice: number = calculateDiscount(props.stepperData.price[props.selectedCurrency.data.id as Currency], props.stepperData.discount)
    const featuresTotal: number = calcTotalFeatures((props.stepperData.name !== "Starter" || !(props.stepperData.name === "Starter" && !props.billingInfo.currentPlan.planCode)) ? props.stepperData.privileges.filter(p => p.checked).map(p => p.price) : [], props.selectedCurrency.data.id as Currency)
    const totalPrice: number = calculateDiscount((props.stepperData.price[props.selectedCurrency.data.id as Currency]) + featuresTotal, props.stepperData.discount)

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.termsAndConditions)
    }, [props.stepperData.termsAndConditions])

    
    const step2header = () => {

        return {
            data: [
                { cell: <Text key={"step2headerText"} size={14} weight="med" color="gray-1">Total Pay Now</Text> },
                props.stepperData.name === 'Annual Scale' ?
                    { cell: <Text key={"step2headerNumber"} className='right mr2' size={14} weight="med" color="gray-1">{ handleCurrencySymbol(props.selectedCurrency.data.id) + planPrice}</Text> }
                    :
                    { cell: <Text key={"step2headerNumber"} className='right mr2' size={14} weight="med" color="gray-1">{props.stepperData.commitment === 3 ? handleCurrencySymbol(props.selectedCurrency.data.id) + ((planPrice)) * 3 : handleCurrencySymbol(props.selectedCurrency.data.id) + totalPrice}</Text> }

            ]
        }
    }


    return (
        <div>
            <div style={{position: 'absolute', right: 24, top: 24}}>
                <MultiCurrencyDropdown 
                    id='multiCurrencyDropdownPurchaseStepper'
                    defaultCurrency={props.selectedCurrency} 
                    currenciesList={props.stepperData.price} 
                    callback={props.setSelectedCurrency}
                />
            </div>
            <Table id='extraStepperStep2TotalTable' headerBackgroundColor="gray-10" header={step2header()} />

            <NewPaymentMethodForm callback={() => {}} actionButton={props.finalFunction} recurlyFunction={props.purchasePlan} purchasePlan3Ds={props.purchasePlan3Ds} handleThreeDSecureFail={props.handleThreeDSecureFail} stepperData={props.stepperData} billingInfo={props.billingInfo} />

            <div className="mt2 mb1">
                <Text className="mt2" size={12} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            </div>

            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={props.stepperData.termsAndConditions} onChange={() => { props.updateStepperData({ ...props.stepperData, termsAndConditions: !props.stepperData.termsAndConditions }) }} />
                <div className='col col-11 flex'>
                    <Text size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a target="_blank" href="https://www.dacast.com/terms-of-service/">Terms and Conditions.</a></Text>
                </div>
            </div>
        </div>
    )
}