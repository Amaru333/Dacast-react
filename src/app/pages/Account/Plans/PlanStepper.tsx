import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Plan, Privilege } from '../../../redux-flow/store/Account/Plans/types';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { calculateDiscount, calculateAnnualPrice } from '../../../../utils/utils';
import { ScalePlanSelector, ScalePlanSelectorContents } from './Plans';

export enum PlansName {
    Developer = "Developer Plan",
    Event = "Event Plan",
    Scale = "Scale Plan"
}

//PLAN
export const PlanStepperFirstStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function}) => {
    const [selectedPlan, setSelectedPlan] = React.useState<string>('ott')

    React.useEffect(() => {
        props.setStepValidated(true)
    }, [props.stepperData])

    const totalPriceTableFooter = () => {
        if(props.stepperData) {
            return props.stepperData.interval_length === 1 ?
                ( 
                    [   
                        <div className='flex items-center'>
                            <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Billed</Text>
                            <DropdownButton style={{maxHeight: 30}} className="ml1" id='planStepBillingFrequencyDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => props.updateStepperData({...props.stepperData, paymentFrequency: value})} dropdownDefaultSelect={props.stepperData.interval_length === 1 ? "Monthly" : "Annually"}></DropdownButton>
                        </div>
                        ,
                        <Text key='totalPriceTableFooterValue' className='right pr2' size={14} weight='med' color='gray-3'>${( props.stepperData.default_price.usd).toLocaleString()}</Text>
                    ]
                ) :
                ( 
                    [
                        <div className="flex items-center">
                            <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Billed</Text>
                            <DropdownButton style={{maxHeight: 30}} className="ml1 border-none" id='planStepBillingFrequencyDropdown' list={['Annually', 'Monthly']} callback={(value: 'Annually' | 'Monthly') => props.updateStepperData({...props.stepperData, paymentFrequency: value})} dropdownDefaultSelect={props.stepperData.interval_length === 1 ? "Monthly" : "Annually"}></DropdownButton>
                        </div>
                        ,
                        <div className="flex items-center right mr2">
                            <Label className="mr2" color='green' backgroundColor='green20' label='25% Discount Applied' />
                            <Text key='totalPriceTableFooterValue' className='right' size={14} weight='med' color='gray-3'>${calculateDiscount( props.stepperData.default_price.usd).toFixed(2)}</Text>
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
                <ScalePlanSelector onClick={() => setSelectedPlan("live")} selected={selectedPlan === "live"}>
                    <ScalePlanSelectorContents>
                        <Text style={{marginBottom: 4}} size={16} weight="med">More Data</Text>
                        <Text size={14} weight="reg">3TB data/month</Text>
                        <Text size={14} weight="reg">30Gb storage</Text>
                    </ScalePlanSelectorContents>  
                </ScalePlanSelector>
                </div>
                <div className="col-12 sm-col-4 col sm-pr1 xs-mb2">
                <ScalePlanSelector onClick={() => setSelectedPlan("ott")} selected={selectedPlan === "ott"}>
                <ScalePlanSelectorContents>
                        <Text style={{marginBottom: 4}} size={16} weight="med">Balanced</Text>
                        <Text size={14} weight="reg">2TB data/month</Text>
                        <Text size={14} weight="reg">200Gb storage</Text>
                    </ScalePlanSelectorContents>  
                </ScalePlanSelector>
                </div>
                <div className="col-12 sm-col-4 col xs-mb2">
                <ScalePlanSelector onClick={() => setSelectedPlan("vod")} selected={selectedPlan === "vod"}>
                <ScalePlanSelectorContents>
                        <Text style={{marginBottom: 4}} size={16} weight="med">More Storage</Text>
                        <Text size={14} weight="reg">1TB data/month</Text>
                        <Text size={14} weight="reg">1TbGb storage</Text>
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
export const PlanStepperSecondStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function}) => {

    React.useEffect(() => {
        console.log('stepper data', props.stepperData)
    }, [props.stepperData])

    const featuresTableBody = () => {
        return props.stepperData.default_privileges ? props.stepperData.default_privileges.map((item: Privilege) => {
            return {data: [
                <div className='flex'>
                    <InputCheckbox 
                        className="mr1" 
                        id={'chekbox'+ item.code} 
                        key={'secondStepCheckbox'+ item.code} 
                        defaultChecked={item.checked}  
                        onChange={() => {
                            props.updateStepperData({
                                ...props.stepperData, 
                                default_privileges: props.stepperData.default_privileges.map((privilege) => {
                                    if(privilege.code === item.code) {
                                        return {...privilege, checked: !privilege.checked}
                                    } else {
                                        return privilege
                                    }
                                })
                                
                            })
                        }}
                    />
                    <Text  key={'secondStepText' + item.code} size={14} weight='reg' color='gray-3'>{item.code}</Text>
                </div>,
                <div className="right mr2">
                    <Text  key={'secondStepPrice' + item.code} size={14} weight='reg' color={'gray-3'}>{'$' + item.price.usd.toLocaleString()}</Text>
                </div>
                
            ]}
        }) : null
    }      

    React.useEffect(() => {
        if(props.stepperData) {
            let subTotal = 0;
            props.stepperData.default_privileges.map((item: Privilege) => {
                if(item.checked) {
                    subTotal+= item.price.usd
                }
            })
            props.updateStepperData({...props.stepperData, priviledgesTotal: subTotal})
        }
        props.setStepValidated(true)
    }, [props.stepperData.default_privileges])
    
    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>Add additional Features to your {PlansName[props.stepperData.name]}</Text>
            <Table id='secondStepFeatureTable' headerBackgroundColor="gray-10" body={featuresTableBody()} />
        </div>
    )
}



//CART

export const PlanStepperThirdStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function}) => {
    debugger;
    var moment = require('moment')

    const planPrice: number = props.stepperData.default_price.usd
    const discountedPlanPrice: number = calculateDiscount(props.stepperData.default_price.usd)
    const featuresTotal: number = (props.stepperData.privilegesTotal)

    let annualPlanPrice: number = null
    props.stepperData.name === "Annual Scale" || "Monthly Scale" ?
        annualPlanPrice = calculateAnnualPrice(discountedPlanPrice) :
        annualPlanPrice = calculateAnnualPrice(planPrice)

    let annualFeaturesPrice: number = null
    props.stepperData.name === "Annual Scale" || "Monthly Scale" ?
        annualFeaturesPrice = (props.stepperData.privilegesTotal * 12) :
        annualFeaturesPrice = featuresTotal
    


    

    React.useEffect(() => {props.setStepValidated(true)}, [props.stepperData])

    React.useEffect(() => {console.log('stepper data', props.stepperData)}, [props.stepperData])


    const cartTableBodyElement = () => {

        if (props.stepperData.name !== 'Developer')
        {return  [
            {data: [
                <Text  key="cartTablePlanHeading" size={14}  weight="med" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">{props.stepperData.interval_length === 12 ? '$' + annualPlanPrice.toLocaleString() + ' /yr' : '$' + planPrice.toLocaleString() + ' /mo'}</Text>
            ]},
            {data: [
                <Text  key="cartTableFeaturesHeading" size={14}  weight="med" color="gray-1">Features</Text>,
                <Text className='right pr2' key="cartTableFeaturesTotal" size={14}  weight="reg" color="gray-1">${featuresTotal.toLocaleString()}{props.stepperData.name === 'Monthly Scale' ? ' /mo' : ' /yr'}</Text>
            ]}
        ]} else {
            return  [
                {data: [
                    <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                    <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">${(props.stepperData.default_price.usd/100).toLocaleString()}&nbsp;/yr</Text>
                ]}]
        }
           
    }

    const allowancesBodyElement = () => {
        return [
            {data: [
                <Text  key="cartTablePlanHeading" size={14}  weight="med" color="gray-1">Data</Text>,
                <Text className='right pr2'  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">2Tb/Mo</Text>
            ]},
            {data: [
                <Text  key="cartTablePlanHeading" size={14}  weight="med" color="gray-1">Storage</Text>,
                <Text className='right pr2'  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">200Gb</Text>
            ]}
        ]
    }

    const cartDropdownOption = () => {
        if (props.stepperData.interval_length === 1)
        {return [
            {data: [
                <Text  key="cartTableBilled" size={14}  weight="reg" color="gray-1">Billed</Text>,
                props.stepperData.name === 'Annual Scale' || 'Monthly Scale' ? 
                    <div >
                        
                        <DropdownButton style={{maxHeight: 30}} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => props.updateStepperData({...props.stepperData, paymentFrequency: value})} list={['Annually', 'Monthly']} dropdownDefaultSelect={props.stepperData.interval_length === 1 ? "Monthly" : "Annually"} />
                    </div>
                    :
                    <Text className='right pr2' key="cartTableBilledFrequency" size={14}  weight="reg" color="gray-1">Annually</Text>,
            ]}
        ]} else {
            return [
                {data: [
                    <Text  key="cartTableBilled" size={14}  weight="reg" color="gray-1">Billed</Text>,
                    (props.stepperData.name === ('Annual Scale' || 'Monthly Scale')) ? 
                        <div >
                        
                            <DropdownButton style={{maxHeight: 30}} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => props.updateStepperData({...props.stepperData, paymentFrequency: value})} list={['Annually', 'Monthly']} dropdownDefaultSelect={props.stepperData.interval_length === 1 ? "Monthly" : "Annually"} />
                        </div>
                        :
                        <Text className='right pr2' key="cartTableBilledFrequency" size={14}  weight="med" color="gray-1">Annually</Text>,
                ]},
                {data: [
                    <Text  key="cartTableBilled" size={14}  weight="reg" color="gray-1">Monthly from {moment().format('DD MMMM YYYY')} </Text>,
                    <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="reg" color="gray-1">{'$' + (planPrice + featuresTotal) }</Text>
                ]}
        
            ]}

    }

    const cartTableFooterElement = () => {
        if (props.stepperData.interval_length === 12) {
            return  [
                <Text  key={"cartTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
                <div className="flex items-center right">
                    {props.stepperData.name === ('Annual Scale' || 'Monthly Scale') ?
                        <Label className="mr2" color='green' backgroundColor='green20' label='25% discount Applied' />
                        : null
                    }
                    <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="med" color="gray-1">{props.stepperData.name !== 'Developer' ? '$' + (annualPlanPrice + annualFeaturesPrice) : '$' + (planPrice + featuresTotal) }</Text>
                </div>
                
            ] 
        } else {
            return  [
                <div className="flex items-center">
                    <Text  key={"cartTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now&nbsp;</Text>
                    <Text  key={"cartTableFooterTotal"} size={10}  weight="reg" color="gray-5">(First 3 months paid upfront)</Text>
                </div>
                ,
                <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="med" color="gray-1">{'$' + (planPrice + featuresTotal)*3 }</Text>,
            ] 
        }
    }

    return (
        <div>
            <Table id='thirdStep' headerBackgroundColor="gray-10" body={cartTableBodyElement()} />
            { props.stepperData.name === ('Annual Scale' || 'Monthly Scale') &&
                <Table id='thirdStepAllowances' headerBackgroundColor="gray-10" body={allowancesBodyElement()}  />
            }            
            <Table id='thirdStepTotal' className='tableOverflow' customClassName=' tableOverflow' headerBackgroundColor="gray-10" body={cartDropdownOption()} footer={cartTableFooterElement()} />
            
        </div>
    )
}

//PAYMENT
export const PlanStepperFourthStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function; finalFunction: Function}) => {

    const planPrice: number = props.stepperData.default_price.usd
    const featuresTotal: number = (props.stepperData.privilegesTotal)

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.termsAndConditions)
    }, [props.stepperData.termsAndConditions])

    const step2header = () => {
        const total: string = (planPrice + featuresTotal.toLocaleString())
        return  {data: [
            {cell: <Text  key={"step2headerText"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>},
            {cell: <Text  key={"step2headerNumber"} className='right mr2' size={14}  weight="med" color="gray-1">{'$' + total}</Text>}
        ]}
    }

    const step2CreditCardTableHeader = () => {
        return {data: [
            {cell: <Text  key={"step2PCardTableHeaderText"} size={14}  weight="med" color="gray-1">Paying by Card</Text>},
            {cell: <img key={"step2CardTableHeaderImg"} className='right mr2' src={CardLogo} />}
        ]}
    }
    const step2CreditCardTableBody = () => {
        return [{data: [
            <Text  key={"step2PCreditCardBodyText"} size={14}  weight="med" color="gray-1">Card ending with 0009</Text>,
            <Text  className='right mr2' key={"step2PCreditCardBodyTextExpiry"} size={14}  weight="med" color="gray-1">03/2020</Text>,

        ]}]
    }
    return (
        <div>
            <Table id='extraStepperStep2TotalTable' headerBackgroundColor="gray-10" header={step2header()}/>
            {/* <Table id='extraStepperStep2PaymentMethodTable' headerBackgroundColor="gray-10" header={step2CreditCardTableHeader()} body={step2CreditCardTableBody()} /> */}
            
            <NewPaymentMethodForm callback={() => console.log()} actionButton={props.finalFunction} />
        
            <div className="mt2 mb1">
                <Text className="mt2" size={12} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            </div>
            
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={props.stepperData.termsAndConditions}  onChange={() => {props.updateStepperData({...props.stepperData, termsAndConditions: !props.stepperData.termsAndConditions})}} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>                   
                </div>
            </div>
        </div>
    )
}