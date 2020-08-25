import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Plan, Privilege } from '../../../redux-flow/store/Account/Upgrade/types';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { calculateDiscount } from '../../../../utils/utils';
import { ScalePlanSelector, ScalePlanSelectorContents } from './Upgrade';
import { PlansName } from './FeaturesConst';


//PLAN
export const PlanStepperFirstStep = (props: { stepperData: Plan; updateStepperData: Function; setStepValidated: Function, usefulFunctions: { [key: string]: any } }) => {
    const [selectedPlan, setSelectedPlan] = React.useState<string>('ott')

    React.useEffect(() => {
        props.setStepValidated(true)
    }, [props.stepperData])

    React.useEffect(() => {
        if(selectedPlan === 'ott'){
            props.updateStepperData({ ...props.stepperData, selectedScalePlan: props.stepperData.allowances[0] })
        } else if(selectedPlan === 'live'){
            props.updateStepperData({ ...props.stepperData, selectedScalePlan: props.stepperData.allowances[1] })
        } else {
            props.updateStepperData({ ...props.stepperData, selectedScalePlan: props.stepperData.allowances[2] })
        }
    }, [props.stepperData.name, selectedPlan])

    const setPlanLength = (length: string) => {
        if (length === 'Monthly') {
            props.updateStepperData(props.usefulFunctions['planDetails'].scalePlanMonthly)
        } else if (length === 'Annually') {
            props.updateStepperData(props.usefulFunctions['planDetails'].scalePlanAnnual)
        }
    }

    const totalPriceTableFooter = () => {
        if (props.stepperData) {
            return props.stepperData.name === "Monthly Scale" ?
                (
                    [
                        <div className='flex items-center'>
                            <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Billed</Text>
                            <DropdownButton style={{ maxHeight: 30 }} className="ml1" id='planStepBillingFrequencyDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanLength(value)} dropdownDefaultSelect="Monthly"></DropdownButton>
                        </div>
                        ,
                        <Text key='totalPriceTableFooterValue' className='right pr2' size={14} weight='med' color='gray-3'>${(props.stepperData.price.usd / 100).toLocaleString()}</Text>
                    ]
                ) :
                (
                    [
                        <div className="flex items-center">
                            <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Billed</Text>
                            <DropdownButton style={{ maxHeight: 30 }} className="ml1 border-none" id='planStepBillingFrequencyDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => setPlanLength(value)} dropdownDefaultSelect="Annually"></DropdownButton>
                        </div>
                        ,
                        <div className="flex items-center right mr2">
                            <Label className="mr2" color='green' backgroundColor='green20' label={props.stepperData.discount + '% Discount Applied'} />
                            <Text key='totalPriceTableFooterValue' className='right' size={14} weight='med' color='gray-3'>${calculateDiscount(props.stepperData.price.usd / 100, props.stepperData.discount).toFixed(2)}</Text>
                        </div>

                    ]
                )
        }

    }

    return (
        <div>

            <Text size={14} weight='reg' color='gray-3'>Choose which Scale Plan best suits your needs:</Text>

            <div className="col col-12 mt2">
                <div className="col-12 sm-col-4 col sm-pr1 xs-mb2">
                    <ScalePlanSelector onClick={() => { setSelectedPlan("live") }} selected={selectedPlan === "live"}>
                        <ScalePlanSelectorContents>
                            <Text style={{ marginBottom: 4 }} size={16} weight="med">More Data</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[1].bandwidth / 1000}TB data/month</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[1].storage}Gb storage</Text>
                        </ScalePlanSelectorContents>
                    </ScalePlanSelector>
                </div>
                <div className="col-12 sm-col-4 col sm-pr1 xs-mb2">
                    <ScalePlanSelector onClick={() => { setSelectedPlan("ott") }} selected={selectedPlan === "ott"}>
                        <ScalePlanSelectorContents>
                            <Text style={{ marginBottom: 4 }} size={16} weight="med">Balanced</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[0].bandwidth / 1000}TB data/month</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[0].storage}Gb storage</Text>
                        </ScalePlanSelectorContents>
                    </ScalePlanSelector>
                </div>
                <div className="col-12 sm-col-4 col xs-mb2">
                    <ScalePlanSelector onClick={() => { setSelectedPlan("vod") }} selected={selectedPlan === "vod"}>
                        <ScalePlanSelectorContents>
                            <Text style={{ marginBottom: 4 }} size={16} weight="med">More Storage</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[2].bandwidth / 1000}TB data/month</Text>
                            <Text size={14} weight="reg">{props.stepperData.allowances[2].storage}Gb storage</Text>
                        </ScalePlanSelectorContents>
                    </ScalePlanSelector>
                </div>


            </div>
            <div className="col col-12">
                <Table id='firstStepFooterTotalPrice' className="mt2 tableOverflow" customClassName=" tableOverflow" headerBackgroundColor="gray-10" footer={totalPriceTableFooter()} />
            </div>




        </div>
    )
}

//FEATURES
export const PlanStepperSecondStep = (props: { stepperData: Plan; updateStepperData: Function; setStepValidated: Function }) => {

    const featuresTableBody = () => {
        return props.stepperData.privileges ? props.stepperData.privileges.map((item: Privilege) => {
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
                                        } else {
                                            return privilege
                                        }
                                    })

                                })
                            }}
                        />
                        <Text key={'secondStepText' + item.code} size={14} weight='reg' color='gray-1'>{item.code.charAt(0).toUpperCase() + item.code.slice(1)}</Text>
                    </div>,
                    <div className="right mr2">
                        <Text key={'secondStepPrice' + item.code} size={14} weight='reg' color={'gray-1'}>{'$' + (item.price.usd / 100).toLocaleString()}{props.stepperData.name === "Monthly Scale" && "/mo"}</Text>
                    </div>

                ]
            }
        }) : null
    }

    React.useEffect(() => {
            let subTotal = 0;
            let tempSelectedPrivileges: string[] = []
            props.stepperData.privileges.map((item: Privilege) => {
                if (item.checked) {
                    tempSelectedPrivileges.push(item.code)
                    subTotal += (item.price.usd / 100)
                }
            props.updateStepperData({ ...props.stepperData, privilegesTotal: subTotal, selectedPrivileges: tempSelectedPrivileges })
        })
        props.setStepValidated(true)
    }, [props.stepperData.privileges])

    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>Add additional Features to your {PlansName[props.stepperData.name]}</Text>
            <Table id='secondStepFeatureTable' headerBackgroundColor="gray-10" body={featuresTableBody()} />
        </div>
    )
}



//CART

export const PlanStepperThirdStep = (props: { stepperData: Plan; updateStepperData: Function; setStepValidated: Function; usefulFunctions: { [key: string]: any } }) => {
    var moment = require('moment')

    const [featuresTotal, setFeaturesTotal] = React.useState<number>(props.stepperData.privilegesTotal)

    const planPrice: number = calculateDiscount(props.stepperData.price.usd / 100, props.stepperData.discount)
    const totalPrice: number = calculateDiscount(((props.stepperData.price.usd / 100) + featuresTotal), props.stepperData.discount)
    const [newSelectedPrivileges, setNewSelectedPrivileges] = React.useState<Privilege[]>([])
    

    React.useEffect(() => { props.setStepValidated(true) }, [props.stepperData])

    React.useEffect(() => {
        setNewSelectedPrivileges(props.stepperData.privileges.filter((item: Privilege) => {
            if(props.stepperData.selectedPrivileges){
                return props.stepperData.selectedPrivileges.includes(item.code)
            }
        }))
        props.updateStepperData({...props.stepperData, privileges: props.stepperData.privileges.map((item: Privilege) => {
            if(props.stepperData.selectedPrivileges && props.stepperData.selectedPrivileges.includes(item.code)){
                return {...item, checked: true}
            } else {
                return item
            }
        })})
    }, [props.stepperData.paymentTerm])

React.useEffect(() => {
    let subTotal = 0
    newSelectedPrivileges.map((item: Privilege) => {
        subTotal += (item.price.usd / 100)
        setFeaturesTotal(subTotal)
    })

}, [newSelectedPrivileges])

    const setPlanLength = (length: string) => {
        if (length === 'Monthly') {
            props.updateStepperData({ ...props.usefulFunctions['planDetails'].scalePlanMonthly, selectedScalePlan: props.stepperData.selectedScalePlan, privilegesTotal: props.stepperData.privilegesTotal, selectedPrivileges: props.stepperData.selectedPrivileges })
        } else if (length === 'Annually') {
            props.updateStepperData({ ...props.usefulFunctions['planDetails'].scalePlanAnnual, selectedScalePlan: props.stepperData.selectedScalePlan,  privilegesTotal: props.stepperData.privilegesTotal, selectedPrivileges: props.stepperData.selectedPrivileges })
        }
    }


    const cartTableBodyElement = () => {

        if (props.stepperData.name !== 'Developer') {
            return [
                {
                    data: [
                        <Text key="cartTablePlanHeading" size={14} weight="med" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                        <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14} weight="reg" color="gray-1">{(props.stepperData.paymentTerm === 12) ? '$' + (props.stepperData.price.usd/100) + ' /yr' : '$' + (props.stepperData.price.usd/100) + '/mo'}</Text>
                    ]
                },
                {
                    data: [
                        <Text key="cartTableFeaturesHeading" size={14} weight="med" color="gray-1">Features</Text>,
                        <Text className='right pr2' key="cartTableFeaturesTotal" size={14} weight="reg" color="gray-1">{props.stepperData.name === "Monthly Scale" ? '$' + (featuresTotal) + '/mo' : '$' + featuresTotal + ' /yr'}</Text>
                    ]
                }
            ]
        } else {
            return [
                {
                    data: [
                        <Text key="cartTablePlanHeading" size={14} weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                        <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14} weight="reg" color="gray-1">${(props.stepperData.price.usd / 100).toLocaleString()}&nbsp;/yr</Text>
                    ]
                }]
        }

    }

    const allowancesBodyElement = () => {
        return [
            {
                data: [
                    <Text key="cartTablePlanHeading" size={14} weight="med" color="gray-1">Data</Text>,
                    <Text className='right pr2' key="cartTablePlanHeading" size={14} weight="reg" color="gray-1">2Tb/Mo</Text>
                ]
            },
            {
                data: [
                    <Text key="cartTablePlanHeading" size={14} weight="med" color="gray-1">Storage</Text>,
                    <Text className='right pr2' key="cartTablePlanHeading" size={14} weight="reg" color="gray-1">1000 Gb</Text>
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

                                <DropdownButton style={{ maxHeight: 30 }} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => setPlanLength(value)} list={['Annually', 'Monthly']} dropdownDefaultSelect={"Annually"} />
                            </div>
                            :
                            <Text className='right pr2' key="cartTableBilledFrequency" size={14} weight="reg" color="gray-1">Annually</Text>,
                    ]
                }
            ]
        } else {
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
                        <Text key="cartTableBilled" size={14} weight="reg" color="gray-1">Monthly from {moment().format('DD MMMM YYYY')} </Text>,
                        <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="reg" color="gray-1">{props.stepperData.privilegesTotal ? '$' + ((planPrice) + (featuresTotal)) : '$' + (planPrice)}</Text>
                    ]
                }

            ]
        }

    }

    const cartTableFooterElement = () => {
        if (props.stepperData.paymentTerm === 12) {
            return [
                <Text key={"cartTableFooterTotal"} size={14} weight="med" color="gray-1">Total Pay Now</Text>,
                <div className="flex items-center right">
                    {props.stepperData.name === 'Annual Scale' &&
                        <Label className="mr2" color='green' backgroundColor='green20' label={props.stepperData.discount + '% discount Applied'} />
                    }
                    <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{props.stepperData.name !== 'Developer' ? '$' + (totalPrice) : '$' + (planPrice)}</Text>
                </div>

            ]
        } else {
            return [
                <div className="flex items-center">
                    <Text key={"cartTableFooterTotal"} size={14} weight="med" color="gray-1">Total Pay Now&nbsp;</Text>
                    {props.stepperData.commitment === 3 && <Text key={"cartTableFooterTotalFrequency"} size={10} weight="reg" color="gray-5">(First 3 months paid upfront)</Text>}
                </div>
                ,
                <Text className='right pr2' key={"cartTableFooterValue"} size={14} weight="med" color="gray-1">{props.stepperData.commitment === 3 ? '$' + (planPrice + featuresTotal) * 3 : "$" + (planPrice + featuresTotal) }</Text>,
            ]
        }
    }

    return (
        <div>
            <Table id='thirdStep' headerBackgroundColor="gray-10" body={cartTableBodyElement()} />
            {props.stepperData.name === ('Annual Scale' || 'Monthly Scale') &&
                <Table id='thirdStepAllowances' headerBackgroundColor="gray-10" body={allowancesBodyElement()} />
            }
            <Table id='thirdStepTotal' className='tableOverflow' customClassName=' tableOverflow' headerBackgroundColor="gray-10" body={cartDropdownOption()} footer={cartTableFooterElement()} />

        </div>
    )
}

//PAYMENT
export const PlanStepperFourthStep = (props: { stepperData: Plan; updateStepperData: Function; setStepValidated: Function; finalFunction: Function; usefulFunctions: { [key: string]: any } }) => {

    const planPrice: number = calculateDiscount(props.stepperData.price.usd / 100, props.stepperData.discount)
    const featuresTotal: number = (props.stepperData.privilegesTotal)
    const totalPrice: number = calculateDiscount((props.stepperData.price.usd / 100) + featuresTotal, props.stepperData.discount)

    // let annualTotalPrice: number = null
    // props.stepperData.name === ("Annual Scale" || "Monthly Scale") ?
    //     annualTotalPrice = discountedTotalPrice :
    //     annualTotalPrice = planPrice + featuresTotal

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.termsAndConditions)
    }, [props.stepperData.termsAndConditions])

    
    const step2header = () => {

        return {
            data: [
                { cell: <Text key={"step2headerText"} size={14} weight="med" color="gray-1">Total Pay Now</Text> },
                props.stepperData.name === 'Developer' ?
                    { cell: <Text key={"step2headerNumber"} className='right mr2' size={14} weight="med" color="gray-1">${planPrice}</Text> }
                    :
                    { cell: <Text key={"step2headerNumber"} className='right mr2' size={14} weight="med" color="gray-1">{props.stepperData.commitment === 3 ? '$' + ((totalPrice)) * 3 : '$' + totalPrice}</Text> }

            ]
        }
    }

    const step2CreditCardTableHeader = () => {
        return {
            data: [
                { cell: <Text key={"step2PCardTableHeaderText"} size={14} weight="med" color="gray-1">Paying by Card</Text> },
                { cell: <img key={"step2CardTableHeaderImg"} className='right mr2' src={CardLogo} /> }
            ]
        }
    }
    const step2CreditCardTableBody = () => {
        return [{
            data: [
                <Text key={"step2PCreditCardBodyText"} size={14} weight="med" color="gray-1">Card ending with 0009</Text>,
                <Text className='right mr2' key={"step2PCreditCardBodyTextExpiry"} size={14} weight="med" color="gray-1">03/2020</Text>,

            ]
        }]
    }

    return (
        <div>
            <Table id='extraStepperStep2TotalTable' headerBackgroundColor="gray-10" header={step2header()} />

            <NewPaymentMethodForm callback={() => console.log()} actionButton={props.finalFunction} recurlyFunction={props.usefulFunctions['purchasePlan']} handleThreeDSecureFail={props.usefulFunctions['handleThreeDSecureFail']} stepperData={props.stepperData} billingInfo={props.usefulFunctions['billingInfo']} />

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