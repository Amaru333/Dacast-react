import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Plan, Plans, Privilege } from '../../../redux-flow/store/Account/Upgrade/types';
import { calculateDiscount } from '../../../../utils/utils';
import { PlansName } from './FeaturesConst';
import { segmentService } from '../../../utils/services/segment/segmentService';
import { userToken } from '../../../utils/services/token/tokenService';
import { BillingPageInfos } from '../../../redux-flow/store/Account/Plan/types';
import { dateAdd } from '../../../../utils/services/date/dateService';

export const UpgradeCartStep = (props: { stepperData: Plan; updateStepperData: React.Dispatch<React.SetStateAction<Plan>>; setStepValidated: React.Dispatch<React.SetStateAction<boolean>>; billingInfo: BillingPageInfos, planDetails: Plans }) => {
    if(props.stepperData.name.indexOf('scale') !== -1) {
        segmentService.track('Upgrade Form Completed', {
            action: 'Features Form Submitted',
            'user_id': userToken.getUserInfoItem('custom:dacast_user_id'),
            'plan_name': props.stepperData.name,
            step: 2,
        })  
    }
    const isFirstPurchase = (props.stepperData.name === "Starter" && !props.billingInfo.currentPlan.planCode)

    const [featuresTotal, setFeaturesTotal] = React.useState<number>(props.stepperData.privilegesTotal)
    const planPrice: number = calculateDiscount(props.stepperData.price.usd / 100, props.stepperData.discount)
    const totalPrice: number = calculateDiscount(((props.stepperData.price.usd / 100) + featuresTotal), props.stepperData.discount)
    const [newSelectedPrivileges, setNewSelectedPrivileges] = React.useState<Privilege[]>([])
    

    React.useEffect(() => { props.setStepValidated(true) }, [props.stepperData])

    React.useEffect(() => {
        setNewSelectedPrivileges(props.stepperData.privileges.filter((item: Privilege) => {
            if(props.stepperData.selectedPrivileges){
                return props.stepperData.selectedPrivileges.indexOf(item.code) > -1
            }
        }))
        props.updateStepperData({...props.stepperData, privileges: props.stepperData.privileges.map((item: Privilege) => {
            if(props.stepperData.selectedPrivileges && props.stepperData.selectedPrivileges.indexOf(item.code) > -1){
                return {...item, checked: true}
            } 
            return item
            
        })})
    }, [props.stepperData.paymentTerm])

React.useEffect(() => {
    let subTotal = 0
    newSelectedPrivileges.map((item: Privilege) => {
        if(props.stepperData.name !== "Starter" || !isFirstPurchase) {
            subTotal += (item.price.usd / 100)
        }
        setFeaturesTotal(subTotal)
    })

}, [newSelectedPrivileges])

    const setPlanLength = (length: string) => {
        if (length === 'Monthly') {
            props.updateStepperData({ ...props.planDetails.scalePlanMonthly, selectedScalePlan: props.stepperData.selectedScalePlan, privilegesTotal: props.stepperData.privilegesTotal, selectedPrivileges: props.stepperData.selectedPrivileges })
        } else if (length === 'Annually') {
            props.updateStepperData({ ...props.planDetails.scalePlanAnnual, selectedScalePlan: props.stepperData.selectedScalePlan,  privilegesTotal: props.stepperData.privilegesTotal, selectedPrivileges: props.stepperData.selectedPrivileges })
        }
    }


    const cartTableBodyElement = () => {

        if (props.stepperData.name === "Event" ) {
            return [
                {
                    data: [
                        <Text key="cartTablePlanHeading" size={14} weight="med" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                        <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14} weight="reg" color="gray-1">{'$' + (props.stepperData.price.usd/100) + ' /yr'}</Text>
                    ]
                },
                {
                    data: [
                        <Text key="cartTableFeaturesHeading" size={14} weight="med" color="gray-1">Features</Text>,
                        <Text className='right pr2' key="cartTableFeaturesTotal" size={14} weight="reg" color="gray-1">{'$' + featuresTotal + ' /yr'}</Text>
                    ]
                }
            ]
        }
        return [
            {
                data: [
                    <Text key="cartTablePlanHeading" size={14} weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                    <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14} weight="reg" color="gray-1">{(props.stepperData.name === "Starter") ? '$' + (props.stepperData.price.usd/100) + ' /yr' : '$' + (props.stepperData.paymentTerm === 1 ? props.stepperData.price.usd/100 : (props.stepperData.price.usd/12)/100) + ' /mo'}</Text>
                ]
            }]
    }

    const cartDropdownOption = () => {
        if (props.stepperData.paymentTerm === 12) {
            return [
                {
                    data: [
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Billed</Text>,
                        props.stepperData.name.includes("Scale") ?
                            <div >

                                <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => setPlanLength(value)} list={['Annually', 'Monthly']} dropdownDefaultSelect={"Annually"} />
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

                                <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => setPlanLength(value)} list={['Annually', 'Monthly']} dropdownDefaultSelect={"Monthly"} />
                            </div>
                            :
                            <Text className='right pr2' key="cartTableBilledFrequency" size={14} weight="med" color="gray-1">Annually</Text>,
                    ]
                },
                {
                    data: [
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Monthly from { dateAdd(new Date(), 'month', 3).toLocaleDateString()} </Text>,
                        <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="reg" color="gray-1">{props.stepperData.privilegesTotal ? '$' + ((planPrice) + (featuresTotal)) : '$' + (planPrice)}</Text>
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

                            <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => setPlanLength(value)} list={['Annually', 'Monthly']} dropdownDefaultSelect={"Monthly"} />
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
                    <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{props.stepperData.name !== 'Annual Scale' ? '$' + totalPrice.toLocaleString() : '$' + planPrice.toLocaleString()}</Text>
                </div>

            ]
        }
        return [
            <Text key={"cartTableFooterTotal"} size={14} weight="med" color="gray-1">Total Pay Now&nbsp;</Text>,
            <div className="flex items-center right">
                {
                    props.stepperData.commitment === 3 && <Label className="mr2" color='green' backgroundColor='green20' label="3 Months Upfront" /> 
                }
                <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{props.stepperData.commitment === 3 ? '$' + (planPrice * 3) : (props.stepperData.name !== 'Monthly Scale' ? "$" + (planPrice + featuresTotal) : "$" + planPrice)}</Text>
            </div>
        ]
    }

    return (
        <div>
            <Table id='thirdStep' headerBackgroundColor="gray-10" body={cartTableBodyElement()} />
            <Table id='thirdStepTotal' className='tableOverflow' customClassName=' tableOverflow' headerBackgroundColor="gray-10" body={cartDropdownOption()} footer={cartTableFooterElement()} />
        </div>
    )
}