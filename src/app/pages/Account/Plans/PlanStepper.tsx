import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');
import { DropdownButton } from '../../../../components/FormsComponents/Dropdown/DropdownButton';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Plan } from '../../../redux-flow/store/Account/Plans/types';
import { NewPaymentMethodForm } from '../../../shared/Billing/NewPaymentMethodForm';
import { RadioButtonContainer, RadioButtonOption } from '../../../shared/Billing/BillingStyle';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';

//PLAN
export const PlanStepperFirstStep = (props: {stepperData: Plan; setStepperData: Function; setStepValidated: Function}) => {

    const [selectedPlan, setSelectedPlan] = React.useState<string>('ott')

    React.useEffect(() => {
        props.setStepValidated(true)
    }, [props.stepperData])


    const totalPriceTableFooter = () => {
        if(props.stepperData) {
            return ( 
                [
                    <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Total Per Month</Text>,
                    <Text key='totalPriceTableFooterValue' className='right pr2' size={14} weight='med' color='gray-3'>${(props.stepperData.firstStep.total + props.stepperData.firstStep.included.price).toLocaleString()}*</Text>
                ]
            )
        }

    }

    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>Choose which Scale Plan best suits your needs:</Text>

            <RadioButtonContainer isSelected={selectedPlan === 'ott'}>
                <InputRadio name='scalePlanSelection' value='ott' defaultChecked={true} label='OTT' onChange={() => setSelectedPlan('ott')} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedPlan === 'ott'}>
            <Text size={14} weight='reg' color='gray-1'>This option is is for serious OTT and comes with large amounts of Data and Storage for all your Live and VOD needs.</Text>
            </RadioButtonOption>

            <RadioButtonContainer isSelected={selectedPlan === 'live'} className="mt2">
                <InputRadio name='scalePlanSelection' value='live' defaultChecked={false} label='Live' onChange={() => setSelectedPlan('live')} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedPlan === 'live'}>
            <Text size={14} weight='reg' color='gray-1'>This option is perfect for streamers and broadcasters who need a lot of Data and just a small amount of Storage.</Text>
            </RadioButtonOption>

            <RadioButtonContainer className="mt2" isSelected={selectedPlan === 'vod'}>
                <InputRadio name='scalePlanSelection' value='vod' defaultChecked={false} label='VOD' onChange={() => setSelectedPlan('vod')} />
            </RadioButtonContainer>
            <RadioButtonOption isOpen={selectedPlan === 'vod'}>
            <Text size={14} weight='reg' color='gray-1'>This option is ideal for large Video-On-Demand libraries and comes with an equal amount of Data and Storage.</Text>
            </RadioButtonOption>
            
            <Table id='firstStepFooterTotalPrice' headerBackgroundColor="gray-10" footer={totalPriceTableFooter()} />
            

            
        </div>
    )
}

//FEATURES
export const PlanStepperSecondStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function}) => {

    const featuresTableBody = () => {
        
        return props.stepperData ? Object.keys(props.stepperData.secondStep.custom).map((item: string) => {
            return {data: [
                
                <InputCheckbox id={'chekbox'+ item} key={'secondStepCheckbox'+item} defaultChecked={props.stepperData.secondStep.custom[item].checked}  onChange={() => {props.updateStepperData({...props.stepperData, secondStep: {...props.stepperData.secondStep, custom: {...props.stepperData.secondStep.custom, [item]: {...props.stepperData.secondStep.custom[item], checked: !props.stepperData.secondStep.custom[item].checked}}}})}} />,
                <Text key={'secondStepText' + item} size={14} weight='reg' color='gray-3'>{item}</Text>,
                <Text key={'secondStepPrice' + item} size={14} weight='reg' color={'gray-3'}>{'$' + props.stepperData.secondStep.custom[item].price.toLocaleString()}</Text>
            ]}
        })
            : null

    }      

    const secondStepTableFooterElement = () => {
        return  [
            <Text  key={"secondStepTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"secondStepTableFooterValue"} size={14}  weight="med" color="gray-1">${(props.stepperData.secondStep.total + props.stepperData.firstStep.total + props.stepperData.firstStep.included.price).toLocaleString()}</Text>,
        ]
    }

    React.useEffect(() => {
        if(props.stepperData) {
            let subTotal = 0;
            Object.keys(props.stepperData.secondStep.custom).map((item) => {
                if(props.stepperData.secondStep.custom[item].checked) {
                    subTotal+= props.stepperData.secondStep.custom[item].price
                }
            })
            props.updateStepperData({...props.stepperData, secondStep: {...props.stepperData.secondStep, total: subTotal}})
        }
        props.setStepValidated(true)
    }, [props.stepperData])
    
    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>Add additional Features:</Text>
            <Table id='secondStepFeatureTable' headerBackgroundColor="gray-10" body={featuresTableBody()} />
            <Table id='secondStepTotalTable' headerBackgroundColor="gray-10" footer={secondStepTableFooterElement()} />
        </div>
    )
}

export enum PlansName {
    developer = "Developer Plan",
    event = "Event Plan",
    scale = "Scale Plan"
}

//CART
export const PlanStepperThirdStep = (props: {stepperData: Plan; setStepperData: Function; setStepValidated: Function}) => {


    React.useEffect(() => {props.setStepValidated(true)}, [props.stepperData])


    const cartTableBodyElement = () => {
        if (props.stepperData.name !== 'developer')
        {return  [
            {data: [
                <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">${props.stepperData.firstStep.included.price.toLocaleString()}</Text>
            ]},
            {data: [
                <Text  key="cartTableFeaturesHeading" size={14}  weight="reg" color="gray-1">Features</Text>,
                <Text className='right pr2' key="cartTableFeaturesTotal" size={14}  weight="reg" color="gray-1">${props.stepperData.secondStep.total.toLocaleString()}</Text>
            ]}
        ]} else {
            return  [
                {data: [
                    <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{PlansName[props.stepperData.name]}</Text>,
                    <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">${props.stepperData.firstStep.included.price.toLocaleString()}</Text>
                ]}]
        }
           
    }

    const cartDropdownOption = () => {
        return [
            {data: [
                <Text  key="cartTableBilled" size={14}  weight="med" color="gray-1">Billed</Text>,
                props.stepperData.name === 'scale' ? 
                    <div >
                        {
                            props.stepperData.paymentFrequency === 'Annually' ?
                                <Label color='green' backgroundColor='green20' label='25% discount' />
                                : null
                        }
                        <DropdownButton style={{maxHeight: 30}} className='right mr2 border-none' id='paymentFrquency' callback={(value: string) => props.setStepperData({...props.stepperData, paymentFrequency: value})} list={['Annually', 'Monthly']} />
                    </div>
                    :
                    <Text className='right pr2' key="cartTableBilledFrequency" size={14}  weight="med" color="gray-1">Annually</Text>,
            ]}
        ]
    }

    const cartTableFooterElement = () => {
        const total: string = props.stepperData.action === 'custom' ? (props.stepperData.firstStep.included.price + props.stepperData.firstStep.total + props.stepperData.secondStep.total).toLocaleString() : props.stepperData.firstStep.included.price.toLocaleString();
        return  [
            <Text  key={"cartTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="med" color="gray-1">{'$' + total }</Text>,
        ]
    }
    return (
        <div>
            <Table id='thirdStep' headerBackgroundColor="gray-10" body={cartTableBodyElement()} /> 
            <Table id='thirdStepTotal' className='tableOverflow' customClassName=' tableOverflow' headerBackgroundColor="gray-10" body={cartDropdownOption()} footer={cartTableFooterElement()} />
            
        </div>
    )
}

//PAYMENT
export const PlanStepperFourthStep = (props: {stepperData: Plan; updateStepperData: Function; setStepValidated: Function, finalFunction: Function}) => {

    React.useEffect(() => {
        props.setStepValidated(props.stepperData.termsAndConditions)
    }, [props.stepperData.termsAndConditions])

    const step2header = () => {
        const total: string = props.stepperData.action === 'custom' ? (props.stepperData.firstStep.included.price + props.stepperData.firstStep.total + props.stepperData.secondStep.total).toLocaleString() : props.stepperData.firstStep.included.price.toLocaleString();
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
            <Text size={14} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            <div className='py2 col col-12 flex flex-auto'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={props.stepperData.termsAndConditions}  onChange={() => {props.updateStepperData({...props.stepperData, termsAndConditions: !props.stepperData.termsAndConditions})}} />
                <div className='col col-11 flex'>
                    <Text  size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>                   
                </div>
            </div>
        </div>
    )
}