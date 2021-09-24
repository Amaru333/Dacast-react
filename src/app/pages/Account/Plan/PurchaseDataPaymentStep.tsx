import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { BandWidthProduct, BandwidthProductCurrency, BillingPageInfos, Extras } from '../../../redux-flow/store/Account/Plan';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiCurrencyDropdown } from '../../../shared/Billing/MultiCurrencyDropdown';
import { handleCurrencySymbol } from '../../../../utils/utils';
import { Trans, useTranslation } from 'react-i18next';

interface PurchaseDataPaymentStepProps {
    stepperData: Extras; 
    billingInfo: BillingPageInfos;    
    bandwidthProduct: BandWidthProduct;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Extras>>; 
    finalFunction: () => void; 
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; 
    handleThreeDSecureFail: () => void; 
    purchaseProducts: (recurlyToken: string, callback: Function) => Promise<void>; 
    purchaseProducts3Ds: (recurlyToken: string, threeDSecureResultToken: string) => Promise<void>;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const PurchaseDataPaymentStep = (props: PurchaseDataPaymentStepProps) => {

    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = React.useState<boolean>(false)
    const { t } = useTranslation()

    React.useEffect(() => {
        props.setStepValidated(termsAndConditionsChecked)
    })

    const paymentTableHeaderElement = () => {
        return {data: [
            {cell: <Text  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">{t('account_plan_modal_pay_now_text')}</Text>},
            {cell: <Text className="right mr2"  key={"paymentTablePayNow"} size={14}  weight="med" color="gray-1">{handleCurrencySymbol(props.selectedCurrency.data.id) + (props.stepperData.totalPrice).toFixed(2)}</Text>}
        ]}
    }

    return (
        <div>
            <div style={{position: 'absolute', right: 24, top: 24}}>
                {/* <MultiCurrencyDropdown 
                    defaultCurrency={props.selectedCurrency} 
                    currenciesList={props.bandwidthProduct.eventBw10to100TB.unitPrice} 
                    callback={(value: DropdownSingleListItem) => {props.setSelectedCurrency(value);props.updateStepperData({...props.stepperData, totalPrice: props.bandwidthProduct[props.stepperData.code].unitPrice[value.data.id as BandwidthProductCurrency] * props.stepperData.quantity})}}
                /> */}
            </div>
            <Table id='PurchaseDataPayment' headerBackgroundColor="gray-10" header={paymentTableHeaderElement()}/>
            
            <NewPaymentMethodForm callback={() => {}} actionButton={props.finalFunction} handleThreeDSecureFail={props.handleThreeDSecureFail} billingInfo={props.billingInfo} recurlyFunction={props.purchaseProducts} purchasePlan3Ds={props.purchaseProducts3Ds} stepperData={props.stepperData} />
        
            <div className="mt2 mb1">
                <Text className="mt2" size={12} weight='reg' color='gray-3'>{t('account_plan_modal_change_payment_info_text')}</Text>
            </div>
            
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} onChange={() => setTermsAndConditionsChecked(!termsAndConditionsChecked)} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'><Trans i18nKey='account_plan_modal_terms_text'>By purchasing this product I acknowledge and accept the <a target="_blank" href="https://www.dacast.com/terms-of-service/">Terms and Conditions.</a></Trans></Text>                   
                </div>
            </div>
        </div>
    )
}