import React from 'react';
import { Text } from '../../../Typography/Text';
import { Table } from '../../../Table/Table';
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { PaymentForm } from '../../../FormsComponents/PaymentForm/PaymentForm';

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


export const ExtrasStepperFirstStep = (props: {toggle: Function}) => {
    const protectionModalTableBodyElement = () => {
        return ProtectionModalTableData.map((value, key) => {
            return [
                <Text  key={"ExtraStepperStep1Table" + value.label + key.toString()} size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                <Text  key={"ExtraStepperStep1Table" + value.value + key.toString()} size={14}  weight="reg" color="gray-1">{value.value}</Text>
            ]
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

            <DropdownSingle 
                className='col col-6 pr2 pb2'
                dropdownTitle='Protection Type'
                list={{'Encoding Protection': false, 'Playback Protection': false}}
                id='extraStepperStep1ProtectionTypeDropdown'
                defaultValue='Playback Protection'

            />
            <DropdownSingle 
                className='col col-6 pb2'
                dropdownTitle='Amount'
                list={{'10 GB': false, '60 GB': false}}
                id='extraStepperStep1AmountDropdown'
                defaultValue='60 GB'
            />
            <Table id='extraStepperStep1Table' body={protectionModalTableBodyElement()} footer={protectionModalTableFooterElement()}/>
        </div>
    )
}

export const ExtrasStepperSecondStep = () => {

    const step2header = () => {
        return  [
            <Text  key={"step2headerText"} size={14}  weight="med" color="gray-1">Total</Text>,
            <Text  key={"step2headerNumber"} className='right mr2' size={14}  weight="med" color="gray-1">$135</Text>
        ]
    }

    return (
        <>
            <Table className='my2' id='extraStepperStep2Table' header={step2header()}/>
            <PaymentForm id='billingExtrasForm' paypalText="When you click next, you will be redirected to another website where you may securely enter your banking details. After completing the requested information you will be redirected back to Dacast."/>
        </>
    )
}