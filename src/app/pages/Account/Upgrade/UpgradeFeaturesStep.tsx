import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { Currency, Plan, Privilege } from '../../../redux-flow/store/Account/Upgrade/types';
import { PlansName } from './FeaturesConst';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiCurrencyDropdown } from '../../../shared/Billing/MultiCurrencyDropdown';
import { handleCurrencySymbol } from '../../../../utils/utils';

interface UpgradeFeaturesStepProps { 
    stepperData: Plan; 
    billingInfo: BillingPageInfos;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; 
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; 
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const UpgradeFeaturesStep = (props: UpgradeFeaturesStepProps) => {

    const availableAddOns = ["ads", "paywall", "phone-support"]
    const isFreeAddOnTrial = (props.stepperData.name === "Starter" && !props.billingInfo.currentPlan.planCode)

    const handleAddOnNames = (addOn: string) => {
        switch(addOn){
            case "ads":
                return "Advertising"
            case "paywall":
                return "Paywall"
            case "phone-support": 
                return "24/7 Phone Support"
            default: 
            return null
        }
    }

    const featuresTableBody = () => {
        return props.stepperData.privileges && props.stepperData.privileges.filter(item => availableAddOns.includes(item.code)).map((item: Privilege) => {
            return {
                data: [
                    <div className='flex'>
                        <InputCheckbox
                            className="mr1"
                            id={'chekbox' + item.code}
                            key={'secondStepCheckbox' + item.code}
                            defaultChecked={item.checked}
                            onChange={() => {
                                props.updateStepperData({
                                    ...props.stepperData,
                                    privileges: props.stepperData.privileges.map((privilege) => {
                                        if (privilege.code === item.code) {
                                            return { ...privilege, checked: !privilege.checked }
                                        }
                                        return privilege
                                    })

                                })
                            }}
                        />
                        <Text key={'secondStepText' + item.code} size={14} weight='reg' color='gray-1'>{handleAddOnNames(item.code)}</Text>
                    </div>,
                    <div className="right mr2">
                        <Text key={'secondStepPrice' + item.code} size={14} weight='reg' color={'gray-1'}>{isFreeAddOnTrial ? "6 Months Trial" : handleCurrencySymbol(props.selectedCurrency.data.id) + (item.price[props.selectedCurrency.data.id as Currency] / 100).toLocaleString() + "/yr"}</Text>
                    </div>

                ]
            }
        })
    }

    // React.useEffect(() => {
    //         let subTotal = 0;
    //         let tempSelectedPrivileges: string[] = []
    //         props.stepperData.privileges.map((item: Privilege) => {
    //             if (item.checked) {
    //                 tempSelectedPrivileges.push(item.code)
    //                 if(props.stepperData.name !== "Starter" || !isFreeAddOnTrial) {
    //                     subTotal += (item.price.usd / 100)
    //                 }
    //             }
    //         props.updateStepperData({ ...props.stepperData, privilegesTotal: subTotal, selectedPrivileges: tempSelectedPrivileges })
    //     })
    //     props.setStepValidated(true)
    // }, [props.stepperData.privileges])

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
            <Text size={14} weight='reg' color='gray-3'>Add additional Features to your {PlansName[props.stepperData.name]}</Text>
            <Table id='secondStepFeatureTable' headerBackgroundColor="gray-10" body={featuresTableBody()} />
        </div>
    )
}