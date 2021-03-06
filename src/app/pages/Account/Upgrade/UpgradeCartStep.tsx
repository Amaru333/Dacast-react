import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Currency, Plan, Plans } from '../../../redux-flow/store/Account/Upgrade/types';
import { calculateDiscount, handleCurrencySymbol } from '../../../../utils/utils';
import { PlansName } from './FeaturesConst';
import { segmentService } from '../../../utils/services/segment/segmentService';
import { userToken } from '../../../utils/services/token/tokenService';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';
import { MultiCurrencyDropdown } from '../../../shared/Billing/MultiCurrencyDropdown';
import { calcTotalFeatures } from '../../../utils/utils';
import { dateAdd } from '../../../../utils/services/date/dateService';

interface UpgradeCartStepProps {
    stepperData: Plan;
    billingInfo: BillingPageInfos;
    planDetails: Plans;
    selectedCurrency: DropdownSingleListItem;
    updateStepperData: React.Dispatch<React.SetStateAction<Plan>>;
    setStepValidated: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<DropdownSingleListItem>>;
}

export const UpgradeCartStep = (props: UpgradeCartStepProps) => {
    if(props.stepperData.name.indexOf('scale') !== -1) {
        segmentService.track('Upgrade Form Completed', {
            action: 'Features Form Submitted',
            'user_id': userToken.getUserInfoItem('user-id'),
            'plan_name': props.stepperData.name,
            step: 2,
        })
    }

    const totalFeatures = calcTotalFeatures(props.stepperData.privileges.filter(p => p.checked).map(p => {return {price: p.price, quantity: p.quantity}}), props.selectedCurrency.data.id as Currency)
    const planPrice: number = calculateDiscount(props.stepperData.price[props.selectedCurrency.data.id as Currency], props.stepperData.discount)
    const totalPrice: number = calculateDiscount(((props.stepperData.price[props.selectedCurrency.data.id as Currency]) + totalFeatures), props.stepperData.discount)
    const currencySymbol = handleCurrencySymbol(props.selectedCurrency.data.id)

    React.useEffect(() => { props.setStepValidated(true) }, [props.stepperData])

    const setPlanLength = (length: string) => {
        if (length === 'Monthly') {
            props.updateStepperData({ ...props.planDetails.scalePlanMonthly, selectedScalePlan: props.stepperData.selectedScalePlan, privilegesTotal: props.stepperData.privilegesTotal, privileges: props.stepperData.privileges })
        } else if (length === 'Annually') {
            props.updateStepperData({ ...props.planDetails.scalePlanAnnual, selectedScalePlan: props.stepperData.selectedScalePlan,  privilegesTotal: props.stepperData.privilegesTotal, privileges: props.stepperData.privileges })
        }
    }


    const cartTableBodyElement = () => {
        return [
            {
                data: [
                    <Text key="cartTablePlanHeading" size={14} weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                    <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14} weight="reg" color="gray-1">{(props.stepperData.name === "Starter" || props.stepperData.name === 'Event') ? currencySymbol + (props.stepperData.price[props.selectedCurrency.data.id as Currency]) + ' /yr' : currencySymbol + (props.stepperData.paymentTerm === 1 ? props.stepperData.price[props.selectedCurrency.data.id as Currency] : (props.stepperData.price[props.selectedCurrency.data.id as Currency] /12)) + ' /mo'}</Text>
                ]
            },
            {
                data: [
                    <Text key="cartTableFeaturesHeading" size={14} weight="med" color="gray-1">Features</Text>,
                    <Text className='right pr2' key="cartTableFeaturesTotal" size={14} weight="reg" color="gray-1">{currencySymbol + totalFeatures + ' /yr'}</Text>
                ]
            }
        ]
    }

    const cartDropdownOption = () => {
        if (props.stepperData.paymentTerm === 12) {
            return [
                {
                    data: [
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Billed</Text>,
                        props.stepperData.name.includes("Scale") ?
                            <div >

                                <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' list={[{title: 'Annually'}, {title: 'Monthly'}]} callback={(value: DropdownSingleListItem) => setPlanLength(value.title as 'Annually' | 'Monthly')} dropdownDefaultSelect={{title: "Annually"}} />
                            </div>
                            :
                            <Text className='right pr2' key="cartTableBilledFrequency" size={14} weight="reg" color="gray-1">Annually</Text>,
                    ]
                }
            ]
        }

        if (props.stepperData.paymentTerm === 1 && props.stepperData.commitment === 3) {
            return [
                {
                    data: [
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Billed</Text>,
                        props.stepperData.name.includes("Scale") ?
                            <div >

                                <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' list={[{title: 'Annually'}, {title: 'Monthly'}]} callback={(value: DropdownSingleListItem) => setPlanLength(value.title as 'Annually' | 'Monthly')} dropdownDefaultSelect={{title: "Monthly"}} />
                            </div>
                            :
                            <Text className='right pr2' key="cartTableBilledFrequency" size={14} weight="med" color="gray-1">Annually</Text>,
                    ]
                },
                {
                    data: [
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Monthly from {dateAdd(new Date(), 'month', 3).toLocaleDateString()} </Text>,
                        <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="reg" color="gray-1">{currencySymbol + ((planPrice) + (totalFeatures))}</Text>
                    ]
                }

            ]
        }
        return [
            {
                data: [
                    <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Billed</Text>,
                    props.stepperData.name.includes("Scale") ?
                        <div >

                            <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' list={[{title: 'Annually'}, {title: 'Monthly'}]} callback={(value: DropdownSingleListItem) => setPlanLength(value.title as 'Annually' | 'Monthly')} dropdownDefaultSelect={{title: "Monthly"}} />
                        </div>
                        :
                        <Text className='right pr2' key="cartTableBilledFrequency" size={14} weight="med" color="gray-1">Annually</Text>,
                ]
            }
        ]

    }

    const cartTableFooterElement = () => {
        if (props.stepperData.paymentTerm === 12) {
            return [
                <Text key={"cartTableFooterTotal"} size={14} weight="med" color="gray-1">Total Pay Now</Text>,
                <div className="flex items-center right">
                    {props.stepperData.name === 'Annual Scale' &&
                        <Label className="mr2" color='green' backgroundColor='green20' label={props.stepperData.discount + '% Discount Applied'} />
                    }
                    <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{currencySymbol + totalPrice.toLocaleString()}</Text>
                </div>

            ]
        }
        return [
            <Text key={"cartTableFooterTotal"} size={14} weight="med" color="gray-1">Total Pay Now&nbsp;</Text>,
            <div className="flex items-center right">
                {
                    props.stepperData.commitment === 3 && <Label className="mr2" color='green' backgroundColor='green20' label="3 Months Upfront" />
                }
                <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{props.stepperData.commitment === 3 ? currencySymbol + (planPrice * 3) : currencySymbol + (planPrice + totalFeatures)}</Text>
            </div>
        ]
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
            <Table id='thirdStep' headerBackgroundColor="gray-10" body={cartTableBodyElement()} />
            <Table id='thirdStepTotal' className='tableOverflow' customClassName=' tableOverflow' headerBackgroundColor="gray-10" body={cartDropdownOption()} footer={cartTableFooterElement()} noScroll/>
        </div>
    )
}
