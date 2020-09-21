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
import { useForm } from 'react-hook-form';
import { handleValidationForm } from '../../../utils/hooksFormSubmit';

export const PaywallPaymentMethod = (props: {displayPage: (b: boolean) => void; addPaymentMethodRequest: (data: PaymentMethod) => Promise<void>, selectedPaymentMethod: PaymentMethod}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>(props.selectedPaymentMethod ? props.selectedPaymentMethod.paymentMethodType : PaymentMethodType.BankAccountUS);
    const [paymentMethodData, setPaymentMethodData] = React.useState<PaymentMethod>(props.selectedPaymentMethod);
    const [paymentMethodRecipientType, setPaymentMethodRecipientType] = React.useState<'Business' | 'Personal'>(props.selectedPaymentMethod && props.selectedPaymentMethod.recipientType === 'personal' ? 'Personal' : 'Business')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const { register, handleSubmit, errors, setValue, reset, formState } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        // defaultValues: paymentMethodData || {},
    })

    const handleChange = (key: string, value: string) => {
        setValue(key, value)
        // setPaymentMethodData({...paymentMethodData, [key]: value})
    }

    const onSubmit = (data: PaymentMethod) => { 
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
        props.addPaymentMethodRequest({...data, id: props.selectedPaymentMethod.id, paymentMethodType: paymentMethod, recipientType: paymentMethodRecipientType.toLowerCase() as 'business' | 'personal'})
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
                        <Input 
                            className="mb1" 
                            id='paymentMethodName' 
                            defaultValue={paymentMethodData ? paymentMethodData.paymentMethodName : ''} 
                            label='Name' 
                            placeholder='Payout Method Name' 
                            {...handleValidationForm('paymentMethodName', errors)}
                            ref={register({ required: "Required"})}
                            onChange={(event) =>  handleChange('paymentMethodName', event.currentTarget.value)} 
                        />
                        <Text size={12} weight="reg">If you have multiple payout methods of the same type, this name will help you </Text>
                    </div>
                    <DropdownSingle 
                        isInModal
                        className='col sm-col-3 col-12 px1 xs-mb2 clearfix xs-no-gutter'
                        id='paywallNewPaymentDropdown' 
                        dropdownTitle='Payout Type' 
                        list={{'Bank Account (US)': false, 'Bank Account (International)': false, 'Check': false, 'PayPal': false}} 
                        callback={(value: string) => {reset(paymentMethodData, {errors: true});setSelectedPaymentMethod(value)}}
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
                <form id='paymentMethodForm' onSubmit={handleSubmit(onSubmit)}>

               {selectedPaymentMethod === PaymentMethodType.BankAccountUS &&
                <div className='flex flex-column'>
                <Text size={20} weight='reg'>Account Details</Text>
                 <div className='col col-12 sm-col-9 my2'>
                    <Input 
                        className='col col-12 sm-col-7 pr1 xs-no-gutter' 
                        id='accountNumber' 
                        defaultValue={paymentMethodData ? paymentMethodData.accountNumber : ''} 
                        label='Account Number' 
                        placeholder='Account Number' 
                        {...handleValidationForm('accountNumber', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('accountNumber', event.currentTarget.value)} 
                    />
                    <Input 
                        className='col col-12 sm-col-5 pl1 xs-no-gutter' 
                        id='routingNumber' 
                        defaultValue={paymentMethodData ? paymentMethodData.routingNumber : ''} 
                        label='Routing Number' 
                        placeholder='Routing Number' 
                        {...handleValidationForm('routingNumber', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('routingNumber', event.currentTarget.value)}    
                    />
                </div>
                
                <div className='col sm-col-9 col-12 mb2'>
                    {
                        paymentMethodRecipientType === 'Personal' ?
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 xs-no-gutter pr1' 
                                id='firstName' 
                                defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                label="Account Holder's First Name" 
                                placeholder='First Name' 
                                {...handleValidationForm('firstName', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('firstName', event.currentTarget.value)}  
                            /> :
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 xs-no-gutter pr1' 
                                id='firstName' 
                                defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                label="Account Holder's First Name" 
                                placeholder='First Name' 
                                indicationLabel='Optional'
                                ref={register()}
                                onChange={(event) =>  handleChange('firstName', event.currentTarget.value)}                             />
                    }
                    {
                        paymentMethodRecipientType === 'Personal' ?
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 px1 xs-no-gutter' 
                                id='lastName' 
                                defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                label="Account Holder's Last Name" 
                                placeholder='Last Name' 
                                {...handleValidationForm('lastName', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('lastName', event.currentTarget.value)}     
                            /> :
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 px1 xs-no-gutter' 
                                id='lastName' 
                                defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                label="Account Holder's Last Name" 
                                placeholder='Last Name' 
                                indicationLabel='Optional'
                                ref={register()}
                                onChange={(event) =>  handleChange('lastName', event.currentTarget.value)}     
                            /> 
                    }

                    {
                        paymentMethodRecipientType === 'Business' ? 
                            <Input 
                                className='col col-12 sm-col-4 pl1 xs-no-gutter' 
                                id='accountName' 
                                defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                label='Account Name' 
                                placeholder='Account Name' 
                                {...handleValidationForm('accountName', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('accountName', event.currentTarget.value)} 
                            /> :
                            <Input 
                                className='col col-12 sm-col-4 pl1 xs-no-gutter' 
                                id='accountName' 
                                defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                label='Account Name' 
                                placeholder='Account Name' 
                                indicationLabel='Optional' 
                                ref={register()}
                                onChange={(event) =>  handleChange('accountName', event.currentTarget.value)} 
                            />
                    }

                </div>
                <div className='col col-12 sm-col-9 mb2'>
                    <Input 
                        className='col col-12 sm-col-7 xs-no-gutter xs-mb2 pr1' 
                        id='address' 
                        defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                        label='Address' 
                        placeholder='Address' 
                        {...handleValidationForm('address', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('address', event.currentTarget.value)} 
                    />
                    <Input 
                        className='col col-12 sm-col-5 xs-no-gutter pl1' 
                        id='addressLine2' 
                        defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                        label='Address Line 2' 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}
                        onChange={(event) =>  handleChange('address2', event.currentTarget.value)}  
                    />
                </div>
                <div className='col col-12 sm-col-6 mb2 clearfix'>
                    <Input 
                        className='col col-6 sm-col-4 pr1 xs-mb2' 
                        id='state' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('state', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('state', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-6 sm-col-4 px1' 
                        id='town' 
                        label='Town/City' 
                        defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                        placeholder='Town/City' 
                        {...handleValidationForm('town', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('town', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-12 sm-col-4 xs-no-gutter pl1 mb2' 
                        id='zipCode' 
                        defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                        label='Zip/Postal Code' 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('zipCode', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('zipCode', event.currentTarget.value)}  
                    />
                </div>
    
                <Divider className='mb2' />
                <Text size={20} weight='reg'>Bank Details</Text>
                <div className='col col-12 my2'>
                    <Input 
                        className='col col-12 sm-col-4' 
                        id='bankName' 
                        label='Bank Name' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankName : ''} 
                        placeholder='Bank Name' 
                        {...handleValidationForm('bankName', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankName', event.currentTarget.value)}  
                    />
                </div>
                <div className='col col-12 sm-col-9 mb2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                        id='bankAddress' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankAddress : ''} 
                        label='Address' 
                        placeholder='Address' 
                        {...handleValidationForm('bankAddress', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankAddress', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='bankAddressLine2' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankAddress2 : ''} 
                        label='Address Line 2' 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}
                        onChange={(event) =>  handleChange('bankAddress2', event.currentTarget.value)} 
                    />
                </div>
                <div className='col col-12 sm-col-8 clearfix mb2'>
                    <Input 
                        className='col col-6 sm-col-4 pr1' 
                        id='bankState' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankState : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('bankState', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankState', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-6 sm-col-4 px1 xs-mb2' 
                        id='bankTown'   
                        label='Town/City' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankTown : ''} 
                        placeholder='Town/City' 
                        {...handleValidationForm('bankTown', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankTown', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-12 sm-col-4 xs-no-gutter pl1' 
                        id='bankZipCode' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankZipCode : ''} 
                        label='Zip/Postal Code' 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('bankZipCode', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankZipCode', event.currentTarget.value)}  
                    />
                </div>
            </div>}
                    
                    {
                        selectedPaymentMethod === PaymentMethodType.BankAccountInternational &&
                        <div className='flex flex-column'>
                        <Text className='col col-12' size={20} weight='reg'>Account Details</Text>
                        <div className='col col-12 sm-col-11 mt2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' 
                                id='swiftBic' 
                                defaultValue={paymentMethodData ? paymentMethodData.swift : ''} 
                                label='SWIFT/BIC' 
                                placeholder='SWIFT/BIC' 
                                {...handleValidationForm('swiftBic', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('swift', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-4 pl1' 
                                id='iban' 
                                label='IBAN/Account Number' 
                                defaultValue={paymentMethodData ? paymentMethodData.iban : ''} 
                                placeholder='IBAN/Account Number' 
                                {...handleValidationForm('iban', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('iban', event.currentTarget.value)} 
                            />
                        </div>
                        <div className='col col-12 sm-col-11 mt2'>
                            {
                                paymentMethodRecipientType === 'Personal' ? 
                                <Input 
                                className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' 
                                    id='firstName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                    label='First Name' 
                                    placeholder='First Name' 
                                    {...handleValidationForm('firstName', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('firstName', event.currentTarget.value)} 
                                /> :
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 pl1' 
                                    id='firstName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                    label='First Name' 
                                    placeholder='First Name' 
                                    indicationLabel='Optional' 
                                    ref={register()}
                                    onChange={(event) =>  handleChange('firstName', event.currentTarget.value)} 
                                />
                            }
                            {
                                paymentMethodRecipientType === 'Personal' ? 
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 xs-mb2 px1' 
                                    id='lastName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                    label='Last Name' 
                                    placeholder='Last Name' 
                                    {...handleValidationForm('lastName', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('lastName', event.currentTarget.value)} 
                                /> :
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 pl1' 
                                    id='lastName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                    label='Last Name' 
                                    placeholder='Last Name' 
                                    indicationLabel='Optional' 
                                    ref={register()}
                                    onChange={(event) =>  handleChange('lastName', event.currentTarget.value)} 
                                />
                            }
                            {
                                paymentMethodRecipientType === 'Business' ? 
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 pl1' 
                                    id='accountName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                    label='Account Name' 
                                    placeholder='Account Name' 
                                    {...handleValidationForm('accountName', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('accountName', event.currentTarget.value)} 
                                /> :
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 pl1' 
                                    id='accountName' 
                                    defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                    label='Account Name' 
                                    placeholder='Account Name' 
                                    indicationLabel='Optional' 
                                    ref={register()}
                                    onChange={(event) =>  handleChange('accountName', event.currentTarget.value)} 
                                />
                            }
                        </div>
                        <div className='col col-12 sm-col-11 my2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                                id='address' 
                                defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                                label='Address' 
                                placeholder='Address' 
                                {...handleValidationForm('address', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('address', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-5 pl1' 
                                id='addressLine2' 
                                defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                                label='Address Line 2' 
                                indicationLabel='Optional' 
                                placeholder='Address' 
                                ref={register()}                            
                                onChange={(event) => handleChange('address2', event.currentTarget.value)}
                            />
                        </div>
                        <div className='col col-12 sm-col-11 mb2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-3 xs-mb2 pr1' 
                                id='state' 
                                label='State/Province' 
                                defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                                placeholder='State/Province' 
                                {...handleValidationForm('town', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('town', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pl1 pr1 xs-mb2' 
                                id='town' 
                                label='Town/City' 
                                defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                                placeholder='Town/City' 
                                {...handleValidationForm('town', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('town', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pr1 pl1' 
                                id='zipCode' 
                                label='Zip/Postal Code' 
                                defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                                placeholder='Zip/Postal Code' 
                                {...handleValidationForm('zipCode', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('zipCode', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-3 pl1' 
                                id='country' 
                                label='Country' 
                                defaultValue={paymentMethodData ? paymentMethodData.country : ''} 
                                placeholder='Country' 
                                {...handleValidationForm('country', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('country', event.currentTarget.value)} 
                            />
                        </div>
            
                        <Divider className='my2' />
                        <Text size={20} weight='reg'>Bank Details</Text>
                        <div className='col col-12 my2'>
                            <Input 
                                className='col col-12 sm-col-4' 
                                id='bankName' 
                                label='Bank Name' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankName : ''} 
                                placeholder='Bank Name' 
                                {...handleValidationForm('bankName', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankName', event.currentTarget.value)}  
                            />
                        </div>
                        <div className='col col-12 sm-col-11 mb2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                                id='bankAddress' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankAddress : ''} 
                                label='Address' 
                                placeholder='Address' 
                                {...handleValidationForm('bankAddress', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankAddress', event.currentTarget.value)}   
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-5 pl1' 
                                id='bankAddressLine2' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankAddress2 : ''} 
                                label='Address Line 2' 
                                indicationLabel='Optional' 
                                placeholder='Address' 
                                ref={register()}                            
                                onChange={(event) => handleChange('bankAddress2', event.currentTarget.value)}   
                            />
                        </div>
                        <div className='col col-12 sm-col-11 clearfix mb2'>
                            <Input 
                                className='col col-6 sm-col-3 pr1' 
                                id='bankState' 
                                label='State/Province'
                                defaultValue={paymentMethodData ? paymentMethodData.bankState : ''} 
                                placeholder='State/Province' 
                                {...handleValidationForm('bankState', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankState', event.currentTarget.value)}
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pr1 pl1 sx-mb2' 
                                id='bankTown' 
                                label='Town/City' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankTown : ''} 
                                placeholder='Town/City' 
                                {...handleValidationForm('bankTown', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankTown', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pl1 pr1' 
                                id='bankZipCode' 
                                label='Zip/Postal Code' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankZipCode : ''} 
                                placeholder='Zip/Postal Code' 
                                {...handleValidationForm('bankZipCode', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankZipCode', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 pl1' 
                                id='bankCountry' 
                                label='Country' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankCountry : ''} 
                                placeholder='Country' 
                                {...handleValidationForm('bankCountry', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankCountry', event.currentTarget.value)} 
                            />
                        </div>
                    </div>
                    }
                    {
                        selectedPaymentMethod === PaymentMethodType.Check &&
                        <div>
                <Text className='col col-12' size={20} weight='reg'>Check Details</Text>
                <div className='col col-12 sm-col-9 my2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' 
                        id='payee' 
                        label='Payee' 
                        defaultValue={paymentMethodData ? paymentMethodData.payee : ''} 
                        placeholder='Payee' 
                        {...handleValidationForm('payee', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('payee', event.currentTarget.value)}    
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='companyName' 
                        label='Company Name' 
                        defaultValue={paymentMethodData ? paymentMethodData.companyName : ''} 
                        indicationLabel='Optional' 
                        placeholder='Company Name' 
                        ref={register()}                            
                        onChange={(event) => handleChange('companyName', event.currentTarget.value)}      
                    />
                </div>
                <div className='col col-12 sm-col-9'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' 
                        id='checkAddress' 
                        label='Street Address' 
                        defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                        placeholder='Address' 
                        {...handleValidationForm('checkAddress', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('address', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='checkAddressLine2' 
                        label='Address Line 2'
                        defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}                            
                        onChange={(event) => handleChange('address2', event.currentTarget.value)} 
                    />
                </div>
                <div className='col col-12 my2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-2 pr1 xs-mb2' 
                        id='checkState' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('checkState', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('state', event.currentTarget.value)}                    
                    />
                    <Input 
                        className='col col-6 sm-col-2 sm-pl1 pr1' 
                        id='checkTown' 
                        label='Town/City' 
                        defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                        placeholder='Town/City' 
                        {...handleValidationForm('checkTown', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('town', event.currentTarget.value)}                     
                    />
                    <Input 
                        className='col col-6 sm-col-2 sm-pr1 pl1 xs-mb2' 
                        id='checkZipCode' 
                        label='Zip/Postal Code' 
                        defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('checkZipCode', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('zipCode', event.currentTarget.value)}                     
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-3 pl1' 
                        id='checkCountry' 
                        label='Country' 
                        defaultValue={paymentMethodData ? paymentMethodData.country : ''} 
                        placeholder='Country' 
                        {...handleValidationForm('checkCountry', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('country', event.currentTarget.value)}                     
                    />
                </div>
            </div>
                    }
                    {
                        selectedPaymentMethod === PaymentMethodType.PayPal &&
                        <div>
                        <Text size={20} weight='reg'>PayPal Details</Text>
                        <div className='col col-12 my2'>
                            <Input 
                                className='col col-4 pr1' 
                                id='emailAddress' 
                                label='Email Address' 
                                defaultValue={paymentMethodData ? paymentMethodData.emailAddress : ''} 
                                placeholder='Email Address' 
                                {...handleValidationForm('emailAddress', errors, 'email', register)}
                                onChange={(event) =>  handleChange('emailAddress', event.currentTarget.value)}                    
                            />
                        </div>
                        <div className='col col-12 mb2'>
                            <Input 
                                type="textarea" 
                                indicationLabel="Optional" 
                                className='col col-4 pr1' 
                                defaultValue={paymentMethodData ? paymentMethodData.comments : ''} 
                                id='comments' 
                                label='Comments' 
                                placeholder='Comments' 
                                ref={register()}                            
                                onChange={(event) => handleChange('comments', event.currentTarget.value)}                    
                            />
                        </div>
                    </div>
                    }
                </form>
            </Card> 
            <div className='my2'>
                <Button type='submit' form='paymentMethodForm' isLoading={buttonLoading} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {props.displayPage(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

