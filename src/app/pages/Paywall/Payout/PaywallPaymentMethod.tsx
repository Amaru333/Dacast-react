import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { PaymentMethod, PaymentMethodType } from '../../../redux-flow/store/Paywall/Payout/types';
import { Tab } from '../../../../components/Tab/Tab';
import { Routes } from '../../../containers/Navigation/NavigationTypes';
import { Divider } from '../../../shared/Common/MiscStyle';

const BankAccountUS = (updatePaymentMethod: (data: PaymentMethod) => void, paymentMethodData: PaymentMethod, paymentMethodRecipientType: 'Business' | 'Personal') => {
    return (
        <div className='flex flex-column'>
            <Text size={20} weight='reg'>Account Details</Text>
             <div className='col col-12 sm-col-9 my2'>
             <Input className='col col-12 sm-col-7 pr1 xs-no-gutter' id='accountNumber' value={paymentMethodData ? paymentMethodData.accountNumber : ''} label='Account Number' placeholder='Account Number' onChange={(event) => updatePaymentMethod({...paymentMethodData, accountNumber: event.currentTarget.value})} />
             <Input className='col col-12 sm-col-5 pl1 xs-no-gutter' id='routingNumber' value={paymentMethodData ? paymentMethodData.routingNumber : ''} label='Routing Number' placeholder='Routing Number' onChange={(event) => updatePaymentMethod({...paymentMethodData, routingNumber: event.currentTarget.value})} />
             </div>
            
            <div className='col sm-col-9 col-12 mb2'>
                <Input className='col col-12 sm-col-4 xs-mb2 xs-no-gutter pr1' id='firstName' value={paymentMethodData ? paymentMethodData.firstName : ''} label="Account Holder's First Name" indicationLabel={paymentMethodRecipientType === "Business" ? 'Optional' : null} placeholder='First Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, firstName: event.currentTarget.value})} />
                <Input className='col col-12 sm-col-4 xs-mb2 px1 xs-no-gutter' id='lastName' value={paymentMethodData ? paymentMethodData.lastName : ''} label="Account Holder's Last Name" indicationLabel={paymentMethodRecipientType === "Business" ? 'Optional' : null} placeholder='Last Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, lastName: event.currentTarget.value})} />
                <Input className='col col-12 sm-col-4 pl1 xs-no-gutter' id='accountName' value={paymentMethodData ? paymentMethodData.accountName : ''} label='Account Name' indicationLabel={paymentMethodRecipientType === "Personal" ? 'Optional' : null} placeholder='Account Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, accountName: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-9 mb2'>
                <Input className='col col-12 sm-col-7 xs-no-gutter xs-mb2 pr1' id='address' value={paymentMethodData ? paymentMethodData.address : ''} label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address: event.currentTarget.value})} />
                <Input className='col col-12 sm-col-5 xs-no-gutter pl1' id='addressLine2' value={paymentMethodData ? paymentMethodData.address2 : ''} label='Address Line 2' indicationLabel='Optional' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address2: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-6 mb2 clearfix'>
                <Input className='col col-6 sm-col-4 pr1 xs-mb2' id='state' label='State/Province' value={paymentMethodData ? paymentMethodData.state : ''} placeholder='State/Province' onChange={(event) => updatePaymentMethod({...paymentMethodData, state: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-4 px1' id='town' label='Town/City' value={paymentMethodData ? paymentMethodData.town : ''} placeholder='Town/City' onChange={(event) => updatePaymentMethod({...paymentMethodData, town: event.currentTarget.value})} />
                <Input className='col col-12 sm-col-4 xs-no-gutter pl1 mb2' id='zipCode' value={paymentMethodData ? paymentMethodData.zipCode : ''} label='Zip/Postal Code' placeholder='Zip/Postal Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, zipCode: event.currentTarget.value})} />
            </div>

            <Divider className='mb2' />
            <Text size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-12 sm-col-4' id='bankName' label='Bank Name' value={paymentMethodData ? paymentMethodData.bankName : ''} placeholder='Bank Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankName: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-9 mb2'>
                <Input className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' id='bankAddress' value={paymentMethodData ? paymentMethodData.bankAddress : ''} label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAddress: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1' id='bankAddressLine2' value={paymentMethodData ? paymentMethodData.bankAddress2 : ''} label='Address Line 2' indicationLabel='Optional' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAddress2: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-8 clearfix mb2'>
                <Input className='col col-6 sm-col-4 pr1' id='bankState' label='State/Province' value={paymentMethodData ? paymentMethodData.bankState : ''} placeholder='State/Province' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankState: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-4 px1 xs-mb2' id='bankTown' label='Town/City' value={paymentMethodData ? paymentMethodData.bankTown : ''} placeholder='Town/City' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankTown: event.currentTarget.value})} />
                <Input className='col col-12 sm-col-4 xs-no-gutter pl1' id='bankZipCode' value={paymentMethodData ? paymentMethodData.bankZipCode : ''} label='Zip/Postal Code' placeholder='Zip/Postal Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankZipCode: event.currentTarget.value})} />
            </div>
        </div>
    )
} 


const BankAccountInternational = (updatePaymentMethod: (data: PaymentMethod) => void, paymentMethodData: PaymentMethod, paymentMethodRecipientType: 'Business' | 'Personal') => {
    return (
        <div className='flex flex-column'>
            <Text className='col col-12' size={20} weight='reg'>Account Details</Text>
            <div className='col col-12 sm-col-11 mt2'>
                <Input className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' id='swiftBic' value={paymentMethodData ? paymentMethodData.swift : ''} label='SWIFT/BIC' placeholder='SWIFT/BIC' onChange={(event) => updatePaymentMethod({...paymentMethodData, swift: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-4 pl1' id='iban' label='IBAN/Account Number' value={paymentMethodData ? paymentMethodData.iban : ''} placeholder='IBAN/Account Number' onChange={(event) => updatePaymentMethod({...paymentMethodData, iban: event.currentTarget.value})}/>
            </div>
            <div className='col col-12 sm-col-11 mt2'>
                <Input className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' id='firstName' value={paymentMethodData ? paymentMethodData.firstName : ''} label='First Name' indicationLabel={paymentMethodRecipientType === "Business" ? 'Optional' : null} placeholder='First Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, firstName: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-4 xs-mb2 px1' id='lastName' value={paymentMethodData ? paymentMethodData.lastName : ''} label='Last Name' indicationLabel={paymentMethodRecipientType === "Business" ? 'Optional' : null} placeholder='Last Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, lastName: event.currentTarget.value})}/>
                <Input className='col xs-no-gutter col-12 sm-col-4 pl1' id='accountName' value={paymentMethodData ? paymentMethodData.accountName : ''} label='Account Name' indicationLabel={paymentMethodRecipientType === "Personal" ? 'Optional' : null} placeholder='Account Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, accountName: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-11 my2'>
                <Input className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' id='address' value={paymentMethodData ? paymentMethodData.address : ''} label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1' id='addressLine2' value={paymentMethodData ? paymentMethodData.address2 : ''} label='Address Line 2' indicationLabel='Optional' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address2: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-11 mb2'>
                <Input className='col xs-no-gutter col-12 sm-col-3 xs-mb2 pr1' id='state' label='State/Province' value={paymentMethodData ? paymentMethodData.state : ''} placeholder='State/Province' onChange={(event) => updatePaymentMethod({...paymentMethodData, state: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-3 sm-pl1 pr1 xs-mb2' id='town' label='Town/City' value={paymentMethodData ? paymentMethodData.town : ''} placeholder='Town/City' onChange={(event) => updatePaymentMethod({...paymentMethodData, town: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-3 sm-pr1 pl1' id='zipCode' label='Zip/Postal Code' value={paymentMethodData ? paymentMethodData.zipCode : ''} placeholder='Zip/Postal Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, zipCode: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-3 pl1' id='Country' label='Country' value={paymentMethodData ? paymentMethodData.country : ''} placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, country: event.currentTarget.value})} />
            </div>

            <Divider className='my2' />
            <Text size={20} weight='reg'>Bank Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-12 sm-col-4' id='bankName' label='Bank Name' value={paymentMethodData ? paymentMethodData.bankName : ''} placeholder='Bank Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankName: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-11 mb2'>
                <Input className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' id='bankAddress' value={paymentMethodData ? paymentMethodData.bankAddress : ''} label='Address' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAddress: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1' id='bankAddressLine2' value={paymentMethodData ? paymentMethodData.bankAddress2 : ''} label='Address Line 2' indicationLabel='Optional' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankAddress2: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-11 clearfix mb2'>
                <Input className='col col-6 sm-col-3 pr1' id='bankState' label='State/Province'value={paymentMethodData ? paymentMethodData.bankState : ''} placeholder='State/Province' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankState: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-3 sm-pr1 pl1 sx-mb2' id='bankTown' label='Town/City' value={paymentMethodData ? paymentMethodData.bankTown : ''} placeholder='Town/City' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankTown: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-3 sm-pl1 pr1' id='bankZipCode' label='Zip/Postal Code' value={paymentMethodData ? paymentMethodData.bankZipCode : ''} placeholder='Zip/Postal Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankZipCode: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-3 pl1' id='bankCountry' label='Country' value={paymentMethodData ? paymentMethodData.bankCountry : ''} placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, bankCountry: event.currentTarget.value})} />
            </div>
        </div>
    )
} 

const Check = (updatePaymentMethod: (data: PaymentMethod) => void, paymentMethodData: PaymentMethod) => {
    return (
        <div>
            <Text className='col col-12' size={20} weight='reg'>Check Details</Text>
            <div className='col col-12 sm-col-9 my2'>
                <Input className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' id='payee' label='Payee' value={paymentMethodData ? paymentMethodData.payee : ''} placeholder='Payee' onChange={(event) => updatePaymentMethod({...paymentMethodData, payee: event.currentTarget.value})}/>
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1' id='companyName' label='Company Name' value={paymentMethodData ? paymentMethodData.companyName : ''} indicationLabel='Optional' placeholder='Company Name' onChange={(event) => updatePaymentMethod({...paymentMethodData, companyName: event.currentTarget.value})} />
            </div>
            <div className='col col-12 sm-col-9'>
                <Input className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' id='checkAddress' label='Street Address' value={paymentMethodData ? paymentMethodData.address : ''} placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-5 pl1' id='checkAddressLine2' label='Address Line 2' value={paymentMethodData ? paymentMethodData.address2 : ''} indicationLabel='Optional' placeholder='Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, address2: event.currentTarget.value})} />
            </div>
            <div className='col col-12 my2'>
                <Input className='col xs-no-gutter col-12 sm-col-2 pr1 xs-mb2' id='checkState' label='State/Province' value={paymentMethodData ? paymentMethodData.state : ''} placeholder='State/Province' onChange={(event) => updatePaymentMethod({...paymentMethodData, state: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-2 sm-pl1 pr1' id='checkTown' label='Town/City' value={paymentMethodData ? paymentMethodData.town : ''} placeholder='Town/City' onChange={(event) => updatePaymentMethod({...paymentMethodData, town: event.currentTarget.value})} />
                <Input className='col col-6 sm-col-2 sm-pr1 pl1 xs-mb2' id='checkZipCode' label='Zip/Postal Code' value={paymentMethodData ? paymentMethodData.zipCode : ''} placeholder='Zip/Postal Code' onChange={(event) => updatePaymentMethod({...paymentMethodData, zipCode: event.currentTarget.value})} />
                <Input className='col xs-no-gutter col-12 sm-col-3 pl1' id='checkCountry' label='Country' value={paymentMethodData ? paymentMethodData.country : ''} placeholder='Country' onChange={(event) => updatePaymentMethod({...paymentMethodData, country: event.currentTarget.value})} />
            </div>
        </div>
    )
}

const PayPal = (updatePaymentMethod: (data: PaymentMethod) => void, paymentMethodData: PaymentMethod) => {
    return (
        <div>
            <Text size={20} weight='reg'>PayPal Details</Text>
            <div className='col col-12 my2'>
                <Input className='col col-4 pr1' id='emailAddress' label='Email Address' value={paymentMethodData ? paymentMethodData.emailAddress : ''} placeholder='Email Address' onChange={(event) => updatePaymentMethod({...paymentMethodData, emailAddress: event.currentTarget.value})} />
            </div>
            <div className='col col-12 mb2'>
                <Input type="textarea" indicationLabel="Optional" className='col col-4 pr1' value={paymentMethodData ? paymentMethodData.comments : ''} id='comments' label='Comments' placeholder='Comments' onChange={(event) => updatePaymentMethod({...paymentMethodData, comments: event.currentTarget.value})} />
            </div>
        </div>
    )
}

export const PaywallPaymentMethod = (props: {displayPage: (b: boolean) => void; addPaymentMethodRequest: (data: PaymentMethod) => Promise<void>, selectedPaymentMethod: PaymentMethod}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>(props.selectedPaymentMethod ? props.selectedPaymentMethod.paymentMethodType : PaymentMethodType.BankAccountUS);
    const [paymentMethodData, setPaymentMethodData] = React.useState<PaymentMethod>(props.selectedPaymentMethod);
    const [paymentMethodRecipientType, setPaymentMethodRecipientType] = React.useState<'Business' | 'Personal'>(props.selectedPaymentMethod && props.selectedPaymentMethod.recipientType === 'personal' ? 'Personal' : 'Business')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const renderPaymentMethod = () => {
        switch(selectedPaymentMethod) {
            case PaymentMethodType.BankAccountUS: 
                return BankAccountUS(setPaymentMethodData, paymentMethodData, paymentMethodRecipientType);
            case PaymentMethodType.BankAccountInternational:
                return BankAccountInternational(setPaymentMethodData, paymentMethodData, paymentMethodRecipientType);
            case PaymentMethodType.Check: 
                return Check(setPaymentMethodData, paymentMethodData);
            case PaymentMethodType.PayPal:
                return PayPal(setPaymentMethodData, paymentMethodData);
        }
    }

    const handleSave = () => {
        let paymentMethod: string = null

        switch(selectedPaymentMethod) {
            case PaymentMethodType.BankAccountUS: 
                paymentMethod = 'us-transfer'
                break;
            case PaymentMethodType.BankAccountInternational:
                paymentMethod = 'international-transfer'
                break;
            case PaymentMethodType.Check: 
                paymentMethod = 'check'
                break;
            case PaymentMethodType.PayPal:
                paymentMethod = 'paypal'
                break;
        }
        setButtonLoading(true)
        props.addPaymentMethodRequest({...paymentMethodData, paymentMethodType: paymentMethod, recipientType: paymentMethodRecipientType.toLowerCase() as 'business' | 'personal'})
        .then(() => {
            setButtonLoading(false)
            props.displayPage(false)
        }).catch(() => {
            setButtonLoading(false)
        })


    }

    const tabsList: Routes[] = [
        {
            name: "Business",
            path: 'Business'
        },
        {
            name: 'Personal',
            path: 'Personal'
        }

    ]

    return (
        <div>
            <Card>
                <Text size={20} weight='reg'>New Withdrawal Method</Text>
                <div className="mt2">
                    <Text size={14} weight='reg'>Please Select which method you would like to add</Text>
                </div>
                <div className='mt2'>
                    <div className='col sm-col-3 col-12 pr1 clearfix xs-no-gutter mb2'>
                        <Input className="mb1" id='paymentMethodNameInput' value={paymentMethodData ? paymentMethodData.paymentMethodName : ''} label='Name' onChange={(event) => setPaymentMethodData({...paymentMethodData, paymentMethodName: event.currentTarget.value})} placeholder='Payout Method Name' />
                        <Text size={12} weight="reg">If you have multiple payout methods of the same type, this name will help you </Text>
                    </div>
                    <DropdownSingle 
                        isInModal
                        className='col sm-col-3 col-12 px1 xs-mb2 clearfix xs-no-gutter'
                        id='paywallNewPaymentDropdown' 
                        dropdownTitle='Payout Type' 
                        list={{'Bank Account (US)': false, 'Bank Account (International)': false, 'Check': false, 'PayPal': false}} 
                        callback={(value: string) => setSelectedPaymentMethod(value)}
                        dropdownDefaultSelect={selectedPaymentMethod}
                    />
                    {
                        (selectedPaymentMethod === PaymentMethodType.BankAccountUS || selectedPaymentMethod === PaymentMethodType.BankAccountInternational) &&
                            <div style={{marginTop: 2}} className="col col-4 pl1 xs-no-gutter">
                                <Tab className='col col-12' orientation='horizontal' list={tabsList} callback={setPaymentMethodRecipientType} label="Recipient Type" />
                            </div>
                    }   
                </div>

                <Divider className='mb2' />

                {renderPaymentMethod()}
            </Card> 
            <div className='my2'>
                <Button isLoading={buttonLoading} className='mr2' onClick={() => {handleSave()}} typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {props.displayPage(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

