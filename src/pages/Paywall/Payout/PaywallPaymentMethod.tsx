import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { BorderStyle } from './PayoutStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';

enum PaymentMethod {
    BankAccountUS = 'Bank Account (US)',
    BankAccountInternational = 'Bank Account (International)',
    Check = 'Check',
    PayPal = 'PayPal'
}

const BankAccountUS = () => {
    return (
        <div className='my2 flex flex-column'>
            <Text size={20} weight='reg'>Account Details</Text>
            <Input className='col col-4' id='routingNumber' label='Routing Number' placeholder='Routing Number' />
            <div className='col col-12 my2'>
                <Input className='col col-4 pr1' id='firstName' label='First Name' placeholder='First Name' />
                <Input className='col col-4 px1' id='lastName' label='Last Name' placeholder='Last Name' />
                <Input className='col col-4 pl1' id='accountName' label='Account Name' placeholder='Account Name' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6 pr1' id='address' label='Address' placeholder='Address' />
                <Input className='col col-6 pl1' id='addressLine2' label='Address Line 2' placeholder='Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='state' label='State' placeholder='State' />
                <Input className='col col-3 px1' id='town' label='Town' placeholder='Town' />
                <Input className='col col-3 px1' id='zipCode' label='Zip/Postal Code' placeholder='Zip Code' />
                <Input className='col col-3 pl1' id='Country' label='Country' placeholder='Country' />
            </div>

            <BorderStyle className='my2' />
            <Text className='my2' size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='bankName' label='Bank Name' placeholder='Bank Name' />
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='bankAddress' label='Address' placeholder='Address' />
                <Input className='col col-6 pl1' id='bankAddressLine2' label='Address Line 2' placeholder='Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='bankState' label='State' placeholder='State' />
                <Input className='col col-3 px1' id='bankTown' label='Town' placeholder='Town' />
                <Input className='col col-3 px1' id='bankZipCode' label='Zip/Postal Code' placeholder='Zip Code' />
                <Input className='col col-3 pl1' id='bankCountry' label='Country' placeholder='Country' />
            </div>
        </div>
    )
} 


const BankAccountInternational = () => {
    return (
        <div className='my2 flex flex-column'>
            <Text className='col col-12' size={20} weight='reg'>Account Details</Text>
            <div className='col col-12'>
                <Input className='col col-4 pr1' id='swiftBic' label='SWIFT/BIC' placeholder='SWIFT/BIC' />
                <Input className='col col-4 pl1' id='iban' label='IBAN' placeholder='IBAN' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-4 pr1' id='firstName' label='First Name' placeholder='First Name' />
                <Input className='col col-4 px1' id='lastName' label='Last Name' placeholder='Last Name' />
                <Input className='col col-4 pl1' id='accountName' label='Account Name' placeholder='Account Name' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6 pr1' id='address' label='Address' placeholder='Address' />
                <Input className='col col-6 pl1' id='addressLine2' label='Address Line 2' placeholder='Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='state' label='State' placeholder='State' />
                <Input className='col col-3 px1' id='town' label='Town' placeholder='Town' />
                <Input className='col col-3 px1' id='zipCode' label='Zip/Postal Code' placeholder='Zip Code' />
                <Input className='col col-3 pl1' id='Country' label='Country' placeholder='Country' />
            </div>

            <BorderStyle className='my2' />
            <Text className='my2' size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='bankName' label='Bank Name' placeholder='Bank Name' />
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='bankAddress' label='Address' placeholder='Address' />
                <Input className='col col-6 pl1' id='bankAddressLine2' label='Address Line 2' placeholder='Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='bankState' label='State' placeholder='State' />
                <Input className='col col-3 px1' id='bankTown' label='Town' placeholder='Town' />
                <Input className='col col-3 px1' id='bankZipCode' label='Zip/Postal Code' placeholder='Zip Code' />
                <Input className='col col-3 pl1' id='bankCountry' label='Country' placeholder='Country' />
            </div>
        </div>
    )
} 

const Check = () => {
    return (
        <div className='my2'>
            <Text size={20} weight='reg'>Check Details</Text>
            <div className='col col-12 my2 flex flex-wrap'>
                <div className='col-6'><Input className='col-8' id='payee' label='Payee' placeholder='Payee' /></div>
                <div className='col-6'><Input className='col-8' id='companyName' label='Company Name' placeholder='Company Name' /></div>
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='checkAddress' label='Street Address' placeholder='Address' />
                <Input className='col col-6 pl1' id='checkAddressLine2' label='Address Line 2' placeholder='Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='checkState' label='State' placeholder='State' />
                <Input className='col col-3 px1' id='checkTown' label='Town' placeholder='Town' />
                <Input className='col col-3 px1' id='checkZipCode' label='Zip Code' placeholder='Zip Code' />
                <Input className='col col-3 pl1' id='checkCountry' label='Country' placeholder='Country' />
            </div>
        </div>
    )
}

const PayPal = () => {
    return (
        <div className='my2'>
            <Text size={20} weight='reg'>PayPal Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-4' id='emailAddress' label='Email Address' placeholder='Email Address' />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='comments' label='Comments' placeholder='Comments' />
            </div>
        </div>
    )
}

export const PaywallPaymentMethod = (props: {displayPage: Function}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>('Bank Account (US)')
    const renderPaymentMethod = () => {
        switch(selectedPaymentMethod) {
            case PaymentMethod.BankAccountUS: 
                return BankAccountUS();
            case PaymentMethod.BankAccountInternational:
                return BankAccountInternational();
            case PaymentMethod.Check: 
                return Check();
            case PaymentMethod.PayPal:
                return PayPal();
        }
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='reg'>New payment method</Text>
                <Text size={14} weight='reg'>Please Select which method you would like to add</Text>
                <DropdownSingle 
                    className='my2 col col-4'
                    id='paywallNewPaymentDropdown' 
                    dropdownTitle='Payout Type' 
                    list={{'Bank Account (US)': false, 'Bank Account (International)': false, 'Check': false, 'PayPal': false}} 
                    callback={(value: string) => setSelectedPaymentMethod(value)}
                    dropdownDefaultSelect='Bank Account (US)'
                />
                <BorderStyle className='my2' />

                {renderPaymentMethod()}
            </Card> 
            <div className='my2'>
                <Button className='mr2' onClick={() => {}} typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {props.displayPage(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

