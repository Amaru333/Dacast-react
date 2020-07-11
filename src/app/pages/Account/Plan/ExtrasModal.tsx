import React from 'react';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Extras } from '../../../redux-flow/store/Account/Plan';
const CardLogo = require('../../../../../public/assets/credit_card_logo.svg');
const PaypalLogo = require('../../../../../public/assets/paypal_logo.svg');

const ProtectionModalTableData = [
    {
        label: 'Storage',
        value: '60'
    },
    {
        label: 'Price per GB',
        value: '$2.25'
    },
    {
        label: 'Billed',
        value: 'Recurring, when Storage reaches 0 GB'
    } 
]


export const ExtrasStepperFirstStep = (extraItem: Extras, setExtraItem: Function) => {

    
    const protectionModalTableBodyElement = () => {
        return ProtectionModalTableData.map((value, key) => {
            return {data:[
                <Text  key={"ExtraStepperStep1Table" + value.label + key.toString()} size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                <Text  key={"ExtraStepperStep1Table" + value.value + key.toString()} size={14}  weight="reg" color="gray-1">{value.value}</Text>
            ]}
        }) 
    }

    const protectionModalTableFooterElement = () => {
        return  [
            <Text  key={"protectionModalTableFooterTotal"} size={14}  weight="med" color="gray-1">Total</Text>,
            <Text  key={"protectionModalTableFooterValue"} size={14}  weight="med" color="gray-1">$135</Text>
        ]
    }

    return (
        <div>
            <Text size={14}  weight="reg" color="gray-1">Choose which Protection you wish to enable.</Text>
            <div className='col col-12'>

                <DropdownSingle 
                    isInModal
                    className='col col-5 mr1 pb2'
                    dropdownTitle='Protection Type'
                    list={{'Encoding Protection': false, 'Playback Protection': false}}
                    id='extraStepperStep1ProtectionTypeDropdown'
                    callback={(value: string) => {setExtraItem({...extraItem, type: value})}}

                />
                <DropdownSingle
                    isInModal 
                    className='col col-5 ml1 pb2'
                    dropdownTitle='Amount'
                    list={{'10 GB': false, '60 GB': false}}
                    id='extraStepperStep1AmountDropdown'
                    callback={(value: string) => {setExtraItem({...extraItem, amount: value, price: '3'})}}
                />
            </div>

            <Table id='extraStepperStep1Table' headerBackgroundColor="gray-10" body={protectionModalTableBodyElement()} footer={protectionModalTableFooterElement()}/>
        </div>
    )
}


export const ExtrasStepperSecondStepCreditCard = () => {
    const step2header = () => {
        return  {data: [
            {cell: <Text  key={"step2headerText"} size={14}  weight="med" color="gray-1">Total</Text>},
            {cell: <Text  key={"step2headerNumber"} className='right mr2' size={14}  weight="med" color="gray-1">$135</Text>}
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
        <>
            <Table className='my2' headerBackgroundColor="gray-10" id='extraStepperStep2TotalTable' header={step2header()}/>
            <Table className='my2' headerBackgroundColor="gray-10" id='extraStepperStep2PaymentMethodTable' header={step2CreditCardTableHeader()} body={step2CreditCardTableBody()} />
        </> 
    )

}
