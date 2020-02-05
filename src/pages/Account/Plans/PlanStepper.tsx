import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { Bubble } from '../../../components/Bubble/Bubble';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
const CardLogo = require('../../../../public/assets/credit_card_logo.svg');
import { Plan } from '../../../containers/Account/Plans';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';

export const PlanStepperFirstStep = (stepperData: Plan, setStepperData: Function) => {


    React.useEffect(() => {}, [stepperData])

    const handleIncreaseButtonClick = (item: string) => {
        let displayedIndex = stepperData.firstStep.custom[item].findIndex(element => element.currentAmount);
        if(displayedIndex < stepperData.firstStep.custom[item].length - 1) {
            let newCustomArray = stepperData.firstStep.custom[item];
            newCustomArray[displayedIndex].currentAmount = false;
            newCustomArray[displayedIndex + 1].currentAmount = true;
            let total = 0;
            Object.keys(stepperData.firstStep.custom).map((item) => {total += stepperData.firstStep.custom[item].filter(element => {return element.currentAmount})[0].price});
            setStepperData({...stepperData, firstStep:{...stepperData.firstStep, total: total, custom: {...stepperData.firstStep.custom, [item]: newCustomArray}}})
        }
    }

    const handleDencreaseButtonClick = (item: string) => {
        let displayedIndex = stepperData.firstStep.custom[item].findIndex(element => element.currentAmount);
        if(displayedIndex > 0) {
            let newCustomArray = stepperData.firstStep.custom[item];
            newCustomArray[displayedIndex].currentAmount = false;
            newCustomArray[displayedIndex - 1].currentAmount = true;
            let total = 0;
            Object.keys(stepperData.firstStep.custom).map((item) => {total += stepperData.firstStep.custom[item].filter(element => {return element.currentAmount})[0].price});
            setStepperData({...stepperData, firstStep:{...stepperData.firstStep, total: total, custom: {...stepperData.firstStep.custom, [item]: newCustomArray}}})
        }

    }
    const AllowancesBodyTable = () => {
        return stepperData ? (
            Object.keys(stepperData.firstStep.custom).map((item, key) => {
                return( [
                    <Text key={'test'+ key.toString()} size={14} weight='reg' color='gray-3'>{item}</Text>,
                    <div key={'test22'+ key.toString()} className='right mr2'>
                        <Button className='mr2' disabled={stepperData.firstStep.custom[item].findIndex(element => element.currentAmount) === 0 ? true : false} typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={() => {handleDencreaseButtonClick(item)}}>
                            -
                        </Button>
                        <Text size={14} weight='reg' color='gray-3'>{stepperData.firstStep.custom[item].filter(value => {return value.currentAmount})[0].amount}GB</Text>
                        <Button className='ml2' disabled={stepperData.firstStep.custom[item].findIndex(element => element.currentAmount) === stepperData.firstStep.custom[item].length ? true : false} typeButton='primary' sizeButton='xs' buttonColor='blue'  onClick={() => {handleIncreaseButtonClick(item)}}>
                            +
                        </Button>
                    </div>
                ]
                
                )})
        
        ) : null}

    const totalPriceTableFooter = () => {
        if(stepperData) {
            return ( 
                [
                    <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Total Per Month</Text>,
                    <Text key='totalPriceTableFooterValue' className='right pr2' size={14} weight='med' color='gray-3'>${stepperData.firstStep.total}*</Text>
                ]
            )
        }

    }

    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>If you want to edit the amount of your Allowances please do so here.</Text>
            <Table className='my2' id='stepperFirstStepTableAllowances' body={AllowancesBodyTable()} />
            <Table className='my2' id='firstStepFooterTotalPrice' footer={totalPriceTableFooter()} />
            <Text size={12} weight='reg' color='gray-3'>*Billed anually</Text>

            {
                stepperData && Object.keys(stepperData.firstStep.custom).some((element) => {return stepperData.firstStep.custom[element].findIndex(value => value.currentAmount) === stepperData.firstStep.custom[element].length - 1}) ? 
                    <Bubble type='info' className='mt2'>
                        If you want more of any above feature then you must upgrade to the next Plan
                    </Bubble>
                    :null
            }
        </div>
    )
}


export const PlanStepperSecondStep = (stepperData: Plan, setStepperData: Function) => {

    const featuresTableBody = () => {
        
        return stepperData ? Object.keys(stepperData.secondStep.custom).map((item: string) => {
            return [
                
                <InputCheckbox id={'chekbox'+ item} key={'secondStepCheckbox'+item} defaultChecked={stepperData.secondStep.custom[item].checked}  onChange={() => {setStepperData({...stepperData, secondStep: {...stepperData.secondStep, custom: {...stepperData.secondStep.custom, [item]: {...stepperData.secondStep.custom[item], checked: !stepperData.secondStep.custom[item].checked}}}})}} />,
                <Text key={'secondStepText' + item} size={14} weight='reg' color='gray-3'>{item}</Text>,
                <Text key={'secondStepPrice' + item} size={14} weight='reg' color={'gray-3'}>{'$'+stepperData.secondStep.custom[item].price.toString()}</Text>
            ]
        })
            : null

    }    

    // const includedFeaturesTableBody = () => {
    //     return stepperSecondStepData.filter(item => {return item.included}).map((item) => {
    //         return [
    //             <Text key={'secondStepTextIncludedFeature' + item.id} size={14} weight='reg' color='gray-3'>{item.value}</Text>,
    //             <Icon key={'secondStepTextIncludedFeatureIcon' + item.id}>check</Icon>
    //         ]
    //     })

    // }    

    const secondStepTableFooterElement = () => {
        return  [
            <Text  key={"secondStepTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"secondStepTableFooterValue"} size={14}  weight="med" color="gray-1">{'$' + stepperData.secondStep.total}</Text>,
        ]
    }

    React.useEffect(() => {
        if(stepperData) {
            let subTotal = 0;
            Object.keys(stepperData.secondStep.custom).map((item) => {
                if(stepperData.secondStep.custom[item].checked) {
                    subTotal+= stepperData.secondStep.custom[item].price
                }
            })
            setStepperData({...stepperData, secondStep: {...stepperData.secondStep, total: subTotal}})
        }

    }, [stepperData])
    
    return (
        <div>
            {/* <Text size={14} weight='reg' color='gray-3'>Included Features in your Monthly Enterprise Plan:</Text>
            <Table className='my2' id='secondStepIncludedFeatureTable' body={includedFeaturesTableBody()} /> */}


            <Text size={14} weight='reg' color='gray-3'>Add additional Features:</Text>
            <Table className='my2' id='secondStepFeatureTable' body={featuresTableBody()} />
            <Table className='my2' id='secondStepTotalTable' footer={secondStepTableFooterElement()} />

        </div>
    )
}


export const PlanStepperThirdStep = (stepperData: Plan, setStepperData: Function) => {


    React.useEffect(() => {}, [stepperData])

    const cartTableBodyElement = () => {
        return stepperData.action === 'custom' ? [
            [
                <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{stepperData.name + 'Plan'}</Text>,
                <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">{stepperData.firstStep.included.price}</Text>
            ],
            [
                <Text  key="cartTableCutomAllowancesHeading" size={14}  weight="reg" color="gray-1">Allowances</Text>,
                <Text className='right pr2' key="cartTableCutomAllowancesTotal" size={14}  weight="reg" color="gray-1">{stepperData.firstStep.total}</Text>
            ],
            [
                <Text  key="cartTableFeaturesHeading" size={14}  weight="reg" color="gray-1">Features</Text>,
                <Text className='right pr2' key="cartTableFeaturesTotal" size={14}  weight="reg" color="gray-1">{stepperData.secondStep.total}</Text>
            ],
        ]
            :
            [
                [
                    <Text  key="cartTablePlanHeading" size={14}  weight="reg" color="gray-1">{stepperData.name + 'Plan'}</Text>,
                    <Text className='right pr2' key="cartTablePlanIncludedTotal" size={14}  weight="reg" color="gray-1">{stepperData.firstStep.included.price}</Text>
                ]
            ]
    }

    const cartDropdownOption = () => {
        return [
            [
                <Text  key="cartTableBilled" size={14}  weight="med" color="gray-1">Billed</Text>,
                stepperData.name === 'scale' ? 
                    <DropdownSingle className='right mr2' id='paymentFrquency' dropdownTitle='' dropdownDefaultSelect='Annually' callback={(value: string) => setStepperData({...stepperData, paymentFrequency: value})} list={{'Monthly': false,'Annually': false}} />
                    :
                    <Text className='right pr2' key="cartTableBilledFrequency" size={14}  weight="med" color="gray-1">Annually</Text>,
            ]
        ]
    }

    const cartTableFooterElement = () => {
        const total: number = stepperData.action === 'custom' ? stepperData.firstStep.included.price + stepperData.firstStep.total + stepperData.secondStep.total : stepperData.firstStep.included.price;
        return  [
            <Text  key={"cartTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"cartTableFooterValue"} size={14}  weight="med" color="gray-1">{'$' + total }</Text>,
        ]
    }
    return (
        <div>
            <Table id='thirdStep' body={cartTableBodyElement()} /> 
            <Table className='mt2' id='thirdStepTotal' body={cartDropdownOption()} footer={cartTableFooterElement()} />
            
        </div>
    )
}

export const PlanStepperFourthStep = (stepperData: Plan, setStepperData: Function) => {


    React.useEffect(() => {}, [stepperData])

    const step2header = () => {
        const total: number = stepperData.action === 'custom' ? stepperData.firstStep.included.price + stepperData.firstStep.total + stepperData.secondStep.total : stepperData.firstStep.included.price;
        return  [
            <Text  key={"step2headerText"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text  key={"step2headerNumber"} className='right mr2' size={14}  weight="med" color="gray-1">{'$' + total}</Text>
        ]
    }

    const step2CreditCardTableHeader = () => {
        return [
            <Text  key={"step2PCardTableHeaderText"} size={14}  weight="med" color="gray-1">Paying by Card</Text>,
            <img key={"step2CardTableHeaderImg"} className='right mr2' src={CardLogo} />
        ]
    }
    const step2CreditCardTableBody = () => {
        return [[
            <Text  key={"step2PCreditCardBodyText"} size={14}  weight="med" color="gray-1">Card ending with 0009</Text>,
            <Text  className='right mr2' key={"step2PCreditCardBodyTextExpiry"} size={14}  weight="med" color="gray-1">03/2020</Text>,

        ]]
    }
    return (
        <div>
            <Table className='my2' id='extraStepperStep2TotalTable' header={step2header()}/>
            <Table className='my2' id='extraStepperStep2PaymentMethodTable' header={step2CreditCardTableHeader()} body={step2CreditCardTableBody()} />
            <Text size={14} weight='reg' color='gray-3'>If you wish to use a different Payment Method, please go to Billing and add a new Payment Method</Text>
            <div className='py2 col col-12'>
                <InputCheckbox className='col col-1' id={'chekboxTC'} key={'chekboxTC'} defaultChecked={stepperData.termsAndConditions}  onChange={() => {setStepperData({...stepperData, termsAndConditions: !stepperData.termsAndConditions})}} />
                <Text className='col col-11' size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>
            </div>
        </div>
    )
}