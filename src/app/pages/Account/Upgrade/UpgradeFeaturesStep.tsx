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
import { InputCounter } from '../../../../components/FormsComponents/Input/InputCounter';

interface UpgradeFeaturesStepProps { 
    stepperData: Plan; 
    billingInfo: BillingPageInfos;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; 
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; 
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const UpgradeFeaturesStep = (props: UpgradeFeaturesStepProps) => {

    const availableAddOns = ["ads", "paywall", "phone-support", "extra-seats"]
    const isFreeAddOnTrial = (props.stepperData.name === "Starter" && !props.billingInfo.currentPlan.planCode)
    const nbPlanSeats = props.stepperData.allowances.find(a => a.code === props.stepperData.allowanceCode).seats
    const extraSeatAddOnLocked = props.billingInfo.currentPlan.displayName === '30 Day Trial' && props.billingInfo.currentPlan.nbSeats > 0 || 
    props.billingInfo.currentPlan.displayName !== '30 Day Trial' && props.billingInfo.currentPlan.nbSeats > nbPlanSeats
    const minMuaExtraSeats = props.billingInfo.currentPlan.nbSeats - (props.stepperData.allowances.find(a => a.code === props.stepperData.allowanceCode).seats) > 0 ? props.billingInfo.currentPlan.nbSeats - (props.stepperData.allowances.find(a => a.code === props.stepperData.allowanceCode).seats) : 0
    const [additionalSeats, setAdditionalSeats] = React.useState<number>(props.stepperData.privileges.find(p => p.code === 'extra-seats') && props.stepperData.privileges.find(p => p.code === 'extra-seats').quantity ? props.stepperData.privileges.find(p => p.code === 'extra-seats').quantity : minMuaExtraSeats)

    React.useEffect(() => {
        if(extraSeatAddOnLocked) {
            props.updateStepperData({
                ...props.stepperData,
                privileges: props.stepperData.privileges.map((privilege) => {
                    if (privilege.code === 'extra-seats') {
                        return { ...privilege, checked: true, quantity: additionalSeats }
                    }
                    return privilege
                })
            })
        }
    }, [extraSeatAddOnLocked])

    React.useEffect(() => {
        props.updateStepperData({
            ...props.stepperData,
            privileges: props.stepperData.privileges.map((privilege) => {
                if (privilege.code === 'extra-seats') {
                    return { ...privilege, checked: privilege.checked, quantity: additionalSeats }
                }
                return privilege
            })
        })
    }, [additionalSeats])

    const handleAddOnNames = (addOn: string) => {
        switch(addOn){
            case "ads":
                return "Advertising"
            case "paywall":
                return "Paywall"
            case "phone-support": 
                return "24/7 Phone Support"
            case "extra-seats":
                return "Extra Seats"
            default: 
            return null
        }
    }

    const renderFeatureTableRow = (item: Privilege) => {
        if(item.code === 'extra-seats') {
            return [
                <div className='flex flex-column'>
                    <div className='flex'>
                        <InputCheckbox
                            className="mr1"
                            id={'chekbox' + item.code}
                            key={'secondStepCheckbox' + item.code}
                            defaultChecked={extraSeatAddOnLocked ? extraSeatAddOnLocked : item.checked}
                            disabled={extraSeatAddOnLocked}
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
                        <Text key={'secondStepText' + item.code} size={14} weight='reg' color='gray-1'>{handleAddOnNames(item.code)}</Text>&nbsp;
                        <Text color='gray-3'>({nbPlanSeats} Seats Included in Plan)</Text>
                    </div>
                    {(props.stepperData.privileges.find(p => p.code === item.code).checked || extraSeatAddOnLocked) && 
                        <div className='my2 ml2'>
                            <InputCounter counterValue={additionalSeats} setCounterValue={setAdditionalSeats} minValue={minMuaExtraSeats}/>
                        </div>
                    }
                </div>,
                <div className="right mr2 flex flex-column">
                    <Text key={'secondStepPrice' + item.code} size={14} weight='reg' color={props.stepperData.privileges.find(p => p.code === item.code).checked ? 'gray-3' : 'gray-1'}>{isFreeAddOnTrial ? "6 Months Trial" : handleCurrencySymbol(props.selectedCurrency.data.id) + (item.price[props.selectedCurrency.data.id as Currency]).toLocaleString() + "/yr per seat"}</Text>
                    {(props.stepperData.privileges.find(p => p.code === item.code).checked || extraSeatAddOnLocked) && <Text className='flex justify-end right py2'>{handleCurrencySymbol(props.selectedCurrency.data.id) + (item.price[props.selectedCurrency.data.id as Currency] * additionalSeats).toLocaleString() + "/yr"}</Text>}
                </div>
            ]
        }

        return [
            <div className='flex'>
                <InputCheckbox
                    className="mr1"
                    id={'chekbox' + item.code}
                    key={'secondStepCheckbox' + item.code}
                    defaultChecked={item.checked}
                    disabled={extraSeatAddOnLocked}
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
                <Text key={'secondStepPrice' + item.code} size={14} weight='reg' color={'gray-1'}>{isFreeAddOnTrial ? "6 Months Trial" : handleCurrencySymbol(props.selectedCurrency.data.id) + (item.price[props.selectedCurrency.data.id as Currency]).toLocaleString() + "/yr"}</Text>
            </div>
        ]
    }

    const featuresTableBody = () => {
        return props.stepperData.privileges && props.stepperData.privileges.filter(item => availableAddOns.includes(item.code)).map((item: Privilege) => {
            return {
                data: renderFeatureTableRow(item)
            }
        })
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
            <Text size={14} weight='reg' color='gray-3'>Add additional Features to your {PlansName[props.stepperData.name]}</Text>
            <Table id='secondStepFeatureTable' headerBackgroundColor="gray-10" body={featuresTableBody()} />
        </div>
    )
}