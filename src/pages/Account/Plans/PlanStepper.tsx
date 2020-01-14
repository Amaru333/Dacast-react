import React from 'react';
import { Text } from '../../../Typography/Text';
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Bubble } from '../../../Bubble/Bubble';
import { InputCheckbox } from '../../../FormsComponents/Input/InputCheckbox';
import { Icon } from '@material-ui/core';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');

interface StepperFirstStepData {
    [key: string]: {
        minValue: number;
        maxValue: number;
        priceGap: number;
        values: number[];
    };
}

const stepperFirstStepData: StepperFirstStepData = {
    'Data': {
        minValue: 10,
        maxValue: 100,
        priceGap: 50,
        values: [10, 20, 50, 100]
    },
    'Storage': {
        minValue: 10,
        maxValue: 100,
        priceGap: 50,
        values: [10, 20, 50, 100]
    },
    'Encoding': {
        minValue: 10,
        maxValue: 100,
        priceGap: 50,
        values: [10, 20, 50, 100]
    }
}

export const PlanStepperFirstStep = () => {
    const [dataValues, setDataValues] = React.useState<{[key: string]: number}>({
        'Data': 0,
        'Storage': 0,
        'Encoding': 0
    });

    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [maxValues, setMaxValues] = React.useState<boolean>(false);

    const handleIncreaseButtonClick = (item: string) => {
        if(dataValues[item] < stepperFirstStepData[item].values.length - 1) {
            let value = dataValues[item] + 1
            setDataValues({...dataValues, [item]: value})
            setTotalPrice(totalPrice + stepperFirstStepData[item].priceGap)
        }
    }

    const handleDencreaseButtonClick = (item: string) => {
        if(dataValues[item] !== 0) {
            let value = dataValues[item] - 1
            setDataValues({...dataValues, [item]: value})
            setTotalPrice(totalPrice - stepperFirstStepData[item].priceGap)
        }
    }
    const AllowancesBodyTable = () => {
        return (
            Object.keys(stepperFirstStepData).map((item, key) => {
                return( [
                    <Text key={'test'+ key.toString()} size={14} weight='reg' color='gray-3'>{item}</Text>,
                    <div key={'test22'+ key.toString()} className='right mr2'>
                        <Button className='mr2' disabled={dataValues[item] === 0 ? true : false} typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={() => {handleDencreaseButtonClick(item)}}>
                            -
                        </Button>
                        <Text size={14} weight='reg' color='gray-3'>{stepperFirstStepData[item].values[dataValues[item]]}GB</Text>
                        <Button className='ml2' disabled={dataValues[item] === stepperFirstStepData[item].values.length - 1 ? true : false} typeButton='primary' sizeButton='xs' buttonColor='blue'  onClick={() => {handleIncreaseButtonClick(item)}}>
                            +
                        </Button>
                    </div>
                ]
                
                )})
        
        )}

    const totalPriceTableFooter = () => {
        return ( 
            [
                <Text key='totalPriceTableFooterText' size={14} weight='med' color='gray-3'>Total Per Month</Text>,
                <Text key='totalPriceTableFooterValue' className='right pr2' size={14} weight='med' color='gray-3'>${totalPrice}*</Text>
            ]
        )
    }

    

    React.useEffect(() => {
        setMaxValues(Object.keys(dataValues).some((value) => { return dataValues[value] === stepperFirstStepData[value].values.length - 1})) 
    }, [dataValues])
    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>If you want to edit the amount of your Allowances please do so here.</Text>
            <Table className='my2' id='stepperFirstStepTableAllowances' body={AllowancesBodyTable()} />
            <Table className='my2' id='firstStepFooterTotalPrice' footer={totalPriceTableFooter()} />
            <Text size={12} weight='reg' color='gray-3'>*Billed anually</Text>

            {
                maxValues ? 
                    <Bubble type='info' className='mt2'>
                        If you want more of any above feature then you must upgrade to the next Plan
                    </Bubble>
                    :null
            }
        </div>
    )
}

const stepperSecondStepData = [
    {id: '1', included: true, value: '24/7 Chat Support', price: 0},
    {id: '2', included: true, value: '24/7 Phone support', price: 0},
    {id: '3', included: true, value: 'Paywall', price: 0},
    {id: '4', included: true, value: 'API', price: 0},
    {id: '5', included: true, value: 'AES', price: 0},
    {id: '6', included: true, value: 'Ads', price: 0},
    {id: '7', included: true, value: 'China', price: 0},
    {id: '8', included: false, value: 'Reseller', price: 100},
    {id: '9', included: false, value: 'Dedicated AM', price: 200}
]
export const PlanStepperSecondStep = () => {

    const featuresTableBody = () => {
        return stepperSecondStepData.filter(item => {return !item.included}).map((item) => {
            return [
                <InputCheckbox id={'chekbox'+ item.value} key={'secondStepCheckbox'+item.id} defaultChecked={false}  onChange={() => {}} />,
                <Text key={'secondStepText' + item.id} size={14} weight='reg' color='gray-3'>{item.value}</Text>,
                <Text key={'secondStepPrice' + item.id} size={14} weight='reg' color={'gray-3'}>{'$'+item.price.toString()}</Text>
            ]
        })

    }    

    const includedFeaturesTableBody = () => {
        return stepperSecondStepData.filter(item => {return item.included}).map((item) => {
            return [
                <Text key={'secondStepTextIncludedFeature' + item.id} size={14} weight='reg' color='gray-3'>{item.value}</Text>,
                <Icon key={'secondStepTextIncludedFeatureIcon' + item.id}>check</Icon>
            ]
        })

    }    

    const secondStepTableFooterElement = () => {
        return  [
            <Text  key={"secondStepTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"secondStepTableFooterValue"} size={14}  weight="med" color="gray-1">$1440</Text>,
        ]
    }

    const [step2Data, setStep2Data] = React.useState<{[key: string]: number}>({
        'Data': 0,
        'Storage': 0,
        'Encoding': 0
    });

    const [test2, setTest2] = React.useState<number>(0);
    const [test3, setTest3] = React.useState<boolean>(false);

    React.useEffect(() => {})
    
    return (
        <div>
            <Text size={14} weight='reg' color='gray-3'>Included Features in your Monthly Enterprise Plan:</Text>
            <Table className='my2' id='secondStepIncludedFeatureTable' body={includedFeaturesTableBody()} />


            <Text size={14} weight='reg' color='gray-3'>Add additional Features:</Text>
            <Table className='my2' id='secondStepFeatureTable' body={featuresTableBody()} />
            <Table className='my2' id='secondStepTotalTable' footer={secondStepTableFooterElement()} />

        </div>
    )
}


const ProtectionModalTableData = [
    {
        label: 'Monthly Enterprise',
        value: '$390'
    },
    {
        label: 'China Feature',
        value: '$1000'
    },
    {
        label: 'Dedicated AM',
        value: '$50'
    },
    {
        label: 'Billed',
        value: 'Anually'
    } 
]


export const PlanStepperThirdStep = () => {

    const [test332, setTest332] = React.useState<number>(0);
    const [test333, setTest333] = React.useState<boolean>(false);
    const [test21, setTest21] = React.useState<number>(0);


    React.useEffect(() => {})

    const protectionModalTableBodyElement = () => {
        return ProtectionModalTableData.map((value, key) => {
            return [
                <Text  key={"protectionModalTable" + value.label + key.toString()} size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                <Text className='right pr2' key={"protectionModalTable" + value.value + key.toString()} size={14}  weight="reg" color="gray-1">{value.value}</Text>
            ]
        }) 
    }

    const protectionModalTableFooterElement = () => {
        return  [
            <Text  key={"protectionModalTableFooterTotal"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text className='right pr2' key={"protectionModalTableFooterValue"} size={14}  weight="med" color="gray-1">$1440</Text>,
        ]
    }
    return (
        <div>
            <Table id='thirdStep' body={protectionModalTableBodyElement()} footer={protectionModalTableFooterElement()} />
            
        </div>
    )
}

export const PlanStepperFourthStep = () => {

    const [test33332, setTest33332] = React.useState<number>(0);
    const [test33333, setTest33333] = React.useState<boolean>(false);
    const [test2331, setTest2331] = React.useState<number>(0);


    React.useEffect(() => {})

    const step2header = () => {
        return  [
            <Text  key={"step2headerText"} size={14}  weight="med" color="gray-1">Total Pay Now</Text>,
            <Text  key={"step2headerNumber"} className='right mr2' size={14}  weight="med" color="gray-1">$1440</Text>
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
            <div className='py2'>
                <InputCheckbox id={'chekboxTC'} key={'chekboxTC'} defaultChecked={false}  onChange={() => {}} />
                <Text size={14} weight='reg' color='gray-3'>By purchasing this product I acknowledge and accept the <a>Terms and Conditions.</a></Text>
            </div>
        </div>
    )
}