import React from 'react';
import { Text } from '../../../Typography/Text';
import { Table } from '../../../Table/Table';
import { InputRadio } from '../../../FormsComponents/Input/InputRadio';
import { Input } from '../../../FormsComponents/Input/Input'
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { RadioButtonContainer, RadioButtonOption } from './BillingStyle';
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


export const ExtrasStepperFirstStep = (props:{toggle: Function}) => {
    const [test, setTest] = React.useState<string>('');
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

    const [selectedOptionExtrasModal, setSelectedOptionExtrasModal] = React.useState<string>('creditCard');
    return (
        <div>
            <RadioButtonContainer isSelected={selectedOptionExtrasModal === 'creditCard'}>
                        <InputRadio name='paymentMethod' value='creditCard' defaultChecked={true} onChange={() => setSelectedOptionExtrasModal('creditCard')} label='Credit Card' />
                        <img src={CardLogo} />
                </RadioButtonContainer>
                <RadioButtonOption isOpen={selectedOptionExtrasModal === 'creditCard'} className='mb2'>
                    <div className='col col-12 pt2 px2'>
                        <Input
                            data-recurly="first_name"
                            className='col col-6 pr2 pl1'
                            label="Account's Holder First Name"
                            type='text'
                            required={false}
                        />
                        <Input 
                            data-recurly="last_name"
                            className='col col-6 pr1'
                            label="Account's Holder Last Name"
                            type='text'
                            required={false}
                        />
                    </div>
 
                    <div className='col col-12 pt1 px2'>
                        <Input 
                            data-recurly="number"
                            className='col col-6 pr2 pl1'
                            label="Card Number"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="month"
                            className='col col-1 '
                            label="Expiry"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="year"
                            className='col col-1 '
                            label="Expiry"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="cvv"
                            className='col col-3 px2'
                            label="CVV"
                            type='text'
                            required={false}
                        />
                    </div>
                    
                    <div className='col col-12 pt1 px2'>
                        <Input 
                        data-recurly="country"
                            className='col col-6 pr2 pl1'
                            label="Country"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="vat_number"
                            className='col col-6 pr2'
                            label="VAT Number"
                            type='text'
                            required={false}
                        />
                    </div>
                    <div className='col col-12 pt1 px2'>
                        <Input 
                        data-recurly="address1"
                            className='col col-6 pr2 pl1'
                            label="Street Address 1"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="address2"
                            className='col col-6 pr2'
                            label="Street Address 2"
                            type='text'
                            required={false}
                        />
                    </div>

                    <div className='col col-12 px2 pb2 pt1'>
                        <Input 
                        data-recurly="city"
                            className='col col-3 pr2 pl1'
                            label="Town/City"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="state"
                            className='col col-3 pr2'
                            label="State/Province"
                            type='text'
                            required={false}
                        />
                        <Input 
                        data-recurly="postal_code"
                            className='col col-3 pr2'
                            label="Zip/Postal Code"
                            type='text'
                            required={false}
                        />
                    </div>
                    <input type="hidden" name="recurly-token" data-recurly="token"></input>
                </RadioButtonOption>
               
                <RadioButtonContainer className='mt2' isSelected={selectedOptionExtrasModal === 'paypal'} >
                    <InputRadio name='paymentMethod' value='paypal' onChange={() => setSelectedOptionExtrasModal('paypal')} label='PayPal' />
                    <img src={PaypalLogo} />
                </RadioButtonContainer>
                <RadioButtonOption isOpen={selectedOptionExtrasModal === 'paypal'} className='mb2'>
                    <div className='col col-12 px2 pb2 pt1'>
                        <Input 
                            className='col col-6 pl1'
                            label='PayPal Email'
                            type='email'
                            required={false}
                        />
                    </div>
                </RadioButtonOption>
                <div id='#threeDSecureComponent'></div>
        </div>
    )
}