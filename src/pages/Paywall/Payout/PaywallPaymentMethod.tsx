import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { BorderStyle } from './PayoutStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { PayoutPaymentMethods } from '../../../redux-flow/store/Paywall/Payout';

enum PaymentMethod {
    BankAccountUS = 'Bank Account (US)',
    BankAccountInternational = 'Bank Account (International)',
    Check = 'Check',
    PayPal = 'PayPal'
}

const BankAccountUS = (updatePaymentMethod: Function, paymentMethodData: PayoutPaymentMethods) => {
    return (
        <div className='my2 flex flex-column'>
            <Text size={20} weight='reg'>Account Details</Text>
            <Input className='col col-4' id='routingNumber' label='Routing Number' placeholder='Routing Number' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, routingNumber: event.currentTarget.value}})} />
            <div className='col col-12 my2'>
                <Input className='col col-4 pr1' id='firstName' label='First Name' placeholder='First Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, firstName: event.currentTarget.value}})} />
                <Input className='col col-4 px1' id='lastName' label='Last Name' placeholder='Last Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, lastName: event.currentTarget.value}})} />
                <Input className='col col-4 pl1' id='accountName' label='Account Name' placeholder='Account Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, accountName: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6 pr1' id='address' label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, address: event.currentTarget.value}})} />
                <Input className='col col-6 pl1' id='addressLine2' label='Address Line 2' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, address2: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='state' label='State' placeholder='State' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, state: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='town' label='Town' placeholder='Town' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, town: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='zipCode' label='Zip/Postal Code' placeholder='Zip Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, zipCode: event.currentTarget.value}})} />
                <Input className='col col-3 pl1' id='Country' label='Country' placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, country: event.currentTarget.value}})} />
            </div>

            <BorderStyle className='my2' />
            <Text className='my2' size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='bankName' label='Bank Name' placeholder='Bank Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankName: event.currentTarget.value}})} />
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='bankAddress' label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankAddress: event.currentTarget.value}})} />
                <Input className='col col-6 pl1' id='bankAddressLine2' label='Address Line 2' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankAddress2: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='bankState' label='State' placeholder='State' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankState: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='bankTown' label='Town' placeholder='Town' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankTown: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='bankZipCode' label='Zip/Postal Code' placeholder='Zip Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankZipCode: event.currentTarget.value}})} />
                <Input className='col col-3 pl1' id='bankCountry' label='Country' placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountUS: {...paymentMethodData.bankAccountUS, bankCountry: event.currentTarget.value}})} />
            </div>
        </div>
    )
} 


const BankAccountInternational = (updatePaymentMethod: Function, paymentMethodData: PayoutPaymentMethods) => {
    return (
        <div className='my2 flex flex-column'>
            <Text className='col col-12' size={20} weight='reg'>Account Details</Text>
            <div className='col col-12'>
                <Input className='col col-4 pr1' id='swiftBic' label='SWIFT/BIC' placeholder='SWIFT/BIC' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, swift: event.currentTarget.value}})} />
                <Input className='col col-4 pl1' id='iban' label='IBAN' placeholder='IBAN' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, iban: event.currentTarget.value}})}/>
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-4 pr1' id='firstName' label='First Name' placeholder='First Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, firstName: event.currentTarget.value}})} />
                <Input className='col col-4 px1' id='lastName' label='Last Name' placeholder='Last Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, lastName: event.currentTarget.value}})}/>
                <Input className='col col-4 pl1' id='accountName' label='Account Name' placeholder='Account Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, accountName: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6 pr1' id='address' label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, address: event.currentTarget.value}})} />
                <Input className='col col-6 pl1' id='addressLine2' label='Address Line 2' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, address2: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='state' label='State' placeholder='State' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, state: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='town' label='Town' placeholder='Town' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, town: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='zipCode' label='Zip/Postal Code' placeholder='Zip Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, zipCode: event.currentTarget.value}})} />
                <Input className='col col-3 pl1' id='Country' label='Country' placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, country: event.currentTarget.value}})} />
            </div>

            <BorderStyle className='my2' />
            <Text className='my2' size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='bankName' label='Bank Name' placeholder='Bank Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankName: event.currentTarget.value}})} />
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='bankAddress' label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankAddress: event.currentTarget.value}})} />
                <Input className='col col-6 pl1' id='bankAddressLine2' label='Address Line 2' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankAddress2: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='bankState' label='State' placeholder='State' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankState: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='bankTown' label='Town' placeholder='Town' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankTown: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='bankZipCode' label='Zip/Postal Code' placeholder='Zip Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankZipCode: event.currentTarget.value}})} />
                <Input className='col col-3 pl1' id='bankCountry' label='Country' placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAccountInternational: {...paymentMethodData.bankAccountInternational, bankCountry: event.currentTarget.value}})} />
            </div>
        </div>
    )
} 

const Check = (updatePaymentMethod: Function, paymentMethodData: PayoutPaymentMethods) => {
    return (
        <div className='my2'>
            <Text size={20} weight='reg'>Check Details</Text>
            <div className='col col-12 my2 flex flex-wrap'>
                <div className='col-6'><Input className='col-8' id='payee' label='Payee' placeholder='Payee' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, payee: event.currentTarget.value}})}/></div>
                <div className='col-6'><Input className='col-8' id='companyName' label='Company Name' placeholder='Company Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, companyName: event.currentTarget.value}})} /></div>
            </div>
            <div className='col col-12'>
                <Input className='col col-6 pr1' id='checkAddress' label='Street Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, address: event.currentTarget.value}})} />
                <Input className='col col-6 pl1' id='checkAddressLine2' label='Address Line 2' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, address2: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-3 pr1' id='checkState' label='State' placeholder='State' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, state: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='checkTown' label='Town' placeholder='Town' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, town: event.currentTarget.value}})} />
                <Input className='col col-3 px1' id='checkZipCode' label='Zip Code' placeholder='Zip Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, zipCode: event.currentTarget.value}})} />
                <Input className='col col-3 pl1' id='checkCountry' label='Country' placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, check: {...paymentMethodData.check, country: event.currentTarget.value}})} />
            </div>
        </div>
    )
}

const PayPal = (updatePaymentMethod: Function, paymentMethodData: PayoutPaymentMethods) => {
    return (
        <div className='my2'>
            <Text size={20} weight='reg'>PayPal Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-4' id='emailAddress' label='Email Address' placeholder='Email Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, paypal: {...paymentMethodData.paypal, emailAddress: event.currentTarget.value}})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col col-6' id='comments' label='Comments' placeholder='Comments' onChange={(event) => updatePaymentMethod({...paymentMethodData, paypal: {...paymentMethodData.paypal, comments: event.currentTarget.value}})} />
            </div>
        </div>
    )
}

export const PaywallPaymentMethod = (props: {displayPage: Function; addPaymentMethodRequest: Function}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>('Bank Account (US)');
    const [paymentMethodData, setPaymentMethodData] = React.useState<PayoutPaymentMethods>({
        bankAccountInternational: null,
        bankAccountUS: null,
        check: null,
        paypal: null,
    });
    const renderPaymentMethod = () => {
        switch(selectedPaymentMethod) {
            case PaymentMethod.BankAccountUS: 
                return BankAccountUS(setPaymentMethodData, paymentMethodData);
            case PaymentMethod.BankAccountInternational:
                return BankAccountInternational(setPaymentMethodData, paymentMethodData);
            case PaymentMethod.Check: 
                return Check(setPaymentMethodData, paymentMethodData);
            case PaymentMethod.PayPal:
                return PayPal(setPaymentMethodData, paymentMethodData);
        }
    }

    const handleSave = () => {
        switch(selectedPaymentMethod) {
            case PaymentMethod.BankAccountUS: 
                props.addPaymentMethodRequest(paymentMethodData.bankAccountUS)
                break;
            case PaymentMethod.BankAccountInternational:
                props.addPaymentMethodRequest(paymentMethodData.bankAccountInternational)
                break;
            case PaymentMethod.Check: 
                props.addPaymentMethodRequest(paymentMethodData.check)
                break;
            case PaymentMethod.PayPal:
                props.addPaymentMethodRequest(paymentMethodData.paypal)
                break;
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
                <Button className='mr2' onClick={() => {handleSave()}} typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {props.displayPage(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

